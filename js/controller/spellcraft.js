'use strict'

const fs = require('fs');
const ini = require('ini');
const {ipcMain, dialog} = require('electron');
const constants = require('../constants.js');
const characterController = require('./character.js');
const settingCommonController = require('./setting-common.js');
const serverController = require('./server.js');
const log = require('../log-module.js').getLog();

let scdb;

const handleSubmitSC = async (event, objArray, itemNames) => {
	log.info("handleSubmitSC: objArray:", objArray, "itemNames:", itemNames);
	scdb = require('../json/spellcraft.json');
	const userdat = await settingCommonController.findOneByKey(constants.pathToUserDat);
	if (!fs.existsSync(userdat.value)) {
		return dialog.showErrorBox(constants.error, constants.errorUserDatNF);
	}
	/*
		objArray: [ { name: 'spellcraft-character-dropdown', value: '2' },
		{ name: 'spellcraft-character-name', value: 'Doublekek' },
		{ name: 'spellcraft-qbar-dropdown', value: '2' },
		{ name: 'pezzoGems1',
		value: 'Raw blood essence jewel\r\nRaw dusty shielding jewel\r\nRaw mystic essence jewel\r\n' } ]
	*/
	const realm = objArray[0].value == '0' ? 'albion' : objArray[0].value == '1' ? 'hibernia' : 'midgard';
	const characterName = objArray[1].value;
	const quickbar = objArray[2].value == '1' ? 'Quickbar' : objArray[2].value == '2' ? 'Quickbar2' : 'Quickbar3';

	const character = await characterController.findOneByName(characterName);
	const server = await serverController.findOneByName(character.server);
	const fullIniName = await characterController.getFullIniName(userdat, character, server);

	let currentSlot = 10;
	for (let i = 3; i < objArray.length; i++) {
		let gemmes = objArray[i].value.split('\r\n');
		//TODO fare lo slot /say
		currentSlot++;
		console.log("metti label")
		//for (let c = 0; c < gemmes.length - 1; c++) {
		for (let c = 0; c < 4; c++) {
			if (c < gemmes.length - 1) {
				console.log("metti gemma")
				let gemmaCode = await getGemmaCode(realm, gemmes[c].toLowerCase());
				await scriviGemmaInBarra(fullIniName, quickbar, currentSlot++, gemmaCode);
			}
			else {
				console.log("non fare niente")
				//non fare niente
				currentSlot++;
			}
		}
		//currentSlot++;
	}
	event.sender.send(constants.spellcraftFormSubmitEventReply);
}

const getGemmaCode = (realm, gemma) => {
	return new Promise((resolve, reject) => {
		resolve(scdb[realm][gemma]);
	});
}

const scriviGemmaInBarra = (fullIniName, quickbar, currentSlot, gemmaCode) => {
	return new Promise((resolve, reject) => {
		log.info("fullIniName=", fullIniName, "quickbar=", quickbar, "currentSlot=", currentSlot, "gemmaCode=", gemmaCode);
		let fileIni = ini.parse(fs.readFileSync(fullIniName, constants.utf8));
		//log.info('fileIni=', fileIni)
		try {
			fileIni[quickbar]['Hotkey_' + currentSlot] = gemmaCode;
		}
		catch(e) {
			log.error(e);
		}
		fs.writeFileSync(fullIniName, ini.stringify(fileIni, {}));
		resolve();
	});
}

module.exports = {handleSubmitSC};
