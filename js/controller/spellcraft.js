'use strict'

const fs = require('fs');
const ini = require('ini');


const {ipcMain, dialog} = require('electron');
const constants = require('../constants.js');
const characterController = require('./character.js');
const settingCommonController = require('./setting-common.js');
const serverController = require('./server.js');
let scdb;

const log = require('../log-module.js').getLog();

const handleSubmitSC = async (event, objArray) => {
	scdb = require('../json/spellcraft.json');
	//log.info('handleSubmitSC called');
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
	log.info("objArray:", objArray);
	const characterName = objArray[1].value;
	const quickbar = objArray[2].value == '1' ? 'Quickbar' : objArray[2].value == '2' ? 'Quickbar2' : 'Quickbar3';
	const realm = objArray[0].value == '0' ? 'albion' : objArray[0].value == '1' ? 'hibernia' : 'midgard';

	const character = await characterController.findOneByName(characterName);
	const server = await serverController.findOneByName(character.server);
	const fullIniName = await characterController.getFullIniName(userdat, character, server);
	//log.info('fullIniName=', fullIniName);

	let currentSlot = 10;
	for (let i = 3; i < objArray.length; i++) {
		//log.info("for esterno", i)
		let string = objArray[i].value;
		let gemme = string.split('\r\n');
		//log.info(array)
		for (let c = 0; c < gemme.length - 1; c++) {
			//log.info("for interno", c)
			//log.info(array[c])
			let gemmaCode = await getGemmaCode(realm, gemme[c].toLowerCase());
			await scriviGemmaInBarra(fullIniName, quickbar, currentSlot++, gemmaCode);
		}
		currentSlot++;
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
		//log.info("objArray:", objArray);
		log.info("fullIniName=",fullIniName, "quickbar=", quickbar, "currentSlot=", currentSlot, "gemmaCode=", gemmaCode);
		let fileIni = ini.parse(fs.readFileSync(fullIniName, constants.utf8));

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
