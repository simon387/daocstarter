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
const settingController = require('./controller/setting.js');
const characterController = require('./controller/character.js');
const accountController = require('./controller/account.js');
const serverController = require('./controller/server.js');
const classeController = require('./controller/classe.js');
const realmController = require('./controller/realm.js');
const userdatModule = require('./userdat-module.js');

module.exports = {
	playCharacter: async id => {
		const userdat = await settingController.findOneByKey(constants.pathToUserDat);
		if (!fs.existsSync(userdat.value)) {
			return dialog.showErrorBox(constants.error, constants.errorUserDatNF);
		}
		backup.backupFile(userdat.value);
		const gamedll = await settingController.findOneByKey(constants.pathToGameDll);
		if (null == gamedll || !fs.existsSync(gamedll.value)) {
			return dialog.showErrorBox(constants.error, constants.errorGameDllNF);
		}
		const character = await characterController.findOneById(id);
		const account = await accountController.findOneByName(character.account);
		const server = await serverController.findOneByName(character.server);
		const classe = await classeController.findOneByName(character.classe);
		const realm = await realmController.findOneByName(classe.realm);
		await userdatModule.setIniOnPlayCharacter(userdat, character);
		const spawn = child_process.spawn;
		ps.lookup({
			command: constants.gameDll,
			psargs: constants.psargs
		}, (err, resultList) => {
			if (err) {
				log.error(err);
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
	},

	playAccount: async (id, _server) => {
		const userdat = await settingController.findOneByKey(constants.pathToUserDat);
		if (!fs.existsSync(userdat.value)) {
			return dialog.showErrorBox(constants.error, constants.errorUserDatNF);
		}
		backup.backupFile(userdat.value);
		const gamedll = await settingController.findOneByKey(constants.pathToGameDll);
		if (null == gamedll || !fs.existsSync(gamedll.value)) {
			return dialog.showErrorBox(constants.error, constants.errorGameDllNF);
		}
		let account = await accountController.findOneById(id);
		if (null != _server) {
			account.server = _server;
		}
		let server = await serverController.findOneByName(account.server);
		await userdatModule.setIniOnPlayAccount(userdat, account);
		const spawn = child_process.spawn;
		ps.lookup({
			command: constants.gameDll,
			psargs: constants.psargs
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
	},

	killTeam: async id => {
		let team = await teamController.findOneById(id);
		let characters = await characterController.getByNameArray([team.char0,
			team.char1, team.char2, team.char3, team.char4, team.char5, team.char6, team.char7,
		]);
		characters.forEach(character => {
			module.exports.killCharacter(character._id);
		});
	},

	playCharacterFromTeam: async (_character, res, windowed, borderless, width, height, positionX, positionY) => {
		const userdat = await settingController.findOneByKey(constants.pathToUserDat);
		if (!fs.existsSync(userdat.value)) {
			return dialog.showErrorBox(constants.error, constants.errorUserDatNF);
		}
		backup.backupFile(userdat.value);
		const gamedll = await settingController.findOneByKey(constants.pathToGameDll);
		if (null == gamedll || !fs.existsSync(gamedll.value)) {
			return dialog.showErrorBox(constants.error, constants.errorGameDllNF);
		}
		let character = await characterController.findOneByName(_character);
		let account = await accountController.findOneByName(character.account);
		let server = await serverController.findOneByName(character.server);
		let classe = await classeController.findOneByName(character.classe);
		let realm = await realmController.findOneByName(classe.realm);
		await userdatModule.setIniOnPlayTeam(userdat, res, windowed);
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
	},
	
	killCharacter: async id => {
		let character = await characterController.findOneById(id);
		ps.lookup({
			command: constants.gameDll,
			psargs: constants.psargs
		}, (err, resultList) => {
			if (err) {
				log.error(err);
			}
			resultList.forEach(process => {
				if (process && process.arguments[3] == character.account && process.arguments[5] == character.name) {
					ps.kill(process.pid);//se metti la callback fa laggare tutto//appunto performance:https://github.com/sindresorhus/tasklist
				}
			});
		});
	},

	killAccount: async id => {
		let account = await accountController.findOneById(id);
		ps.lookup({
			command: constants.gameDll,
			psargs: constants.psargs
		}, (err, resultList) => {
			if (err) {
				log.error(err);
			}
			resultList.forEach(process => {
				if (process && process.arguments[3] == account.name) {
					ps.kill(process.pid);//se metti la callback fa laggare tutto//appunto performance:https://github.com/sindresorhus/tasklist
				}
			});
		});
	},

	killAllClients: () => {
		ps.lookup({
			command: constants.gameDll,
			psargs: constants.psargs
		}, (err, resultList) => {
			if (err) {
				log.error(err);
			}
			resultList.forEach(process => {
				ps.kill(process.pid);
			});
		});
	}
}
