'use strict';

const fs = require('fs');
const {ipcMain, dialog} = require('electron');
const accountController = require('./controller/account');
const spellcraftController = require('./controller/spellcraft');
const settingController = require('./controller/setting');
const characterController = require('./controller/character');
const teamController = require('./controller/team');
const classeController = require('./controller/classe');
const settingCommonController = require('./controller/setting-common');
const gamedll = require('./gamedll-module');
const constants = require('./constants');

const fixOrder = order => {
	let defaultReturn = [0, 'asc'];
	if (undefined == order || null == order) {
		return defaultReturn;
	} else {
		if (undefined == order.value) {
			return defaultReturn;
		} else {
			return order.value;
		}
	}
}

ipcMain.on(constants.getCharacterPerPage, async event => {
	let setting = await settingCommonController.findOneByKey(constants.characterItemsPerPage);
	let order = await settingCommonController.findOneByKey(constants.characterItemsOrder);
	event.sender.send(constants.getCharacterPerPageReply, setting.value, fixOrder(order));
});

ipcMain.on(constants.setCharactersOrder, (event, order) => {
	settingController.updateSettingByKey(constants.characterItemsOrder, order, true);
});

ipcMain.on(constants.getAccountPerPage, async event => {
	let setting = await settingCommonController.findOneByKey(constants.accountItemsPerPage);
	let order = await settingCommonController.findOneByKey(constants.accountItemsOrder);
	event.sender.send(constants.getAccountPerPageReply, setting.value, fixOrder(order));
});

ipcMain.on(constants.setAccountsOrder, (event, order) => {
	settingController.updateSettingByKey(constants.accountItemsOrder, order, true);
});

ipcMain.on(constants.getTeamPerPage, async event => {
	let setting = await settingCommonController.findOneByKey(constants.teamItemsPerPage);
	let order = await settingCommonController.findOneByKey(constants.teamItemsOrder);
	event.sender.send(constants.getTeamPerPageReply, setting.value, fixOrder(order));
});

ipcMain.on(constants.setTeamsOrder, (event, order) => {
	settingController.updateSettingByKey(constants.teamItemsOrder, order, true);
});

ipcMain.on(constants.getSettingPerPage, async event => {
	let setting = await settingCommonController.findOneByKey(constants.settingItemsPerPage);
	let order = await settingCommonController.findOneByKey(constants.settingItemsOrder);
	event.sender.send(constants.getSettingPerPageReply, setting.value, fixOrder(order));
});

ipcMain.on(constants.setSettingsOrder, (event, order) => {
	settingController.updateSettingByKey(constants.settingItemsOrder, order, true);
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
	let setting = await settingCommonController.findOneByKey(constants.defaultLoginDelayMilli);
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
	let team = await teamController.findOneById(id);
	for (let i = 0; i <= 7; i++) {
		if (team['char' + i] != undefined && team['char' + i] != ' ') {
			charArrayName.push(team['char' + i]);
		}
	}
	let characters = await characterController.getByNameArray(charArrayName);
	for (let character of characters) {
		accountSet.add(character.account);
	}
	accountArray = Array.from(accountSet);
	if (accountArray.length == charArrayName.length) {
		//TODO leva sto for e fai un'unica chiamata
		for (let i = 0; i <= 7; i++) {
			if (team['char' + i] != undefined && team['char' + i] != ' ') {
				await gamedll.playCharacterFromTeam(
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
	let team = await teamController.findOneById(id);
	event.sender.send(constants.editTeamReply, team, id);
});

ipcMain.on(constants.importFromAppData,  event => {
	characterController.importFromAppDataStart(event);
});

ipcMain.on(constants.editSettingBooleano, (event, id) => {
	settingController.editSettingBooleano(event, id);
});

ipcMain.on(constants.saveSettingBooleano, async (event, id, value) => {
	await settingController.saveSettingBooleano(event, id, value);
});

ipcMain.on(constants.setIniDefaultTemplate, (event, name, server) => {
	characterController.setIniDefaultTemplate(name, server);
});

ipcMain.on(constants.applyIniDefaultTemplate, (event, name, server) => {
	characterController.applyIniDefaultTemplate(name, server);
});

ipcMain.on(constants.getSpellcrafters, async event => {
	let charsArray = [];
	let characters = await characterController.findAllSpellcrafter();
	for (let c = 0; c < characters.length; c++) {
		let classe = await classeController.findOneByName(characters[c].classe);

		switch (classe.realm) {
			case constants.albion: classe.realm = 0; break;
			case constants.hibernia: classe.realm = 1; break;
			case constants.midgard: classe.realm = 2; break;
		}

		charsArray.push({name: characters[c].name, realm: classe.realm})
	}
	event.sender.send(constants.getSpellcraftersReply, charsArray);
});

ipcMain.on(constants.spellcraftFormSubmitEvent, (event, objArray, itemNames) => {
	spellcraftController.handleSubmitSC(event, objArray, itemNames);
});
