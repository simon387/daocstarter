'use strict'

const {ipcMain} = require('electron');
const constants = require('../constants.js');

const log = require('../log-module.js').getLog();

module.exports = {
	handleSubmitSC: (event, objArray) => {
		log.info('handleSubmitSC called');
		//TODO
		log.info("objArray:", objArray);



		
		event.sender.send(constants.spellcraftFormSubmitEventReply);
	}
}
