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
	let macroNumber = await getNextAvailableMacroNumber(fullIniName);

	let currentSlot = 10;
	let itemNamesIndex = 0;
	for (let i = 3; i < objArray.length; i++) {
		let gemmes = objArray[i].value.split('\r\n');
		
		let macroCode = await writeMacro(fullIniName, itemNames[itemNamesIndex++], macroNumber++);
		await scriviItemInBarra(fullIniName, quickbar, currentSlot++, macroCode);
		for (let c = 0; c < 4; c++) {
			if (c < gemmes.length - 1) {
				let gemmaCode = await getGemmaCode(realm, gemmes[c].toLowerCase());
				await scriviItemInBarra(fullIniName, quickbar, currentSlot++, gemmaCode);
			}
			else {
				currentSlot++;//non fare niente, white space in barra
			}
		}
	}
	event.sender.send(constants.spellcraftFormSubmitEventReply);
}

const getGemmaCode = (realm, gemma) => {
	return new Promise((resolve, reject) => {
		return resolve(scdb[realm][gemma]);
	});
}

const scriviItemInBarra = (fullIniName, quickbar, currentSlot, code) => {
	return new Promise((resolve, reject) => {
		log.info("fullIniName=", fullIniName, "quickbar=", quickbar, "currentSlot=", currentSlot, "code=", code);
		let fileIni = ini.parse(fs.readFileSync(fullIniName, constants.utf8));
		//log.info('fileIni=', fileIni)
		try {
			fileIni[quickbar]['Hotkey_' + currentSlot] = code;
			fs.writeFileSync(fullIniName, ini.stringify(fileIni, {}));
		}
		catch(e) {
			log.error(e);
		}
		finally {
			resolve();
		}
	});
}

const getNextAvailableMacroNumber = (fullIniName) => {
	return new Promise((resolve, reject) => {
		let counter = 1;
		let macro = undefined;

		try {
			let fileIni = ini.parse(fs.readFileSync(fullIniName, constants.utf8));
			while (true) {
				macro = fileIni['Macros']['Macro_' + counter];
				if (undefined == macro) {
					break;
				}
				counter++;
			}
		}
		catch(e) {
			log.error(e);
		}
		finally {
			return resolve(counter);
		}
	});
}

const writeMacro = (fullIniName, itemName, macroNumber) => {
	return new Promise((resolve, reject) => {
		if (!!itemName) {

		}
		else {
			itemName = 'item #' + macroNumber;
		}

		try {
			let fileIni = ini.parse(fs.readFileSync(fullIniName, constants.utf8));
			fileIni['Macros']['Macro_' + macroNumber] = itemName + ',/s crafting ' + itemName;
			fs.writeFileSync(fullIniName, ini.stringify(fileIni, {}));
		}
		catch(e) {
			log.error(e);
		}
		finally {
			return resolve('52,' + macroNumber + ',Macro #' + macroNumber + ',354');
		}
	});
}

module.exports = {handleSubmitSC};
/*
	Hotkey_5=52,1,Macro #1,354
	Hotkey_6=52,7,Macro #7,354
	Hotkey_7=52,4,Macro #4,354
	Hotkey_8=52,3,Macro #3,354
	Hotkey_9=52,6,Macro #6,354
	[Macros]
	Macro_1=EF,/effects none
	Macro_2=AS,/autosplit c
	Macro_3=SA,/statsanon
	Macro_4=AN,/anon
	Macro_5=assist,/assist %T
	Macro_6=TP,/use 5 79
	Macro_7=EFA,/effects all
*/