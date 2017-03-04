"use strict";
let accountDatastore;
let characterDatastore;
let serverDatastore;
let realmDatastore;
let classDatastore;
let settingDatastore;


var fs = require('fs');//C:\electron\daocstarter\db
var filePath = 'C:/electron/daocstarter/db/setting'; 
fs.unlinkSync(filePath);

initDBandExpress();

function initDBandExpress() {
	let Datastore = require('nedb')
	//account
	accountDatastore = new Datastore({filename:'db/account', autoload:true});
	accountDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
	//server
	serverDatastore = new Datastore({filename:'db/server', autoload:true});
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
	realmDatastore = new Datastore({filename:'db/realm', autoload:true});
	realmDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
	realmDatastore.insert([
		{name:'Albion', n:1},
		{name:'Hibernia', n:3},
		{name:'Midgard', n:2}], function(err) {});
	//class
	classDatastore = new Datastore({filename:'db/class', autoload:true});
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
		{name:'Spiritmaster', realm:''},
		{name:'Thane', realm:'Midgard'},
		{name:'Valkyrie', realm:'Midgard'},
		{name:'Warlock', realm:'Midgard'},
		{name:'Warrior', realm:'Midgard'}], function(err) {});
	//character
	characterDatastore = new Datastore({filename:'db/character', autoload:true});
	//setting
	settingDatastore = new Datastore({filename:'db/setting', autoload:true});
	settingDatastore.ensureIndex({fieldName:'key', unique:true}, function(err) {});
	settingDatastore.insert([{_id:'1', key:'game.dll.path', type:'File', value:'C:\\\\Program Files (x86)\\\\Electronic Arts\\\\Dark Age of Camelot\\\\game.dll'}], function(err) {});
	settingDatastore.persistence.setAutocompactionInterval(5555);
	startExpress();
}

//{"aaData":[["39","simone","simon387@hotmail.it","1211",null,"<a data-id=\"row-39\" href=\"javascript:editRow(39);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(39);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}
function getAllAccounts(response) {
	accountDatastore.find({}, function(err, docs) {
		let ret = '{"aaData":[';
		docs.forEach(function (item) {
			ret += '["' + item._id + '","' + item.name + '","' + item.password + '","' + "<a data-id='row-" + item._id
			+ "' href=javascript:editAccountRow(\'" + item._id + "\'); class='btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href=javascript:removeAccountRow(\'" + item._id + "\'); class='btnX btn-default btn-md btnX-delete'>remove<\/a>" + '"],';;
		});
		response.send(correggiRispostaPerDT(ret));
	});
}

function getAllCharacters(response) {
	characterDatastore.find({}, function(err, docs){
		let ret = '{"aaData":[';
		docs.forEach(function (item) {
			ret += '["' + item._id + '","' + item.name + '","' + item.lastlogin + '","' + item.account + '","' + item.server + '","' + item.class + '","' + item.resolution + '","' + item.windowed + '","' + "<a data-id='row-" + item._id
			+ "' href='javascript:editCharacterRow(\'" + item._id + "\'); class='btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href='javascript:removeCharacterRow(\'" + item._id + "\'); class='btnX btn-default btn-md btnX-delete'>remove<\/a>" + '"],';
		});
		response.send(correggiRispostaPerDT(ret));
	});
}	

function getAllSettings(response) {
	settingDatastore.find({}, function(err, docs){
		let ret = '{"aaData":[';
		docs.forEach(function (item) {
			ret += '["' + item._id + '","' + item.key + '","' + item.value + '","' + "<a data-id='row-" + item._id
			+ "' href='javascript:editSettingRow" + item.type + "(" + item._id + ");' class='btnX btn-md btn-successX'>edit<\/a>" + '"],';
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

function getAllResolutions(response) {
	if (require('os').platform() != 'win32') {
		return;
	}
	var shell = require('node-powershell');
	var ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
	ps.addCommand('Get-WMIObject -query "SELECT * FROM CIM_VideoControllerResolution" | Select Caption')
		.then(function(){
			return ps.invoke();
		})
		.then(function(output){
			let str = output.replace(/[\n\r]/g, '').replace(/ +/g, '');
			let regexp = /\d+x\d+x\d/g;
			let match, matches = [];
			while ((match = regexp.exec(str)) != null) {
				matches.push(match[0].slice(0, -2));
			}
			response.send(matches);
			ps.dispose();
		})
		.catch(function(err){
			ps.dispose();
		});
}

function startExpress() {
	let express = require('express');
	let server = express();
	let port = 3000;

	server.get('/', function (request, response) {
		//response.setHeader('Content-Type', 'application/json');
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
			getAllResolutions(response);
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
			//account
			if (request.query.addAccount != undefined || request.query.editAccount != undefined) {
				if (request.query.addAccount != undefined) {
					accountDatastore.insert({name:post['account-name'], password:post['account-password']}, function(err, newDoc) {   // Callback is optional
						response.send(newDoc);
					});
				} else if (request.query.editAccount != undefined) {//edit effettiva
					accountDatastore.update({_id:request.query.editAccount}, {name:post['account-name'], password:post['account-password']}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments, upsert) {
						response.send(affectedDocuments);//NOTA CHE RITORNA UN DOC CON SOLO I CMAPI MODIFICATI
					});
				}
			}
			//char
			if (request.query.addCharacter != undefined || request.query.editCharacter != undefined) {
				if (request.query.addCharacter != undefined) {
					let characterWindowed = post['character-windowed'] === undefined ? false : true; 
					characterDatastore.insert({name:post['character-name'], lastlogin:'-', account:post['character-account'], server:post['character-server'], class:post['character-class'], resolution:post['character-resolution'], windowed:characterWindowed}, function(err, newDoc) {
						response.send(newDoc);
					});
				} else if (request.query.editCharacter != undefined) {//TODO
					characterDatastore.update({_id:request.query.editCharacter},{name:post['character-name']/*TODO*/}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments, upsert) {
						response.send(affectedDocuments);
					});
				}
			}
			//setting
			console.log(request.query.editSetting);
			console.log(post['setting-value-file'])
			if (request.query.editSetting != undefined) {
				settingDatastore.findOne({_id:request.query.editSetting}, function(err, doc) {
					//response.send(doc);
					settingDatastore.update({_id:request.query.editSetting}, {key:doc.key, type:doc.type, value:post['setting-value-file']}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments, upsert) {
						//console.log("array?=" + affectedDocuments[0])
						//console.log("numAffected=" + numAffected)
						//for(var property in affectedDocuments) {
						//	console.log(property + "=" + affectedDocuments[property]);
						//}
						//affectedDocuments['_id'] = doc._id;
						response.send(affectedDocuments);

						
					});
				});
			}
		});
	});

	server.listen(port, function () {
		console.log('Express running in electron and listening on port ' + port + '!');
	});
}

const electron = require('electron');
electron.app.on('ready', function() {
	const path = require('path');
	const url = require('url');
	const BrowserWindow = electron.BrowserWindow;
	let mainWindow = new BrowserWindow({width: 1280, height: 720 /*backgroundColor: '#2e2c29'*/});
	//mainWindow.loadURL('https://github.com');
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'html', 'views', 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	//dev mode automatica
	//mainWindow.webContents.openDevTools();	
});
