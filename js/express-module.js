'use strict';

const {ipcMain} = require('electron');
const portfinder = require('portfinder');
const express = require('express');
const querystring = require('querystring');
const vga_module = require('./vga-module.js');
const gamedll = require('./gamedll-module.js');
const db = require('./db-module.js');
const accountController = require('./controller/account.js');
const serverController = require('./controller/server.js');
const classeController = require('./controller/classe.js');
const characterController = require('./controller/character.js');
const settingController = require('./controller/setting.js');
const teamController = require('./controller/team.js');
const log = require('./log-module.js').getLog();
const constants = require('./constants.js');

const server = express();
portfinder.getPort((err, port) => {
	ipcMain.on(constants.asynchronousGetPort, (event, arg) => {
		event.sender.send(constants.asynchronousGetPortReply, port);
	});

	server.get('/', async (request, response) => {
		//account
		if (request.query.ajaxAccount != undefined || request.query.removeAccount != undefined || request.query.editAccount != undefined) {
			if (request.query.removeAccount != undefined) {
				accountController.remove(request.query.removeAccount);
			}
			if (request.query.editAccount != undefined) {
				response.send(await accountController.findOneById(request.query.editAccount));
			} else {
				response.send(await accountController.getAllAccountsForDT());
			}
		}
		if (request.query.getAllAccountsNames != undefined) {
			response.send(await accountController.getAllAccountsNames());
		}
		//character
		if (request.query.ajaxCharacter != undefined || request.query.removeCharacter != undefined || request.query.editCharacter != undefined) {
			if (request.query.removeCharacter != undefined) {
				characterController.remove(request.query.removeCharacter);
			}
			if (request.query.editCharacter != undefined) {
				response.send(await characterController.findOneById(request.query.editCharacter));
			} else {
				response.send(await characterController.getAllCharactersForDT());
			}
		}
		if (request.query.getAllCharacterNames != undefined) {
			response.send(await characterController.getAllCharacterNames());
		}
		//setting
		if (request.query.ajaxSetting != undefined) {
			response.send(await settingController.getAllSettings());
		}
		if (request.query.editSetting != undefined) {
			response.send(await settingController.findOneById(request.query.editSetting));
			
		}
		//team
		if (request.query.ajaxTeam != undefined) {
			response.send(await teamController.getAllTeams());
		}
		//server
		if (request.query.getAllServersNames != undefined) {
			response.send(await serverController.getAllServersNames());
		}
		//classes
		if (request.query.getAllClassesNames != undefined) {
			response.send(await classeController.getAllClassesNames());
		}
		//vga
		if (request.query.getAllResolutions != undefined) {
			response.send(await vga_module.getAllResolutions());
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
		request.on('end', async function () {
			const post = querystring.parse(body);
			//account
			if (request.query.addAccount != undefined || request.query.editAccount != undefined) {
				if (request.query.addAccount != undefined) {
					response.send(await accountController.create(post));
				} else if (request.query.editAccount != undefined) {
					response.send(await accountController.update(request.query.editAccount, post));
				}
			}
			//char
			if (request.query.addCharacter != undefined || request.query.editCharacter != undefined) {
				if (request.query.addCharacter != undefined) {
					response.send(await characterController.create(post));
				} else if (request.query.editCharacter != undefined) {
					response.send(await characterController.update(request.query.editCharacter, post));
				}
			}
			if (request.query.importFromAppData != undefined) {
				let charNameArray = post.charName;
				let charServerArray = post.charServer;
				let charAccountArray = post.charAccount;
				for (let c = 0; c < charNameArray.length; c++) {
					db.characterDatastore.insert({
						name: charNameArray[c],
						lastlogin: '-',
						account: charAccountArray[c],
						server: charServerArray[c],
					}, (err, newDoc) => {
						
					});
					
					if (c == charNameArray.length - 1) {
						response.send({});
					}
				}
			}
			//team
			if (request.query.addTeam != undefined || request.query.editTeam != undefined) {
				if (request.query.addTeam != undefined) {// TO CHANGE; THIS IS SO BAD
					db.teamDatastore.insert({
						name: post['team-name'],
						char0: post['team-character0'] === undefined ? ' ' : post['team-character0'],
						res0: post['team-resolution0'],
						windowed0: post['team-windowed0'] === undefined ? false : true,
						deelay0: post['team-deelay0'],
						borderless0: post['team-borderless0'] === undefined ? false : true,
						width0: post['team-width0'],
						height0: post['team-height0'],
						positionx0: post['team-position-x0'],
						positiony0: post['team-position-y0'],
						
						char1: post['team-character1'] === undefined ? ' ' : post['team-character1'],
						res1: post['team-resolution1'],
						windowed1: post['team-windowed1'] === undefined ? false : true,
						deelay1: post['team-deelay1'],
						borderless1: post['team-borderless1'] === undefined ? false : true,
						width1: post['team-width1'],
						height1: post['team-height1'],
						positionx1: post['team-position-x1'],
						positiony1: post['team-position-y1'],

						char2: post['team-character2'] === undefined ? ' ' : post['team-character2'],
						res2: post['team-resolution2'],
						windowed2: post['team-windowed2'] === undefined ? false : true,
						deelay2: post['team-deelay2'],
						borderless2: post['team-borderless2'] === undefined ? false : true,
						width2: post['team-width2'],
						height2: post['team-height2'],
						positionx2: post['team-position-x2'],
						positiony2: post['team-position-y2'],

						char3: post['team-character3'] === undefined ? ' ' : post['team-character3'],
						res3: post['team-resolution3'],
						windowed3: post['team-windowed3'] === undefined ? false : true,
						deelay3: post['team-deelay3'],
						borderless3: post['team-borderless3'] === undefined ? false : true,
						width3: post['team-width3'],
						height3: post['team-height3'],
						positionx3: post['team-position-x3'],
						positiony3: post['team-position-y3'],

						char4: post['team-character4'] === undefined ? ' ' : post['team-character4'],
						res4: post['team-resolution4'],
						windowed4: post['team-windowed4'] === undefined ? false : true,
						deelay4: post['team-deelay4'],
						borderless4: post['team-borderless4'] === undefined ? false : true,
						width4: post['team-width4'],
						height4: post['team-height4'],
						positionx4: post['team-position-x4'],
						positiony4: post['team-position-y4'],

						char5: post['team-character5'] === undefined ? ' ' : post['team-character5'],
						res5: post['team-resolution5'],
						windowed5: post['team-windowed5'] === undefined ? false : true,
						deelay5: post['team-deelay5'],
						borderless5: post['team-borderless5'] === undefined ? false : true,
						width5: post['team-width5'],
						height5: post['team-height5'],
						positionx5: post['team-position-x5'],
						positiony5: post['team-position-y5'],

						char6: post['team-character6'] === undefined ? ' ' : post['team-character6'],
						res6: post['team-resolution6'],
						windowed6: post['team-windowed6'] === undefined ? false : true,
						deelay6: post['team-deelay6'],
						borderless6: post['team-borderless6'] === undefined ? false : true,
						width6: post['team-width6'],
						height6: post['team-height6'],
						positionx6: post['team-position-x6'],
						positiony6: post['team-position-y6'],

						char7: post['team-character7'] === undefined ? ' ' : post['team-character7'],
						res7: post['team-resolution7'],
						windowed7: post['team-windowed7'] === undefined ? false : true,
						deelay7: post['team-deelay7'],
						borderless7: post['team-borderless7'] === undefined ? false : true,
						width7: post['team-width7'],
						height7: post['team-height7'],
						positionx7: post['team-position-x7'],
						positiony7: post['team-position-y7']
					}, (err, newDoc) => {
						response.send(newDoc);
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
		log.info('Express running in electron and listening on port ' + port + '!');
	});
});