const dbPath = app.getPath("userData");

let accountDatastore;
let characterDatastore;
let serverDatastore;
let realmDatastore;
let classDatastore;
let settingDatastore;

module.exports = {
	getAccountDatastore: function() {
		return accountDatastore;
	},
	getCharacterDatastore: function() {
		return characterDatastore;
	},
	getServerDatastore: function() {
		return serverDatastore;
	},
	getRealmDatastore: function() {
		return realmDatastore;
	},
	getClassDatastore: function() {
		return classDatastore;
	},
	getSettingDatastore: function() {
		return settingDatastore;
	},
	initDBandExpress: function() {
		let Datastore = require('nedb')
		//account
		accountDatastore = new Datastore({filename:dbPath + '/db/account', autoload:true});
		accountDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		//server
		serverDatastore = new Datastore({filename:dbPath + '/db/server', autoload:true});
		serverDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		serverDatastore.insert([
			{name:'Ywain1', ip:"107.23.173.143", port:"10622", n:"41"},
			{name:'Ywain2', ip:"107.23.173.143", port:"10622", n:"49"},
			{name:'Ywain3', ip:"107.23.173.143", port:"10622", n:"50"},
			{name:'Ywain4', ip:"107.23.173.143", port:"10622", n:"51"},
			{name:'Ywain5', ip:"107.23.173.143", port:"10622", n:"52"},
			{name:'Ywain6', ip:"107.23.173.143", port:"10622", n:"53"},
			{name:'Ywain7', ip:"107.23.173.143", port:"10622", n:"54"},
			{name:'Ywain8', ip:"107.23.173.143", port:"10622", n:"55"},
			{name:'Ywain9', ip:"107.23.173.143", port:"10622", n:"56"},
			{name:'Ywain10', ip:"107.23.173.143", port:"10622", n:"57"}], function(err) {});
		//realm
		realmDatastore = new Datastore({filename:dbPath + '/db/realm', autoload:true});
		realmDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		realmDatastore.insert([
			{name:'Albion', n:"1"},
			{name:'Hibernia', n:"3"},
			{name:'Midgard', n:"2"}], function(err) {});
		//class
		classDatastore = new Datastore({filename:dbPath + '/db/class', autoload:true});
		classDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		classDatastore.insert([
			{name:'Armsman', realm:'Albion'},
			{name:'Cabalist', realm:'Albion'},
			{name:'Cleric', realm:'Albion'},
			{name:'Friar', realm:'Albion'},
			{name:'Heretic', realm:'Albion'},
			{name:'Infiltrator', realm:'Albion'},
			{name:'Mauler (Alb)', realm:'Albion'},
			{name:'Mercenary', realm:'Albion'},
			{name:'Minstrel', realm:'Albion'},
			{name:'Necromancer', realm:'Albion'},
			{name:'Paladin', realm:'Albion'},
			{name:'Reaver', realm:'Albion'},
			{name:'Scout', realm:'Albion'},
			{name:'Sorcerer', realm:'Albion'},
			{name:'Theurg', realm:'Albion'},
			{name:'Wizard', realm:'Albion'},
			{name:'Animist', realm:'Hibernia'},
			{name:'Bainshee', realm:'Hibernia'},
			{name:'Bard', realm:'Hibernia'},
			{name:'Blademaster', realm:'Hibernia'},
			{name:'Champion', realm:'Hibernia'},
			{name:'Druid', realm:'Hibernia'},
			{name:'Eldritch', realm:'Hibernia'},
			{name:'Enchanter', realm:'Hibernia'},
			{name:'Hero', realm:'Hibernia'},
			{name:'Mauler (Hib)', realm:'Hibernia'},
			{name:'Mentalist', realm:'Hibernia'},
			{name:'Nightshade', realm:'Hibernia'},
			{name:'Ranger', realm:'Hibernia'},
			{name:'Valewalker', realm:'Hibernia'},
			{name:'Vampiir', realm:'Hibernia'},
			{name:'Warden', realm:'Hibernia'},
			{name:'Berserker', realm:'Midgard'},
			{name:'Bonedancer', realm:'Midgard'},
			{name:'Healer', realm:'Midgard'},
			{name:'Hunter', realm:'Midgard'},
			{name:'Mauler (Mid)', realm:'Midgard'},
			{name:'Runemaster', realm:'Midgard'},
			{name:'Savage', realm:'Midgard'},
			{name:'Shadowblade', realm:'Midgard'},
			{name:'Shaman', realm:'Midgard'},
			{name:'Skald', realm:'Midgard'},
			{name:'Spiritmaster', realm:'Midgard'},
			{name:'Thane', realm:'Midgard'},
			{name:'Valkyrie', realm:'Midgard'},
			{name:'Warlock', realm:'Midgard'},
			{name:'Warrior', realm:'Midgard'}], function(err) {});
		//character
		characterDatastore = new Datastore({filename:dbPath + '/db/character', autoload:true});
		//setting
		settingDatastore = new Datastore({filename:dbPath + '/db/setting', autoload:true});
		settingDatastore.ensureIndex({fieldName:'key', unique:true}, function(err) {});
		settingDatastore.insert([{_id:'1', key:'path.to.game.dll', type:'File', value:'C:\\\\Program Files (x86)\\\\Electronic Arts\\\\Dark Age of Camelot\\\\game.dll'}], function(err) {});
		settingDatastore.insert([{_id:'2', key:'path.to.user.dat', type:'File', value:app.getPath("appData").replace(/\\/g, "\\\\") + '\\\\Electronic Arts\\\\Dark Age of Camelot\\\\LotM\\\\user.dat'}], function(err) {});
		startExpress();
	}

}








//{"aaData":[["39","simone","simon387@hotmail.it","1211",null,"<a data-id=\"row-39\" href=\"javascript:editRow(39);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(39);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}
function getAllAccounts(response) {
	accountDatastore.find({}, function(err, docs) {
		let ret = '{"aaData":[';
		docs.forEach(function (item) {
			ret += '["' + item._id + '","' + item.name + '","' + item.password + '","' + "<a data-id='row-" + item._id
			+ "' href=javascript:editAccountRow(\'" + item._id + "\'); class='sr-button btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href=javascript:removeAccountRow(\'" + item._id + "\'); class='sr-button btnX btn-default btn-md btnX-delete'>delete<\/a>" + '"],';
		});
		response.send(correggiRispostaPerDT(ret));
	});
}

function getAllCharacters(response) {
	characterDatastore.find({}, function(err, docs){
		let ret = '{"aaData":[';
		docs.forEach(function (item) {
			ret += '["' + item._id + '","' +  
			"<a href=javascript:playCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-primary btn-sm sr-button'>play<\/a>"
			+ '","' + item.name + '","' + item.lastlogin + '","' + item.account + '","' + item.server + '","' + item.class + '","' + item.resolution + '","' + item.windowed + '","' + "<a data-id='row-" + item._id
			+ "' href=javascript:editCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href=javascript:removeCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-default btn-md btnX-delete'>delete<\/a>" + '"],';
		});
		response.send(correggiRispostaPerDT(ret));
	});
}	

function getAllSettings(response) {
	settingDatastore.find({}, function(err, docs){
		let ret = '{"aaData":[';
		docs.forEach(function (item) {
			ret += '["' + item._id + '","' + item.key + '","' + item.value + '","' + "<a data-id='row-" + item._id
			+ "' href='javascript:editSettingRow" + item.type + "(" + item._id + ");' class='sr-button btnX btn-md btn-successX'>edit<\/a>" + '"],';
		});
		response.send(correggiRispostaPerDT(ret));
	});
}

function correggiRispostaPerDT(ret) {
	ret = ret.slice(0, -1);
	ret += ']}';
	if (ret === '{"aaData":]}') {
		ret ='{"aaData":[]}';
	}
	return ret;
}

function getAllAccountsNames(response) {
	accountDatastore.find({}, function(err, docs) {
		return getAllNamesHelper(response, docs);
	});
}

function getAllServersNames(response) {
	serverDatastore.find({}, function(err, docs) {
		return getAllNamesHelper(response, docs);
	});
}

function getAllClassesNames(response) {
	classDatastore.find({}, function(err, docs) {
		return getAllNamesHelper(response, docs);
	});
}

function getAllNamesHelper(response, docs) {
	let array = [];
	docs.forEach(function (doc) {
		array.push(doc.name);
	});
	return response.send(array.sort());
}

function startExpress() {
	let express = require('express');
	let server = express();
	let port = 3000;

	server.get('/', function (request, response) {
		//response.setHeader('Content-Type', 'application/json');
		if (request.query.playCharacter != undefined) {
			playCharacter(request.query.playCharacter, response);
		}
		if (request.query.getAllAccountsNames != undefined) {
			getAllAccountsNames(response);
		}
		if (request.query.getAllServersNames != undefined) {
			getAllServersNames(response);
		}
		if (request.query.getAllClassesNames != undefined) {
			getAllClassesNames(response);
		}
		if (request.query.getAllResolutions != undefined) {
			let vga_info = require("./js/vga-info.js");
			vga_info.getAllResolutions(response);
		}
		//account
		if (request.query.ajaxAccount != undefined || request.query.removeAccount != undefined || request.query.editAccount != undefined) {
			if (request.query.removeAccount != undefined) {
				accountDatastore.remove({_id:request.query.removeAccount}, {multi:false}, function(err, numRemoved) {});
			}
			if (request.query.editAccount != undefined) {//per aprire la modal di edit, ritorniamo l'elemento da modificare
				accountDatastore.findOne({_id:request.query.editAccount}, function (err, doc) {
					response.send(doc);
				});
			} else {//view normale
				getAllAccounts(response);
			}
		}
		//character
		if (request.query.ajaxCharacter != undefined || request.query.removeCharacter != undefined || request.query.editCharacter != undefined) {
			if (request.query.removeCharacter != undefined) {
				characterDatastore.remove({_id:request.query.removeCharacter}, {multi:false}, function(err, numRemoved) {});
			}
			if (request.query.editCharacter != undefined) {
				characterDatastore.findOne({_id:request.query.editCharacter}, function(err, doc) {
					response.send(doc);
				});
			} else {
				getAllCharacters(response);
			}
		}
		//setting
		if (request.query.ajaxSetting != undefined || request.query.removeSetting != undefined || request.query.editSetting != undefined) {
			if (request.query.removeSetting != undefined) {
				//non facciamo cancellare i settings! settingDatastore.remove({_id:request.query.removeSetting}, {multi:false}, function(err, numRemoved) {});
			}
			if (request.query.editSetting != undefined) {
				settingDatastore.findOne({_id:request.query.editSetting}, function(err, doc) {
					response.send(doc);
				});
			} else {
				getAllSettings(response);
			}
		}
	});

	server.post('/', function (request, response) {
		let body = '';
		//response.setHeader('Content-Type', 'application/json');
		request.on('data', function (data) {
			body += data;
			if (body.length > 1e6) {
				request.connection.destroy();
			}
		});

		request.on('end', function () {
			let post = require('querystring').parse(body);
			if (request.query.playCharacter != undefined) {
				playCharacter(request.query.playCharacter);
			}
			//account
			if (request.query.addAccount != undefined || request.query.editAccount != undefined) {
				if (request.query.addAccount != undefined) {
					accountDatastore.insert({name:post['account-name'], password:post['account-password']}, function(err, newDoc) {   // Callback is optional
						response.send(newDoc);
					});
				} else if (request.query.editAccount != undefined) {
					accountDatastore.update({_id:request.query.editAccount}, {$set:{name:post['account-name'], password:post['account-password']}}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
						response.send(affectedDocuments);
					});
				}
			}
			//char
			if (request.query.addCharacter != undefined || request.query.editCharacter != undefined) {
				let characterWindowed = post['character-windowed'] === undefined ? false : true; 
				if (request.query.addCharacter != undefined) {
					
					characterDatastore.insert({name:post['character-name'], lastlogin:'-', account:post['character-account'], server:post['character-server'], class:post['character-class'], resolution:post['character-resolution'], windowed:characterWindowed}, function(err, newDoc) {
						response.send(newDoc);
					});
				} else if (request.query.editCharacter != undefined) {
					characterDatastore.update({_id:request.query.editCharacter},{$set:{name:post['character-name'], account:post['character-account'], server:post['character-server'], class:post['character-class'], resolution:post['character-resolution'], windowed:characterWindowed}}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
						response.send(affectedDocuments);
					});
				}
			}
			//setting per ora con i file
			if (request.query.editSetting != undefined) {
				settingDatastore.update({_id:request.query.editSetting}, {$set:{value:post['setting-value-file']}}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
					response.send(affectedDocuments);
				});
			}
		});
	});

	server.listen(port, function () {
		console.log('Express running in electron and listening on port ' + port + '!');
	});
}



function playCharacter(id, response) {
	console.log("arrivata richiesta di play id=" + id);
	if (require('os').platform() != 'win32') {
		return;
	}
	settingDatastore.findOne({_id:"2"}, function(err, doc) {//cerco l'user.dat
		if (!require('fs').existsSync(doc["value"])) {
			dialog.showErrorBox("error", "User.dat not found!");
			return;
		}
		let userdat = doc;
		settingDatastore.findOne({_id:"1"}, function(err, doc) {
			console.log("settingDatastore");console.log(doc);
			if (doc == null) {
				dialog.showErrorBox("error", "Cannot find setting!")
				return;
			}
			if (!require('fs').existsSync(doc["value"])) {
				dialog.showErrorBox("error", "game.dll not found!");
				return;
			}
			let gamedll = doc;
			characterDatastore.findOne({_id:id}, function(err, doc) {
				console.log("characterDatastore");console.log(doc);
				if (doc == null) {
					dialog.showErrorBox("error", "Cannot find setting!")
					return;
				}
				let character = doc;
				accountDatastore.findOne({name:character["account"]}, function(err, doc) {
					console.log("accountDatastore");console.log(doc);
					if (doc == null) {
						dialog.showErrorBox("error", "Cannot find account!")
						return;
					}
					let account = doc;
					serverDatastore.findOne({name:character["server"]}, function(err, doc) {
						console.log("serverDatastore");console.log(doc);
						if (doc == null) {
							dialog.showErrorBox("error", "Cannot find server!")
							return;
						}
						let server = doc;
						classDatastore.findOne({name:character["class"]}, function(err, doc) {
							console.log("classDatastore");console.log(doc);
							if (doc == null) {
								dialog.showErrorBox("error", "Cannot find class!")
								return;
							}
							let classe = doc;
							realmDatastore.findOne({name:classe["realm"]}, function(err, doc) {
								console.log("realmDatastore");console.log(doc);
								if (doc == null) {
									dialog.showErrorBox("error", "Cannot find realm!")
									return;
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
								let fs = require('fs');
								let ini = require('ini');
								let config = ini.parse(fs.readFileSync(userdat["value"], 'utf-8'));
								let xy = character["resolution"].split("x");
								let windowed = character["windowed"] ? 1 : 0;
								config.main.screen_width = xy[0];
								config.main.screen_height = xy[1];
								config.main.windowed = windowed;
								fs.writeFileSync(path.dirname(userdat["value"]) + "\\user.dat", ini.stringify(config, {}));
								
								//handle.exe
								/* traduciti questo da autoit !
								If IsAdmin() <> 1 Then GUICtrlSetData($Label_, "No admin priv. !")
								FileInstall("C:\Users\Simone\Google Drive\dev\AUTOIT\DAoC_Starter\handle.exe", @TempDir & "\handle.exe");FileInstall("C:\ZZZ\AUTOIT\DAoC_Starter\Eula.txt", $path & "\Eula.txt")
								Local $array = ProcessList("game.dll"), $file, $hex
								If IsArray($array) == 1 Then
									FileDelete(@TempDir & "\tmp")
									For $i = 1 To $array[0][0]
										RunWait(@ComSpec & ' /c "' & @TempDir & '\handle" -a -p ' & $array[$i][1] & ' >> tmp', @TempDir, @SW_HIDE)
										Local $file = FileOpen(@TempDir & "\tmp", 0)
										If $file = -1 Then Return
										While 1
											$line = FileReadLine($file)
											If @error = -1 Then ExitLoop
											If StringInStr($line, "BaseNamedObjects\DAoC") <> 0 Then;mutex delle #istanze e dell'IP_reame
												$line = StringStripWS($line, 8)
												$hex = StringSplit($line, ":")
												ShellExecuteWait(@TempDir & "\handle.exe", "-c " & $hex[1] & " -y -p " & $array[$i][1], @TempDir, Default, @SW_HIDE)
											EndIf
										WEnd
										FileClose($file)
										FileDelete(@TempDir & "\tmp")
									Next
								EndIf
								*/

								var exec = require('child_process').exec; 
								exec('NET SESSION', function(err,so,se) {
									let admin = se.length === 0 ? true : false;
									if (admin) {
										//TODO
									} else {
										console.log("non sei admin!");
										//dialog.showErrorBox("error", "you are not running AS ADMIN! you can run only 2 clients at the same time! Run as Admin to avoid this message");
									}
								});



/*
								let spawn = require('child_process').spawn;
								let prc = spawn(gamedll["value"], [server["ip"], server["port"], server["n"], character["account"], account["password"], character["name"], realm["n"]], {
									cwd:path.dirname(gamedll["value"]), 
									setsid:false,
									detached:true,
								});
								console.log('Spawned child pid: ' + prc.pid);
*/

								//aggiornare timestamp last login
								response.send();
							});
						});
					});
				});
			});
		});
	});
}
