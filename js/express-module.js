"use strict";

const db = require("./db-module.js");
const gamedll = require("./gamedll-module.js");
const {ipcMain} = require('electron');
const portfinder = require('portfinder');
const express = require('express');
const vga_module = require("./vga-module.js");
const querystring = require('querystring');

module.exports = {
	start: () => {
		const server = express();
		portfinder.getPort( (err, port) => {
			ipcMain.on('asynchronous-get-port', (event, arg) => {
				event.sender.send('asynchronous-reply-get-port', port)
			});
			//
			server.get('/', (request, response) => {
				if (request.query.getAllAccountsNames != undefined) {
					db.getAllAccountsNames(response);
				}
				if (request.query.getAllServersNames != undefined) {
					db.getAllServersNames(response);
				}
				if (request.query.getAllClassesNames != undefined) {
					db.getAllClassesNames(response);
				}
				if (request.query.getAllResolutions != undefined) {
					vga_module.getAllResolutions(response);
				}
				//account
				if (request.query.ajaxAccount != undefined || request.query.removeAccount != undefined || request.query.editAccount != undefined) {
					if (request.query.removeAccount != undefined) {
						db.accountDatastore.remove({_id:request.query.removeAccount}, {multi:false}, (err, numRemoved) => {});
					}
					if (request.query.editAccount != undefined) {//per aprire la modal di edit, ritorniamo l'elemento da modificare
						db.accountDatastore.findOne({_id:request.query.editAccount}, (err, doc) => {
							response.send(doc);
						});
					} else {//view normale
						db.getAllAccounts(response);
					}
				}
				if (request.query.playAccount != undefined) {
					gamedll.playAccount(request.query.playAccount, response);
				}
				//character
				if (request.query.ajaxCharacter != undefined || request.query.removeCharacter != undefined || request.query.editCharacter != undefined) {
					if (request.query.removeCharacter != undefined) {
						db.characterDatastore.remove({_id:request.query.removeCharacter}, {multi:false}, (err, numRemoved) => {});
					}
					if (request.query.editCharacter != undefined) {
						db.characterDatastore.findOne({_id:request.query.editCharacter}, (err, doc) => {
							response.send(doc);
						});
					} else {
						db.getAllCharacters(response);
					}
				}
				if (request.query.playCharacter != undefined) {
					gamedll.playCharacter(request.query.playCharacter, response);
				}
				if (request.query.killCharacter != undefined) {
					gamedll.killCharacter(request.query.killCharacter, response);
				}
				if (request.query.getAllFavouriteCharacters != undefined) {
					db.characterDatastore.find({favourite:true} , (err, docs) => {
						response.send(docs);
					});
				}
				if (request.query.saveFavouriteCoordinate != undefined) {
					db.characterDatastore.update({_id:request.query.saveFavouriteCoordinate},
					{$set:{x:request.query.left, y:request.query.top}}, {returnUpdatedDocs:true, multi:false}, (err, numAffected, affectedDocuments) => {
						response.send();
					});
				}
				//setting
				if (request.query.ajaxSetting != undefined) {
					db.getAllSettings(response);
				}
				if (request.query.editSetting != undefined) {
					db.settingDatastore.findOne({_id:request.query.editSetting}, (err, doc) => {
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
								}, {returnUpdatedDocs:true, multi:false}, (err, numAffected, affectedDocuments) => {
								response.send(affectedDocuments);
							});
						}
					}
					//char
					if (request.query.addCharacter != undefined || request.query.editCharacter != undefined) {
						const characterWindowed = post['character-windowed'] === undefined ? false : true;
						const characterFavourite = post['character-favourite'] === undefined ? false : true;
						if (request.query.addCharacter != undefined) {
							db.characterDatastore.insert({
									name:post['character-name'],
									lastlogin:'-',
									account:post['character-account'],
									server:post['character-server'],
									classe:post['character-class'],
									resolution:post['character-resolution'],
									windowed:characterWindowed,
									favourite:characterFavourite,
									title:post['character-title']
								}, (err, newDoc) => {
								response.send(newDoc);
							});
						} else if (request.query.editCharacter != undefined) {
							db.characterDatastore.update({_id:request.query.editCharacter},{
								$set:{
									name:post['character-name'],
									account:post['character-account'],
									server:post['character-server'],
									classe:post['character-class'],
									resolution:post['character-resolution'],
									windowed:characterWindowed,
									favourite:characterFavourite,
									title:post['character-title']
								}
							}, {returnUpdatedDocs:true, multi:false}, (err, numAffected, affectedDocuments) => {
								response.send(affectedDocuments);
							});
						}
					}
					//setting per ora con i file
					if (request.query.editSetting != undefined) {
						db.settingDatastore.update({_id:request.query.editSetting}, {$set:{value:post['setting-value-file']}}, {returnUpdatedDocs:true, multi:false}, (err, numAffected, affectedDocuments) => {
							response.send(affectedDocuments);
						});
					}
				});
			});

			server.listen(port, () => {
				console.log('Express running in electron and listening on port ' + port + '!');
			});
		});
	}
}
