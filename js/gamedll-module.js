'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const ps = require('ps-node');
const {dialog, app} = require('electron');
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
const autoit = require('./autoit-module.js');

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
		}, async (err, resultList) => {
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
				return dialog.showErrorBox(constants.error, constants.errorAlreadyLoggedIn);
			}
			if (false == flag) {
				backup.backupFile(path.dirname(userdat.value) + '\\' + character.name.charAt(0).toUpperCase() + character.name.slice(1) + '-' + server.n + '.ini');
				const prc = spawn(gamedll.value, [server.ip, server.port, server.n, character.account, account.password, character.name, realm.n], {
					cwd: path.dirname(gamedll.value),
					setsid: false,
					detached: true
				});
				log.info('Spawned child pid: ' + prc.pid);
				await characterController.updateLastLogin(id);
				await autoit.renameCharacterWindow(prc, account, character);
				await autoit.applyBorderless(character.borderless, character.width,
					character.height, character.positionX, character.positionY);
				await handle.killMutants();
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
		}, async (err, resultList) => {
			if (err) {
				log.error(err);
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
				return dialog.showErrorBox(constants.error, constants.errorAlreadyLoggedIn);
			}
			if (false == flag) {
				const prc = spawn(gamedll.value, [server.ip, server.port, server.n, account.name, account.password], {
					cwd:path.dirname(gamedll.value),
					setsid: false,
					detached: true
				});
				log.info('Spawned child pid: ' + prc.pid);
				await renameAccountWindow(prc, account);
			}
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
			command: constants.gameDll,
			psargs: constants.psargs
		}, async (err, resultList) => {
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
				return dialog.showErrorBox(constants.error, constants.errorAlreadyLoggedIn);
			}
			if (false == flag) {
				backup.backupFile(path.dirname(userdat.value) + '\\' + character.name.charAt(0).toUpperCase() + character.name.slice(1) + '-' + server.n + '.ini');
				const prc = spawn(gamedll.value, [server.ip, server.port, server.n, character.account, account.password, character.name, realm.n], {
					cwd: path.dirname(gamedll.value),
					setsid: false,
					detached: true
				});
				log.info('Spawned child pid: ' + prc.pid);
				await characterController.updateLastLogin(character._id);
				await autoit.renameCharacterWindow(prc, account, character);
				await autoit.applyBorderless(borderless, width,
					height, positionX, positionY);
				await handle.killMutants();
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
	},

	killTeam: async id => {
		let team = await teamController.findOneById(id);
		let characters = await characterController.getByNameArray([team.char0,
			team.char1, team.char2, team.char3, team.char4, team.char5, team.char6, team.char7,
		]);
		characters.forEach(character => {
			module.exports.killCharacter(character._id);
		});
	}
}
