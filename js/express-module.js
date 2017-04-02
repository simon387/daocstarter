"use strict";

const db = require("./db-module.js");

module.exports = {
	start: function () {
		const express = require('express');
		const server = express();

		require('portfinder').getPort(function (err, port) {
			const {ipcMain} = require('electron')
			ipcMain.on('asynchronous-get-port', (event, arg) => {
				event.sender.send('asynchronous-reply-get-port', port)
			});

			server.get('/', function (request, response) {
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
					require("./vga-module.js").getAllResolutions(response);
				}
				//account
				if (request.query.ajaxAccount != undefined || request.query.removeAccount != undefined || request.query.editAccount != undefined) {
					if (request.query.removeAccount != undefined) {
						db.accountDatastore.remove({_id:request.query.removeAccount}, {multi:false}, function(err, numRemoved) {});
					}
					if (request.query.editAccount != undefined) {//per aprire la modal di edit, ritorniamo l'elemento da modificare
						db.accountDatastore.findOne({_id:request.query.editAccount}, function (err, doc) {
							response.send(doc);
						});
					} else {//view normale
						db.getAllAccounts(response);
					}
				}
				//character
				if (request.query.ajaxCharacter != undefined || request.query.removeCharacter != undefined || request.query.editCharacter != undefined) {
					if (request.query.removeCharacter != undefined) {
						db.characterDatastore.remove({_id:request.query.removeCharacter}, {multi:false}, function(err, numRemoved) {});
					}
					if (request.query.editCharacter != undefined) {
						db.characterDatastore.findOne({_id:request.query.editCharacter}, function(err, doc) {
							response.send(doc);
						});
					} else {
						db.getAllCharacters(response);
					}
				}
				if (request.query.playCharacter != undefined) {
					require("./gamedll-module.js").playCharacter(request.query.playCharacter, response);
				}
				if (request.query.killCharacter != undefined) {
					require("./gamedll-module.js").killCharacter(request.query.killCharacter, response);
				}
				if (request.query.getAllFavouriteCharacters != undefined) {
					db.characterDatastore.find({favourite:true} , function (err, docs) {
						response.send(docs);
					});
				}
				if (request.query.saveFavouriteCoordinate != undefined) {
					db.characterDatastore.update({_id:request.query.saveFavouriteCoordinate},
					{$set:{x:request.query.left, y:request.query.top}}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
						response.send();
					});
				}
				//setting
				if (request.query.ajaxSetting != undefined) {
					db.getAllSettings(response);
				}
				if (request.query.editSetting != undefined) {
					db.settingDatastore.findOne({_id:request.query.editSetting}, function(err, doc) {
						response.send(doc);
					});
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
							db.accountDatastore.insert({name:post['account-name'], password:post['account-password']}, function(err, newDoc) {// Callback is optional
								response.send(newDoc);
							});
						} else if (request.query.editAccount != undefined) {
							db.accountDatastore.update({_id:request.query.editAccount}, {$set:{name:post['account-name'], password:post['account-password']}}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
								response.send(affectedDocuments);
							});
						}
					}
					//char
					if (request.query.addCharacter != undefined || request.query.editCharacter != undefined) {
						const characterWindowed = post['character-windowed'] === undefined ? false : true; 
						const characterFavourite = post['character-favourite'] === undefined ? false : true;
						if (request.query.addCharacter != undefined) {
							db.characterDatastore.insert(
								{
									name:post['character-name'],
									lastlogin:'-',
									account:post['character-account'],
									server:post['character-server'],
									class:post['character-class'],
									resolution:post['character-resolution'],
									windowed:characterWindowed,
									favourite:characterFavourite,
									title:post['character-title']
								}, function(err, newDoc) {
								response.send(newDoc);
							});
						} else if (request.query.editCharacter != undefined) {
							db.characterDatastore.update({_id:request.query.editCharacter},{
								$set:{
									name:post['character-name'],
									account:post['character-account'],
									server:post['character-server'],
									class:post['character-class'],
									resolution:post['character-resolution'],
									windowed:characterWindowed,
									favourite:characterFavourite,
									title:post['character-title']
								}
							}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
								response.send(affectedDocuments);
							});
						}
					}
					//setting per ora con i file
					if (request.query.editSetting != undefined) {
						db.settingDatastore.update({_id:request.query.editSetting}, {$set:{value:post['setting-value-file']}}, {returnUpdatedDocs:true, multi:false}, function(err, numAffected, affectedDocuments) {
							response.send(affectedDocuments);
						});
					}
				});
			});

			server.listen(port, function () {
				console.log('Express running in electron and listening on port ' + port + '!');
			});
		});
	}
}
