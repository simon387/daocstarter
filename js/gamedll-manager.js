const db_manager = require("./db-manager.js");
const {dialog} = require('electron');
const path = require('path');

module.exports = {//response.send(); con i return?
	playCharacter: function (id, response) {
		console.log("arrivata richiesta di play id=" + id);
		if (require('os').platform() != 'win32') {
			return;
		}
		db_manager.settingDatastore.findOne({_id:"2"}, function(err, doc) {//cerco l'user.dat
			if (!require('fs').existsSync(doc["value"])) {
				dialog.showErrorBox("error", "User.dat not found!");
				return;
			}
			let userdat = doc;
			db_manager.settingDatastore.findOne({_id:"1"}, function(err, doc) {
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
				db_manager.caracterDatastore.findOne({_id:id}, function(err, doc) {
					console.log("characterDatastore");console.log(doc);
					if (doc == null) {
						dialog.showErrorBox("error", "Cannot find setting!")
						return;
					}
					let character = doc;
					db_manager.accountDatastore.findOne({name:character["account"]}, function(err, doc) {
						console.log("accountDatastore");console.log(doc);
						if (doc == null) {
							dialog.showErrorBox("error", "Cannot find account!")
							return;
						}
						let account = doc;
						db_manager.serverDatastore.findOne({name:character["server"]}, function(err, doc) {
							console.log("serverDatastore");console.log(doc);
							if (doc == null) {
								dialog.showErrorBox("error", "Cannot find server!")
								return;
							}
							let server = doc;
							db_manager.classDatastore.findOne({name:character["class"]}, function(err, doc) {
								console.log("classDatastore");console.log(doc);
								if (doc == null) {
									dialog.showErrorBox("error", "Cannot find class!")
									return;
								}
								let classe = doc;
								db_manager.realmDatastore.findOne({name:classe["realm"]}, function(err, doc) {
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

}