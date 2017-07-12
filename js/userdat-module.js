'use strict';

const fs = require('fs');
const path = require('path');
const ini = require('ini');
const {dialog} = require('electron');
const constants = require('./constants.js');
const log = require('./log-module.js').getLog();

const setIniOnPlayCharacter = (userdat, character) => {
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
	});
}

const setIniOnPlayAccount = (userdat, account) => {
	return new Promise(function(resolve, reject) {
		let config = ini.parse(fs.readFileSync(userdat.value, constants.utf8));
		let xy;
		try {
			xy = account.resolution.split('x');
			config.main.screen_width = xy[0];
			config.main.screen_height = xy[1];
		}
		catch (e) {
			log.error(e);
			dialog.showErrorBox(constants.error, e.toString());
		}
		config.main.windowed = account.windowed ? 1 : 0;
		fs.writeFileSync(path.dirname(userdat.value) + '\\user.dat', ini.stringify(config, {}));
		resolve();
	});
}

const setIniOnPlayTeam = (userdat, res, windowed) => {
	return new Promise(function(resolve, reject) {
		let config = ini.parse(fs.readFileSync(userdat.value, constants.utf8));
		let xy;
		try {
			xy = res.split('x');
			config.main.screen_width = xy[0];
			config.main.screen_height = xy[1];
		}
		catch (e) {
			log.error(e);
			dialog.showErrorBox(constants.error, e.toString());
		}
		config.main.windowed = windowed ? 1 : 0;
		fs.writeFileSync(path.dirname(userdat.value) + "\\user.dat", ini.stringify(config, {}));
		resolve();
	});
}

module.exports = {setIniOnPlayCharacter, setIniOnPlayAccount, setIniOnPlayTeam};
