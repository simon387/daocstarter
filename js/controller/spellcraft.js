'use strict'

const {ipcMain} = require('electron');
const constants = require('../constants.js');

const log = require('../log-module.js').getLog();

module.exports = {
	handleSubmitSC: (event, qbar) => {
		log.info('handleSubmitSC called');
		//TODO
		log.info("qbar:", qbar);
		event.sender.send(constants.spellcraftFormSubmitEventReply);
	}
}
