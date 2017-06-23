'use strict';

const fs = require('fs');
const path = require('path');
const ini = require('ini');
const moment = require('moment');
const child_process = require('child_process');
const ps = require('ps-node');
const {dialog, app} = require('electron');
const db = require("./db-module.js");
const handle = require('./handle-module.js');
const constants = require('./constants.js');
const backup = require('./backup-module.js');
const log = require('./log-module.js').getLog();

const getUserdat = () => {
	return new Promise(function(resolve, reject) {
		db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) =>  {
			if (!fs.existsSync(userdat.value)) {
				dialog.showErrorBox('Error', "User.dat not found!\nPlease edit the location from Setting section!");
			}
			resolve(userdat);
		});
	});
}

module.exports = {
	playCharacter: async id => {

	// let u = await getUserdat();
	// console.log (u);
	// return;

	db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
		if (!fs.existsSync(userdat.value)) {
			return dialog.showErrorBox('Error', "User.dat not found!\nPlease edit the location from Setting section!");
		}
		backup.backupFile(userdat.value);
		db.settingDatastore.findOne({key: 'path.to.game.dll'}, (err, gamedll) => {
			if (null == gamedll || !fs.existsSync(gamedll.value)) {
				return dialog.showErrorBox('Error', "game.dll not found!\nPlease edit the location from Setting section!");
			}
			db.characterDatastore.findOne({_id: id}, (err, character) => {
				if (null == character) {
					return dialog.showErrorBox('Error', "Cannot find character ID!");
				}
				db.accountDatastore.findOne({name: character.account}, (err, account) => {
					if (null == account) {
						return dialog.showErrorBox('Error', "Cannot find account data!");
					}
					db.serverDatastore.findOne({name: character.server}, (err, server) => {
						if (null == server) {
							return dialog.showErrorBox('Error', "Cannot find server!");
						}
						db.classDatastore.findOne({name: character.classe}, (err, classe) => {
							if (null == classe) {
								return dialog.showErrorBox('Error', "Cannot find class!");
							}
							db.realmDatastore.findOne({name: classe.realm}, (err, realm) => {
								if (null == realm) {
									return dialog.showErrorBox('Error', "Cannot find realm!");
								}
								let config = ini.parse(fs.readFileSync(userdat.value, 'utf-8'));
								let xy;
								try {
									xy = character.resolution.split('x');
									config.main.screen_width = xy[0];
									config.main.screen_height = xy[1];
								}
								catch (e) {
									log.error(e);
									dialog.showErrorBox('Error', e.toString());
								}
								config.main.windowed = character.windowed ? 1 : 0;
								config.main.fullscreen_windowed = character.fullscreen_windowed ? 1 : 0;
								config.keyboard.forward_breaks_runlock = character.forward_breaks_runlock ? 1 : 0;
								fs.writeFileSync(path.dirname(userdat.value) + "\\user.dat", ini.stringify(config, {}));
								const spawn = child_process.spawn;
								ps.lookup({
									command: 'game.dll',
									psargs: 'ux'
								}, (err, resultList) => {
									if (err) {
										log.error(e);
										throw new Error(err);
									}
									let flag = false;
									let c = 0;
									resultList.forEach(process => {
										if (process && process.arguments[3] == character.account) {
											flag = true;
										}
										c++;
									});
									while (c < resultList.length) {}
									if (flag){
										return dialog.showErrorBox('Error', "The account is already logged in!");
									}
									if (false == flag) {
										backup.backupFile(path.dirname(userdat.value) + '\\' + character.name.charAt(0).toUpperCase() + character.name.slice(1) + '-' + server.n + '.ini');
										const prc = spawn(gamedll.value, [server.ip, server.port, server.n, character.account, account.password, character.name, realm.n], {
											cwd: path.dirname(gamedll.value),
											setsid: false,
											detached: true
										});
										log.info('Spawned child pid: ' + prc.pid);
										const now = moment(Date.now()).format('DD/MM/YY HH:mm');
										//aggiorna timestamp last login e killa i mutants
										db.characterDatastore.update({_id: id}, {$set: {lastlogin: now}}, (err, numAffected, affectedDocuments) => {
											handle.killMutants();
										});
										if (undefined != character.title && '' != character.title && prc.pid > 0) {
											const exec = child_process.exec;
											exec(constants.titlerenamer_path() + ' ' + prc.pid + ' "' + character.title + '"', (err, so, se) => {});
										}
										else {
											if (undefined != account.title && '' != account.title && prc.pid > 0) {
												const exec = child_process.exec;
												exec(constants.titlerenamer_path() + ' ' + prc.pid + ' "' + account.title + '"', (err, so, se) => {});
											}
										}
										//gestione borderless
										if (true === character.borderless) {
											let width = character.width;
											let height = character.height;
											let positionX = character.positionX;
											let positionY = character.positionY;
											try {
												if (undefined === width || width < 800) {
													width = xy[0];
												}
												if (undefined === height || height < 600) {
													height = xy[1];
												}
											}
											catch (e) {
												log.error(e);
												width = 800;
												height = 600;
											}
											if (positionX === undefined || positionX === '') {
												positionX = 0;
											}
											if (positionY === undefined || positionY === '') {
												positionY = 0;
											}

											const exec = child_process.exec;
											exec(constants.borderless_path() + ' ' + prc.pid + ' ' +
												width + ' ' + height + ' ' + positionX + ' ' + positionY,
												(err, so, se) => {});
										}
									}
								});
							});
						});
					});
				});
			});
		});
	});
	},


	killCharacter: id => {
		db.characterDatastore.findOne({_id: id}, (err, character) => {
			ps.lookup({
				command: 'game.dll',
				psargs: 'ux'
			}, (err, resultList) => {
				if (err) {
					log.error(err);
					throw new Error(err);
				}
				resultList.forEach(process => {
					if (process && process.arguments[3] == character.account && process.arguments[5] == character.name) {
						ps.kill(process.pid);//se metti la callback fa laggare tutto//appunto performance:https://github.com/sindresorhus/tasklist
					}
				});
			});
			
		});
	},

	killAllClients: () => {
		ps.lookup({
			command: 'game.dll',
			psargs: 'ux'
		}, (err, resultList) => {
			if (err) {
				log.error(err);
				throw new Error(err);
			}
			resultList.forEach(process => {
				ps.kill(process.pid);
			});
		});
	},

	killAccount: id => {
		db.accountDatastore.findOne({_id: id}, (err, account) => {
			ps.lookup({
				command: 'game.dll',
				psargs: 'ux'
			}, (err, resultList) => {
				if (err) {
					log.error(err);
					throw new Error(err);
				}
				resultList.forEach(process => {
					if (process && process.arguments[3] == account.name) {
						ps.kill(process.pid);//se metti la callback fa laggare tutto//appunto performance:https://github.com/sindresorhus/tasklist
					}
				});
			});
			
		});
	},

	playAccount: (id, _server) => {
	db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
		if (!fs.existsSync(userdat.value)) {
			return dialog.showErrorBox('Error', "User.dat not found!\nPlease edit the location from Setting section!");
		}
		backup.backupFile(userdat.value);
		db.settingDatastore.findOne({key: 'path.to.game.dll'}, (err, gamedll) => {
			if (null == gamedll || !fs.existsSync(gamedll.value)) {
				return dialog.showErrorBox('Error', "game.dll not found!\nPlease edit the location from Setting section!");
			}
			db.accountDatastore.findOne({_id: id}, (err, account) => {
				if (null == account) {
					return dialog.showErrorBox('Error', "Cannot find account!");
				}
				if (null != _server) {
					account.server = _server;
				}
				db.serverDatastore.findOne({name: account.server}, (err, server) => {
					if (null == server) {
						return dialog.showErrorBox('Error', "Cannot find server!");
					}
					let config = ini.parse(fs.readFileSync(userdat.value, 'utf-8'));
					let xy;
					try {
						xy = account.resolution.split('x');
						config.main.screen_width = xy[0];
						config.main.screen_height = xy[1];
					}
					catch (e) {
						log.error(e);
						dialog.showErrorBox('Error', e.toString());
					}
					const windowed = account.windowed ? 1 : 0;
					config.main.windowed = windowed;
					fs.writeFileSync(path.dirname(userdat.value) + '\\user.dat', ini.stringify(config, {}));
					const spawn = child_process.spawn;
					ps.lookup({
						command: 'game.dll',
						psargs: 'ux'
					}, (err, resultList) => {
						if (err) {
							log.error(err);
							throw new Error(err);
						}
						let flag = false;
						let c = 0;
						resultList.forEach(process => {
							if (process && process.arguments[3] == account.name) {
								flag = true;
							}
							c++;
						});
						while (c < resultList.length) {}
						if (flag){
							return dialog.showErrorBox('Error', "The account is already logged in!");
						}
						if (false == flag) {
							const prc = spawn(gamedll.value, [server.ip, server.port, server.n, account.name, account.password], {
								cwd:path.dirname(gamedll.value),
								setsid: false,
								detached: true
							});
							log.info('Spawned child pid: ' + prc.pid);
							if (undefined != account.title && '' != account.title && prc.pid > 0) {
								const exec = child_process.exec;
								exec(constants.titlerenamer_path() + ' ' + prc.pid + ' "' + account.title + '"', (err, so, se) => {});
							}
						}
					});
				});
			});
		});
	});
	},

	killTeam: id => {
		db.teamDatastore.findOne({_id: id}, (err, team) => {
			db.characterDatastore.find({name: {$in: [team.char0,
				team.char1,
				team.char2,
				team.char3,
				team.char4,
				team.char5,
				team.char6,
				team.char7,
			]}}, (err, characters) => {
				characters.forEach(character => {
					module.exports.killCharacter(character._id);
				});
			});
		});
	},

	playCharacterFromTeam: (_character, res, windowed, borderless, width, height, positionX, positionY) => {
		db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
			if (!fs.existsSync(userdat.value)) {
				return dialog.showErrorBox('Error', "User.dat not found!\nPlease edit the location from Setting section!");
			}
			backup.backupFile(userdat.value);
			db.settingDatastore.findOne({key: 'path.to.game.dll'}, (err, gamedll) => {
				if (null == gamedll || !fs.existsSync(gamedll.value)) {
					return dialog.showErrorBox('Error', "game.dll not found!\nPlease edit the location from Setting section!");
				}
				db.characterDatastore.findOne({name: _character}, (err, character) => {
					if (null == character) {
						return dialog.showErrorBox('Error', "Cannot find character name!");
					}
					db.accountDatastore.findOne({name: character.account}, (err, account) => {
						if (null == account) {
							return dialog.showErrorBox('Error', "Cannot find account data!");
						}
						db.serverDatastore.findOne({name: character.server}, (err, server) => {
							if (null == server) {
								return dialog.showErrorBox('Error', "Cannot find server!");
							}
							db.classDatastore.findOne({name: character.classe}, (err, classe) => {
								if (null == classe) {
									return dialog.showErrorBox('Error', "Cannot find class!");
								}
								db.realmDatastore.findOne({name: classe.realm}, (err, realm) => {
									if (null == realm) {
										return dialog.showErrorBox('Error', "Cannot find realm!");
									}
									let config = ini.parse(fs.readFileSync(userdat.value, 'utf-8'));
									let xy;
									try {
										xy = res.split('x');
										config.main.screen_width = xy[0];
										config.main.screen_height = xy[1];
									}
									catch (e) {
										log.error(e);
										dialog.showErrorBox('Error', e.toString());
									}
									config.main.windowed = windowed ? 1 : 0;
									//config.main.fullscreen_windowed = character.fullscreen_windowed ? 1 : 0;
									//config.keyboard.forward_breaks_runlock = character.forward_breaks_runlock ? 1 : 0;
									fs.writeFileSync(path.dirname(userdat.value) + "\\user.dat", ini.stringify(config, {}));
									const spawn = child_process.spawn;
									ps.lookup({
										command: 'game.dll',
										psargs: 'ux'
									}, (err, resultList) => {
										if (err) {
											log.error(err);
											throw new Error(err);
										}
										let flag = false;
										let c = 0;
										resultList.forEach(process => {
											if (process && process.arguments[3] == character.account) {
												flag = true;
											}
											c++;
										});
										while (c < resultList.length) {}
										if (flag){
											return dialog.showErrorBox('Error', "The account is already logged in!");
										}
										if (false == flag) {
											backup.backupFile(path.dirname(userdat.value) + '\\' + character.name.charAt(0).toUpperCase() + character.name.slice(1) + '-' + server.n + '.ini');
											const prc = spawn(gamedll.value, [server.ip, server.port, server.n, character.account, account.password, character.name, realm.n], {
												cwd: path.dirname(gamedll.value),
												setsid: false,
												detached: true
											});
											log.info('Spawned child pid: ' + prc.pid);
											const now = moment(Date.now()).format('DD/MM/YY HH:mm');
											//aggiorna timestamp last login e killa i mutants
											db.characterDatastore.update({_id: character._id}, {$set: {lastlogin: now}}, (err, numAffected, affectedDocuments) => {
												handle.killMutants();
											});
											if (undefined != character.title && '' != character.title && prc.pid > 0) {
												const exec = child_process.exec;
												exec(constants.titlerenamer_path() + ' ' + prc.pid + ' "' + character.title + '"', (err, so, se) => {});
											}
											else {
												if (undefined != account.title && '' != account.title && prc.pid > 0) {
													const exec = child_process.exec;
													exec(constants.titlerenamer_path() + ' ' + prc.pid + ' "' + account.title + '"', (err, so, se) => {});
												}
											}
											//gestione borderless
											if (true === borderless) {
												try {
													if (undefined === width || width < 800) {
														width = xy[0];
													}
													if (undefined === height || height < 600) {
														height = xy[1];
													}
												}
												catch (e) {
													log.error(e);
													width = 800;
													height = 600;
												}
												if (positionX === undefined || positionX === '') {
													positionX = 0;
												}
												if (positionY === undefined || positionY === '') {
													positionY = 0;
												}

												const exec = child_process.exec;
												exec(constants.borderless_path() + ' ' + prc.pid + ' ' +
													width + ' ' + height + ' ' + positionX + ' ' + positionY,
													(err, so, se) => {});
											}
										}
									});
								});
							});
						});
					});
				});
			});
		});
	}
}

