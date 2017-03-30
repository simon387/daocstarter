"use strict";

const db = require("./db-module.js");
const {dialog} = require('electron');
const path = require('path');
const fs = require("fs");
const child_process = require('child_process');

module.exports = {
	playCharacter: function (id, response) {
		if (require('os').platform() != 'win32') {//console.log("Per ora il modulo gamedll-module funziona solo su windows :(");
			return response.send();
		}
		db.settingDatastore.findOne({_id:"2"}, function(err, doc) {//cerco l'user.dat
			if (!fs.existsSync(doc["value"])) {
				dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");
				return response.send();
			}
			let userdat = doc;
			db.settingDatastore.findOne({_id:"1"}, function(err, doc) {
				if (doc == null) {
					dialog.showErrorBox("error", "Cannot find setting!");
					return response.send();
				}
				if (!fs.existsSync(doc["value"])) {
					dialog.showErrorBox("error", "game.dll not found!\nPlease edit the location from Setting section!");
					return response.send();
				}
				let gamedll = doc;
				db.characterDatastore.findOne({_id:id}, function(err, doc) {
					if (doc == null) {
						dialog.showErrorBox("error", "Cannot find setting!");
						return response.send();
					}
					let character = doc;
					db.accountDatastore.findOne({name:character["account"]}, function(err, doc) {
						if (doc == null) {
							dialog.showErrorBox("error", "Cannot find account!");
							return response.send();
						}
						let account = doc;
						db.serverDatastore.findOne({name:character["server"]}, function(err, doc) {
							if (doc == null) {
								dialog.showErrorBox("error", "Cannot find server!");
								return response.send();
							}
							let server = doc;
							db.classDatastore.findOne({name:character["class"]}, function(err, doc) {
								if (doc == null) {
									dialog.showErrorBox("error", "Cannot find class!");
									return response.send();
								}
								let classe = doc;
								db.realmDatastore.findOne({name:classe["realm"]}, function(err, doc) {
									if (doc == null) {
										dialog.showErrorBox("error", "Cannot find realm!");
										return response.send();
									}
									let realm = doc;
									//settare user.dat // all'inizio ci inserisci questo C:\Users\Simone\AppData\Roaming\Electronic Arts\Dark Age of Camelot
									let ini = require('ini');
									let config = ini.parse(fs.readFileSync(userdat["value"], 'utf-8'));
									let xy = character["resolution"].split("x");
									let windowed = character["windowed"] ? 1 : 0;
									config.main.screen_width = xy[0];
									config.main.screen_height = xy[1];
									config.main.windowed = windowed;
									fs.writeFileSync(path.dirname(userdat["value"]) + "\\user.dat", ini.stringify(config, {}));
									let spawn = child_process.spawn;
									let prc = spawn(gamedll["value"], [server["ip"], server["port"], server["n"], character["account"], account["password"], character["name"], realm["n"]], {
										cwd:path.dirname(gamedll["value"]),
										setsid:false,
										detached:true
									});
									console.log('Spawned child pid: ' + prc.pid);
									const moment = require('moment');
									const now = moment(Date.now()).format('DD/MM/YY HH:mm');
									//aggiorna timestamp last login e killa i mutants
									db.characterDatastore.update({_id:id}, {$set:{lastlogin:now}} , function(err, numAffected, affectedDocuments) {
										require("./handle-module.js").killMutants();
										return response.send(now);
									});
									//da prc.pid fai partire l'exe che aggiorna
									const os = require('os');
									if (undefined != character['title'] && "" != character['title'] && prc.pid > 0) {
										let exec = require('child_process').exec; 
										exec(os.tmpdir() + "\\titlerenamer.exe " + prc.pid + " " + character['title'], function(err, so, se) {});
									}
								});
							});
						});
					});
				});
			});
		});
	},
	killCharacter: function (id, response) {
		console.log("killCharacter called")
		db.characterDatastore.findOne({_id:id}, function(err, character) {
			let ps = require('ps-node');
			ps.lookup({
				command: 'game.dll',
				psargs: 'ux'
			}, function(err, resultList) {
				if (err) {
					throw new Error(err);
				}
				resultList.forEach(function(process){
					if (process && process.arguments[3] == character["account"] && process.arguments[5] == character["name"]) {
						ps.kill(process.pid);//se metti la callback fa laggare tutto//appunto performance:https://github.com/sindresorhus/tasklist
					}
				});
			});
			return response.send();
		});
	}
}
