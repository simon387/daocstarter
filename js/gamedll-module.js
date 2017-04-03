"use strict";

const db = require("./db-module.js");
const {dialog} = require('electron');
const path = require('path');
const fs = require("fs");
const child_process = require('child_process');
const ini = require('ini');
const moment = require('moment');
const os = require('os');
const ps = require('ps-node');

module.exports = {
	playCharacter: (id, response) => {
		db.settingDatastore.findOne({_id:"2"}, (err, userdat) => {
		if (!fs.existsSync(userdat["value"])) {
			dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");return response.send();
		}
		db.settingDatastore.findOne({_id:"1"}, (err, gamedll) => {
		if (null == gamedll) {
			dialog.showErrorBox("error", "Cannot find setting!");return response.send();
		}
		if (!fs.existsSync(gamedll["value"])) {
			dialog.showErrorBox("error", "game.dll not found!\nPlease edit the location from Setting section!");return response.send();
		}
		db.characterDatastore.findOne({_id:id}, (err, character) => {
		if (null == character) {
			dialog.showErrorBox("error", "Cannot find setting!");return response.send();
		}
		db.accountDatastore.findOne({name:character["account"]}, (err, account) => {
		if (null == account) {
			dialog.showErrorBox("error", "Cannot find account!");return response.send();
		}
		db.serverDatastore.findOne({name:character["server"]}, (err, server) => {
		if (null == server) {
			dialog.showErrorBox("error", "Cannot find server!");return response.send();
		}
		db.classDatastore.findOne({name:character["classe"]}, (err, classe) => {
		if (null == classe) {
			dialog.showErrorBox("error", "Cannot find class!");return response.send();
		}
		db.realmDatastore.findOne({name:classe["realm"]}, (err, realm) => {
		if (null == realm) {
			dialog.showErrorBox("error", "Cannot find realm!");return response.send();
		}
		let config = ini.parse(fs.readFileSync(userdat["value"], 'utf-8'));
		const xy = character["resolution"].split("x");
		const windowed = character["windowed"] ? 1 : 0;
		config.main.screen_width = xy[0];
		config.main.screen_height = xy[1];
		config.main.windowed = windowed;
		fs.writeFileSync(path.dirname(userdat["value"]) + "\\user.dat", ini.stringify(config, {}));
		const spawn = child_process.spawn;
		const prc = spawn(gamedll["value"], [server["ip"], server["port"], server["n"], character["account"], account["password"], character["name"], realm["n"]], {
			cwd:path.dirname(gamedll["value"]),
			setsid:false,
			detached:true
		});
		console.log('Spawned child pid: ' + prc.pid);
		const now = moment(Date.now()).format('DD/MM/YY HH:mm');
		//aggiorna timestamp last login e killa i mutants
		db.characterDatastore.update({_id:id}, {$set:{lastlogin:now}}, (err, numAffected, affectedDocuments) => {
			require("./handle-module.js").killMutants();
			return response.send(now);
		});
		if (undefined != character['title'] && "" != character['title'] && prc.pid > 0) {
			const exec = child_process.exec;//occhio che non hai testato senza required
			exec(os.tmpdir() + "\\titlerenamer.exe " + prc.pid + ' "' + character['title'] + '"', (err, so, se) => {});
		}
		});});});});});});
	});
	},
	killCharacter: (id, response) => {
		console.log("killCharacter called")
		db.characterDatastore.findOne({_id:id}, (err, character) => {
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
			return response.send();
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
	playAccount: (id, response) => {
		dialog.showMessageBox({title:"info", message:"Still working on it!"});
		//TODO
		return response.send();
	}
}
