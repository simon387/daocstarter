'use strict';

const fs = require('fs');
const {ipcMain, dialog} = require('electron');
const accountController = require('./controller/account.js');
const spellcraftController = require('./controller/spellcraft.js');
const settingController = require('./controller/setting.js');
const characterController = require('./controller/character.js');
const teamController = require('./controller/team.js')
const gamedll = require('./gamedll-module.js');
const constants = require('./constants.js');

ipcMain.on(constants.getCharacterPerPage, async event => {
	let setting = await settingController.findOneByKey(constants.accountItemsPerPage);
	event.sender.send(constants.getCharacterPerPageReply, setting.value);
});

ipcMain.on(constants.getAccountPerPage, async event => {
	let setting = await settingController.findOneByKey(constants.accountItemsPerPage);
	event.sender.send(constants.getAccountPerPageReply, setting.value);
});

ipcMain.on(constants.getTeamPerPage, async event => {
	let setting = await settingController.findOneByKey(constants.teamItemsPerPage);
	event.sender.send(constants.getTeamPerPageReply, setting.value);
});

ipcMain.on(constants.getSettingPerPage, async event => {
	let setting = await settingController.findOneByKey(constants.characterItemsPerPage);
	event.sender.send(constants.getSettingPerPageReply, setting.value);
});

ipcMain.on(constants.setItemsPerPage, async (event, key, value) => {
	settingController.updateSettingByKey(key, value);
});

ipcMain.on(constants.getAllFavouriteCharacters, async event => {
	let characters = await characterController.getAllFavouriteCharacters();
	event.sender.send(constants.getAllFavouriteCharactersReply, characters);
});

ipcMain.on(constants.saveFavouriteCoordinate, (event, id, left, top) => {
	characterController.saveFavouriteCoordinate(id, left, top);
});

ipcMain.on(constants.killCharacter, (event, id) => {
	gamedll.killCharacter(id);
});

ipcMain.on(constants.playAccount, (event, id, server) => {
	gamedll.playAccount(id, server);
});

ipcMain.on(constants.killAccount, (event, id) => {
	gamedll.killAccount(id);
});

ipcMain.on(constants.editSettingNumber, async (event, id) => {
	let setting = await settingController.findOneById(id);
	event.sender.send(constants.editSettingNumberReply, setting, id);
});

ipcMain.on(constants.editSettingStringa, async (event, id) => {
	let setting = await settingController.findOneById(id);
	event.sender.send(constants.editSettingStringaReply, setting, id);
});

ipcMain.on(constants.saveSettingNumber, async (event, id, value) => {
	await settingController.updateSettingById(id, value);
	event.sender.send(constants.saveSettingNumberReply);
});

ipcMain.on(constants.saveSettingStringa, async (event, id, value) => {
	await settingController.updateSettingById(id, value);
	event.sender.send(constants.saveSettingStringaReply);
});

ipcMain.on(constants.saveTeam, async (event, id, name, team) => {
	await teamController.update(id, name, team);
	event.sender.send(constants.saveTeamReply);
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

ipcMain.on(constants.getAllChars, async event => {
	let characters = await characterController.getAllCharacters();
	event.sender.send(constants.getAllCharsReply, characters);
});

ipcMain.on(constants.removeTeam, async (event, id) => {
	await teamController.remove(id);
	event.sender.send(constants.removeTeamReply);
});

ipcMain.on(constants.playCharacter, async (event, characterArrayID) => {
	let accountSet = new Set();
	let accountArray;
	let setting = await settingController.findOneByKey(constants.defaultLoginDelayMilli);
	let characters = await characterController.getByIdArray(characterArrayID);
	for (let character of characters) {
		accountSet.add(character.account);
	}
	accountArray = Array.from(accountSet);
	if (accountArray.length == characterArrayID.length) {
		for (let id of characterArrayID) {
			gamedll.playCharacter(id);
			await sleep(setting.value);
		}
	}
	else {
		dialog.showErrorBox(constants.error, constants.errorSameAccount);
	}
});

ipcMain.on(constants.playTeamRow, async (event, id) => {
	let accountSet = new Set();
	let accountArray;
	let charArrayName = [];
	let team = await teamController.findOne(id);
	for (let i = 0; i <= 7; i++) {
		if (team['char' + i] != undefined && team['char' + i] != ' ') {
			charArrayName.push(team['char' + i]);
		}
	}
	let characters = await characterController.characterArrayName(charArrayName);
	for (let character of characters) {
		accountSet.add(character.account);
	}
	accountArray = Array.from(accountSet);
	if (accountArray.length == charArrayName.length) {
		for (let i = 0; i <= 7; i++) {
			if (team['char' + i] != undefined && team['char' + i] != ' ') {
				gamedll.playCharacterFromTeam(
					team['char' + i],
					team['res' + i],
					team['windowed' + i],
					team['borderless' + i],
					team['width' + i],
					team['positionx' + i],
					team['positiony' + i]);
				await sleep(team['deelay' + i]);
			}
		}
	}
	else {
		dialog.showErrorBox(constants.error, constants.errorSameAccount);
	}
});

ipcMain.on(constants.killTeamRow, (event, id) => {
	gamedll.killTeam(id);
});

ipcMain.on(constants.editTeam, async (event, id) => {
	let team = await teamController.findOne(id);
	event.sender.send(constants.editTeamReply, team, id);
});

let waiting = -1;
ipcMain.on(constants.importFromAppData, async event => {
	let userdat = await settingController.findOneByKey(constants.pathToUserDat);
	let chars = [];
	if (fs.existsSync(userdat['value'])) {
		const path = userdat['value'].replace(/user\.dat$/gi, '');
		const re = new RegExp('^[A-Z]([a-z])+-(41|49|50|51|52|53|54|55|56|57){1}\.ini$');
		fs.readdir(path, (err, files) => {
			waiting = files.length;
			files.forEach(i => {
				let file = path + '/' + i;
				fs.lstat(file, (err, stats) => {
					if (stats.isFile() && re.test(i)) {
						let char = {};
						let array = i.split('-');
						let name = array[0];
						array = array[1].split('.');
						switch(array[0]) {
							case '41': char.server = 'Ywain1'; break;
							case '49': char.server = 'Ywain2'; break;
							case '50': char.server = 'Ywain3'; break;
							case '51': char.server = 'Ywain4'; break;
							case '52': char.server = 'Ywain5'; break;
							case '53': char.server = 'Ywain6'; break;
							case '54': char.server = 'Ywain7'; break;
							case '55': char.server = 'Ywain8'; break;
							case '56': char.server = 'Ywain9'; break;
							case '57': char.server = 'Ywain10'; break;
						}
						char.name = name;
						chars.push(char);
						finish(event, chars);
					}
					else {
						waiting--;
					}
				});
			})
		});
	}
	else {
		dialog.showErrorBox(constants.error, constants.errorUserDatNF);
	}
});

const finish = async (event, chars) => {
	waiting--;
	if (waiting == 0) {
		let accounts = await characterController.findAll();
		event.sender.send(constants.importFromAppDataReply, chars, accounts);
	}
}

ipcMain.on(constants.editSettingBooleano, (event, id) => {
	settingController.editSettingBooleano(event, id);
});

ipcMain.on(constants.saveSettingBooleano, (event, id, value) => {
	settingController.saveSettingBooleano(event, id, value);
});

ipcMain.on(constants.setIniDefaultTemplate, (event, name, server) => {
	characterController.setIniDefaultTemplate(name, server);
});

ipcMain.on(constants.applyIniDefaultTemplate, (event, name, server) => {
	characterController.applyIniDefaultTemplate(name, server);
});

//TODO
ipcMain.on(constants.spellcraftToolStart, event => {
	spellcraftController.OpenForm(event);
});
