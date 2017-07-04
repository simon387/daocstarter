'use strict'

const {ipcMain} = require('electron');
const constants = require('../constants.js');

const log = require('../log-module.js').getLog();

module.exports = {
	openForm: event => {
		//sender.send('open-spellcraft-form-reply', chars, accounts);


		//siamo pronti
		event.sender.send(constants.spellcraftToolStartReply);
	}
}
