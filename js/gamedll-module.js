const db = require("./db-module.js");
const {dialog} = require('electron');
const path = require('path');
const fs = require("fs");

module.exports = {//response.send(); con i return?
	playCharacter: function (id, response) {
		console.log("arrivata richiesta di play id=" + id);
		if (require('os').platform() != 'win32') {
			console.log("Per ora il modulo vga-module funziona solo su windows :(");
			return response.send();
		}
		db.settingDatastore.findOne({_id:"2"}, function(err, doc) {//cerco l'user.dat
			if (!fs.existsSync(doc["value"])) {
				dialog.showErrorBox("error", "User.dat not found!");
				return response.send();
			}
			let userdat = doc;
			db.settingDatastore.findOne({_id:"1"}, function(err, doc) {
				console.log("settingDatastore");console.log(doc);
				if (doc == null) {
					dialog.showErrorBox("error", "Cannot find setting!");
					return response.send();
				}
				if (!fs.existsSync(doc["value"])) {
					dialog.showErrorBox("error", "game.dll not found!");
					return response.send();
				}
				let gamedll = doc;
				db.characterDatastore.findOne({_id:id}, function(err, doc) {
					console.log("characterDatastore");console.log(doc);
					if (doc == null) {
						dialog.showErrorBox("error", "Cannot find setting!");
						return response.send();
					}
					let character = doc;
					db.accountDatastore.findOne({name:character["account"]}, function(err, doc) {
						console.log("accountDatastore");console.log(doc);
						if (doc == null) {
							dialog.showErrorBox("error", "Cannot find account!");
							return response.send();
						}
						let account = doc;
						db.serverDatastore.findOne({name:character["server"]}, function(err, doc) {
							console.log("serverDatastore");console.log(doc);
							if (doc == null) {
								dialog.showErrorBox("error", "Cannot find server!");
								return response.send();
							}
							let server = doc;
							db.classDatastore.findOne({name:character["class"]}, function(err, doc) {
								console.log("classDatastore");console.log(doc);
								if (doc == null) {
									dialog.showErrorBox("error", "Cannot find class!");
									return response.send();
								}
								let classe = doc;
								db.realmDatastore.findOne({name:classe["realm"]}, function(err, doc) {
									console.log("realmDatastore");console.log(doc);
									if (doc == null) {
										dialog.showErrorBox("error", "Cannot find realm!");
										return response.send();
									}
									let realm = doc;
									console.log(realm);
									console.log('gamedll["value"]');console.log(gamedll["value"]);
									console.log('server["ip"]');console.log(server["ip"]);
									console.log('server["port"]');console.log(server["port"]);
									console.log('server["n"]');console.log(server["n"]);
									console.log('character["account"]');console.log(character["account"]);
									console.log('account["password"]');console.log(account["password"]);
									console.log('character["name"]');console.log(character["name"]);
									console.log('realm["n"]');console.log(realm["n"]);
									console.log('path.dirname(gamedll["value"])');console.log(path.dirname(gamedll["value"]));

									//settare user.dat // all'inizio ci inserisci questo C:\Users\Simone\AppData\Roaming\Electronic Arts\Dark Age of Camelot
									let ini = require('ini');
									let config = ini.parse(fs.readFileSync(userdat["value"], 'utf-8'));
									let xy = character["resolution"].split("x");
									let windowed = character["windowed"] ? 1 : 0;
									config.main.screen_width = xy[0];
									config.main.screen_height = xy[1];
									config.main.windowed = windowed;
									fs.writeFileSync(path.dirname(userdat["value"]) + "\\user.dat", ini.stringify(config, {}));
									
									//TODO : handle call
									let spawn = require('child_process').spawn;
									let prc = spawn(gamedll["value"], [server["ip"], server["port"], server["n"], character["account"], account["password"], character["name"], realm["n"]], {
										cwd:path.dirname(gamedll["value"]), 
										setsid:false,
										detached:true,
									});
									console.log('Spawned child pid: ' + prc.pid);
	
									const moment = require('moment');
									const now = moment(Date.now()).format('DD/MM/YY HH:mm');
									//aggiornare timestamp last login
									db.characterDatastore.update({_id:id}, {$set:{lastlogin:now}} , function(err, numAffected, affectedDocuments) {
										return response.send(now);
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
