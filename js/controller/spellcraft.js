'use strict'

const fs = require('fs');
const ini = require('ini');

const {ipcMain, dialog} = require('electron');
const constants = require('../constants.js');
const characterController = require('./character.js');
const settingCommonController = require('./setting-common.js');
const serverController = require('./server.js');

const log = require('../log-module.js').getLog();

module.exports = {
	handleSubmitSC: async (event, objArray) => {
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
		const qbar = objArray[2].value;

		const character = await characterController.findOneByName(characterName);
		const server = await serverController.findOneByName(character.server);
		//log.info('character=', character);
		const fullIniName = await characterController.getFullIniName(userdat, character, server);

		log.info('fullIniName=', fullIniName);

		event.sender.send(constants.spellcraftFormSubmitEventReply);
	}
}
/*
setIniOnPlayCharacter: (userdat, character) => {
	return new Promise(function(resolve, reject) {
		let config = ini.parse(fs.readFileSync(userdat.value, constants.utf8));
		let xy;
		try {
			xy = character.resolution.split('x');
			config.main.screen_width = xy[0];
			config.main.screen_height = xy[1];
		}
		catch (e) {
			log.error(e);
			dialog.showErrorBox(constants.error, e.toString());
		}
		config.main.windowed = character.windowed ? 1 : 0;
		config.main.fullscreen_windowed = character.fullscreen_windowed ? 1 : 0;
		config.keyboard.forward_breaks_runlock = character.forward_breaks_runlock ? 1 : 0;
		fs.writeFileSync(path.dirname(userdat.value) + "\\user.dat", ini.stringify(config, {}));
		resolve();
	})
	*/