'use strict';

const db = require("./db-module.js");
const {dialog} = require('electron');
const path = require('path');
const fs = require("fs");
const child_process = require('child_process');
const ini = require('ini');
const moment = require('moment');
const os = require('os');
const ps = require('ps-node');
const handle = require("./handle-module.js");

module.exports = {
	playCharacter: id => {
		db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
		if (!fs.existsSync(userdat['value'])) {
			return dialog.showErrorBox('error', "User.dat not found!\nPlease edit the location from Setting section!");
		}
		db.settingDatastore.findOne({key: 'path.to.game.dll'}, (err, gamedll) => {
		if (null == gamedll || !fs.existsSync(gamedll['value'])) {
			return dialog.showErrorBox('error', "game.dll not found!\nPlease edit the location from Setting section!");
		}
		db.characterDatastore.findOne({_id: id}, (err, character) => {
		if (null == character) {
			return dialog.showErrorBox('error', "Cannot find setting!");
		}
		db.accountDatastore.findOne({name: character["account"]}, (err, account) => {
		if (null == account) {
			return dialog.showErrorBox('error', "Cannot find account!");
		}
		db.serverDatastore.findOne({name: character["server"]}, (err, server) => {
		if (null == server) {
			return dialog.showErrorBox('error', "Cannot find server!");
		}
		db.classDatastore.findOne({name: character["classe"]}, (err, classe) => {
		if (null == classe) {
			return dialog.showErrorBox('error', "Cannot find class!");
		}
		db.realmDatastore.findOne({name: classe["realm"]}, (err, realm) => {
		if (null == realm) {
			return dialog.showErrorBox('error', "Cannot find realm!");
		}
		let config = ini.parse(fs.readFileSync(userdat["value"], 'utf-8'));
		const xy = character['resolution'].split('x');
		const windowed = character["windowed"] ? 1 : 0;
		config.main.screen_width = xy[0];
		config.main.screen_height = xy[1];
		config.main.windowed = windowed;
		fs.writeFileSync(path.dirname(userdat["value"]) + "\\user.dat", ini.stringify(config, {}));
		const spawn = child_process.spawn;


	ps.lookup({
		command: 'game.dll',
		psargs: 'ux'
	}, (err, resultList) => {
		if (err) {
			throw new Error(err);
		}
		let flag = false;
		let c = 0;
		let max = resultList.length;
		console.log("c=" + c)
		console.log("max=" + max)
		resultList.forEach(process => {
			if (process && process.arguments[3] == character["account"]) {
				flag = true;
			}
			c++;
		});
		while(c < max) {

		}
		if(flag){
			console.log('GIA LOGGATO!!!!!!!!!!!!!!')
		}
		if (false == flag) {
			//play
			const prc = spawn(gamedll["value"], [server["ip"], server["port"], server["n"], character["account"], account["password"], character["name"], realm["n"]], {
				cwd: path.dirname(gamedll["value"]),
				setsid: false,
				detached: true
			});
			console.log('Spawned child pid: ' + prc.pid);
			const now = moment(Date.now()).format('DD/MM/YY HH:mm');
			//aggiorna timestamp last login e killa i mutants
			db.characterDatastore.update({_id: id}, {$set: {lastlogin: now}}, (err, numAffected, affectedDocuments) => {
				handle.killMutants();
			});
			if (undefined != character['title'] && '' != character['title'] && prc.pid > 0) {
				const exec = child_process.exec;
				exec(os.tmpdir() + '\\titlerenamer.exe ' + prc.pid + ' "' + character['title'] + '"', (err, so, se) => {});
			}
			
		}
	});











		});});});});});});
	});
	},


	killCharacter: id => {
		db.characterDatastore.findOne({_id: id}, (err, character) => {
			ps.lookup({
				command: 'game.dll',
				psargs: 'ux'
			}, (err, resultList) => {
				if (err) {
					throw new Error(err);
				}
				resultList.forEach(process => {
					if (process && process.arguments[3] == character["account"] && process.arguments[5] == character["name"]) {
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
					throw new Error(err);
				}
				resultList.forEach(process => {
					if (process && process.arguments[3] == account['name']) {
						ps.kill(process.pid);//se metti la callback fa laggare tutto//appunto performance:https://github.com/sindresorhus/tasklist
					}
				});
			});
			
		});
	},

	playAccount: id => {
		db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
		if (!fs.existsSync(userdat['value'])) {
			return dialog.showErrorBox('error', "User.dat not found!\nPlease edit the location from Setting section!");
		}
		db.settingDatastore.findOne({key: 'path.to.game.dll'}, (err, gamedll) => {
		if (null == gamedll || !fs.existsSync(gamedll['value'])) {
			return dialog.showErrorBox('error', "game.dll not found!\nPlease edit the location from Setting section!");
		}
		db.accountDatastore.findOne({_id: id}, (err, account) => {
		if (null == account) {
			return dialog.showErrorBox('error', "Cannot find account!");
		}
		db.serverDatastore.findOne({name:account["server"]}, (err, server) => {
		if (null == server) {
			return dialog.showErrorBox('error', "Cannot find server!");
		}

		let config = ini.parse(fs.readFileSync(userdat['value'], 'utf-8'));
		const xy = account['resolution'].split('x');
		const windowed = account['windowed'] ? 1 : 0;
		config.main.screen_width = xy[0];
		config.main.screen_height = xy[1];
		config.main.windowed = windowed;
		fs.writeFileSync(path.dirname(userdat['value']) + '\\user.dat', ini.stringify(config, {}));
		const spawn = child_process.spawn;
		const prc = spawn(gamedll['value'], [server['ip'], server['port'], server['n'], account['name'], account['password']], {
			cwd:path.dirname(gamedll['value']),
			setsid: false,
			detached: true
		});
		console.log('Spawned child pid: ' + prc.pid);
		if (undefined != account['title'] && '' != account['title'] && prc.pid > 0) {
			const exec = child_process.exec;
			exec(os.tmpdir() + '\\titlerenamer.exe ' + prc.pid + ' "' + account['title'] + '"', (err, so, se) => {});
		}
		});});});
	});
	}
}
//kek
function accountAlreadyLoggedIn(accountName) {
	ps.lookup({
		command: 'game.dll',
		psargs: 'ux'
	}, (err, resultList) => {
		if (err) {
			throw new Error(err);
		}
		let flag = false;
		let c = 0;
		let max = resultList.length;
		console.log("c=" + c)
		console.log("max=" + max)
		resultList.forEach(process => {
			if (process && process.arguments[3] == accountName) {
				flag = true;
			}
			c++;
		});
		while(c < max) {

		}
		if (false == flag) {
			//play
		}
	});
}
