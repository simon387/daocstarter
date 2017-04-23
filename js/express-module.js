'use strict';

const db = require('./db-module.js');
const gamedll = require('./gamedll-module.js');
const {ipcMain} = require('electron');
const portfinder = require('portfinder');
const express = require('express');
const vga_module = require('./vga-module.js');
const querystring = require('querystring');
const accountController = require('./controller/account.js');
const serverController = require('./controller/server.js');
const classeController = require('./controller/classe.js');
const characterController = require('./controller/character.js');
const settingController = require('./controller/setting.js');

const server = express();
portfinder.getPort((err, port) => {
	ipcMain.on('asynchronous-get-port', (event, arg) => {
		event.sender.send('asynchronous-reply-get-port', port)
	});
	//
	server.get('/', (request, response) => {
		if (request.query.getAllAccountsNames != undefined) {
			accountController.getAllAccountsNames(response);
		}
		if (request.query.getAllServersNames != undefined) {
			serverController.getAllServersNames(response);
		}
		if (request.query.getAllClassesNames != undefined) {
			classeController.getAllClassesNames(response);
		}
		if (request.query.getAllResolutions != undefined) {
			vga_module.getAllResolutions(response);
		}
		//account
		if (request.query.ajaxAccount != undefined || request.query.removeAccount != undefined || request.query.editAccount != undefined) {
			if (request.query.removeAccount != undefined) {
				db.accountDatastore.remove({_id: request.query.removeAccount}, {multi: false}, (err, numRemoved) => {});
			}
			if (request.query.editAccount != undefined) {//per aprire la modal di edit, ritorniamo l'elemento da modificare
				db.accountDatastore.findOne({_id: request.query.editAccount}, (err, doc) => {
					response.send(doc);
				});
			} else {//view normale
				accountController.getAllAccounts(response);
			}
		}
		//character
		if (request.query.ajaxCharacter != undefined || request.query.removeCharacter != undefined || request.query.editCharacter != undefined) {
			if (request.query.removeCharacter != undefined) {
				db.characterDatastore.remove({_id: request.query.removeCharacter}, {multi: false}, (err, numRemoved) => {});
			}
			if (request.query.editCharacter != undefined) {
				db.characterDatastore.findOne({_id: request.query.editCharacter}, (err, doc) => {
					response.send(doc);
				});
			} else {
				characterController.getAllCharacters(response);
			}
		}
		//setting
		if (request.query.ajaxSetting != undefined) {
			settingController.getAllSettings(response);
		}
		if (request.query.editSetting != undefined) {
			db.settingDatastore.findOne({key: request.query.editSetting}, (err, doc) => {
				response.send(doc);
			});
		}
	});

	server.post('/', (request, response) => {
		let body = '';
		request.on('data', (data) => {
			body += data;
			if (body.length > 1e6) {
				request.connection.destroy();
			}
		});
		//
		request.on('end', function () {
			const post = querystring.parse(body);
			//account
			if (request.query.addAccount != undefined || request.query.editAccount != undefined) {
				const accountWindowed = post['account-windowed'] === undefined ? false : true;
				if (request.query.addAccount != undefined) {
					db.accountDatastore.insert({
							name:post['account-name'],
							password:post['account-password'],
							server:post['account-server'],
							resolution:post['account-resolution'],
							windowed:accountWindowed,
							title:post['account-title']
						}, (err, newDoc) => {// Callback is optional
						response.send(newDoc);
					});
				} else if (request.query.editAccount != undefined) {
					db.accountDatastore.update({_id:request.query.editAccount}, {$set:{
							name:post['account-name'],
							password:post['account-password'],
							server:post['account-server'],
							resolution:post['account-resolution'],
							windowed:accountWindowed,
							title:post['account-title']}
						}, {returnUpdatedDocs: true, multi: false}, (err, numAffected, affectedDocuments) => {
						response.send(affectedDocuments);
					});
				}
			}
			//char
			if (request.query.addCharacter != undefined || request.query.editCharacter != undefined) {
				const characterWindowed = post['character-windowed'] === undefined ? false : true;
				const characterFavourite = post['character-favourite'] === undefined ? false : true;
				const fullscreen_windowed = post['character-fullscreen_windowed'] === undefined ? false : true;
				const forward_breaks_runlock = post['character-forwardbreaksrunlock'] === undefined ? false : true;
				if (request.query.addCharacter != undefined) {
					db.characterDatastore.insert({
							name: post['character-name'],
							lastlogin: '-',
							account: post['character-account'],
							server: post['character-server'],
							classe: post['character-class'],
							resolution: post['character-resolution'],
							windowed: characterWindowed,
							favourite: characterFavourite,
							title: post['character-title'],
							fullscreen_windowed: fullscreen_windowed,
							forward_breaks_runlock: forward_breaks_runlock
						}, (err, newDoc) => {
						response.send(newDoc);
					});
				} else if (request.query.editCharacter != undefined) {
					db.characterDatastore.update({_id: request.query.editCharacter},{
						$set:{
							name: post['character-name'],
							account: post['character-account'],
							server: post['character-server'],
							classe: post['character-class'],
							resolution: post['character-resolution'],
							windowed: characterWindowed,
							favourite: characterFavourite,
							title: post['character-title'],
							fullscreen_windowed: fullscreen_windowed,
							forward_breaks_runlock: forward_breaks_runlock
						}
					},
					{returnUpdatedDocs: true, multi: false}, (err, numAffected, affectedDocuments) => {
						response.send(affectedDocuments);
					});
				}
			}
			//setting per ora con i file
			if (request.query.editSetting != undefined) {
				db.settingDatastore.update(
					{key: request.query.editSetting},
					{$set: {value:post['setting-value-file']}},
					{returnUpdatedDocs: true, multi: false}, (err, numAffected, affectedDocuments) => {
					response.send(affectedDocuments);
				});
			}
		});
	});

	server.listen(port, () => {
		console.log('Express running in electron and listening on port ' + port + '!');
	});
});