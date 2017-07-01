'use strict';

const {ipcMain} = require('electron');
const portfinder = require('portfinder');
const express = require('express');
const querystring = require('querystring');
const vga_module = require('./vga-module.js');
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
				response.send(await accountController.findAllForDT());
			}
		}
		if (request.query.getAllAccountsNames != undefined) {
			response.send(await accountController.findAllAccountsNames());
		}
		//character
		if (request.query.ajaxCharacter != undefined || request.query.removeCharacter != undefined || request.query.editCharacter != undefined) {
			if (request.query.removeCharacter != undefined) {
				characterController.remove(request.query.removeCharacter);
			}
			if (request.query.editCharacter != undefined) {
				response.send(await characterController.findOneById(request.query.editCharacter));
			} else {
				response.send(await characterController.findAllForDT());
			}
		}
		if (request.query.getAllCharacterNames != undefined) {
			response.send(await characterController.findAllCharacterNames());
		}
		//setting
		if (request.query.ajaxSetting != undefined) {
			response.send(await settingController.getAllSettingsForDT());
		}
		if (request.query.editSetting != undefined) {
			response.send(await settingController.findOneById(request.query.editSetting));
			
		}
		//team
		if (request.query.ajaxTeam != undefined) {
			response.send(await teamController.getAllTeamsForDT());
		}
		//server
		if (request.query.getAllServersNames != undefined) {
			response.send(await serverController.findAllServersNames());
		}
		//classes
		if (request.query.getAllClassesNames != undefined) {
			response.send(await classeController.findAllClassesNames());
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
				response.send(await characterController.importFromAppData(post));
			}
			//team
			if (request.query.addTeam != undefined) {
				response.send(await teamController.create(post));
			}
			//setting
			if (request.query.editSetting != undefined) {
				response.send(settingController.update(request.query.editSetting, post));
			}
		});
	});

	server.listen(port, () => {
		log.info(constants.infoExpress, port);
	});
});
