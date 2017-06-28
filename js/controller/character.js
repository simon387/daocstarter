'use strict';

const fs = require('fs');
const path = require('path');
const {dialog} = require('electron');
const serverController = require('./server.js');
const util = require('./common-util.js');
const db = require('../db-module.js');
const constants = require('../constants.js');
const log = require('../log-module.js').getLog();
const setting = require('./setting.js');

module.exports = {
	getAllCharacters: response => {
		db.characterDatastore.find({}, (err, characters) => {
			let payload = new Object();
			payload.aaData = [];
			characters.forEach(character => {
				let row = [];
				row.push(character._id);
				row.push(util.playButton('Character', character._id) + ' ' +
					util.qtdButton('Character', character._id));
				row.push(character.name);
				row.push(character.lastlogin);
				row.push(character.account);
				row.push(character.server);
				row.push(character.classe);
				row.push(character.resolution);
				row.push(character.windowed);
				row.push(util.editButton('Character', character._id) + ' ' +
					util.deleteButton('Character', character._id));
				payload.aaData.push(row);
			});
			response.send(payload);
		});
	},

	getAllCharacterNames: response => {
		db.characterDatastore.find({}, (err, docs) => {
			return util.getAllNamesHelper(response, docs);
		});
	},

	setIniDefaultTemplate: (name, server) => {
		if (name === '' || server === '') {
			return;
		}
		dialog.showSaveDialog({message: 'save as template'}, async (filename) => {
			log.info(filename)
			if (undefined != filename && '' != filename) {
				const userdat = await setting.readSettingByKey(constants.userdatPath);
				const fileInput = path.dirname(userdat.value) + '\\' +
					name.charAt(0).toUpperCase() + name.slice(1) +
					'-' + serverController.toNumber(server) + '.ini';
				try {
					fs.createReadStream(fileInput).pipe(fs.createWriteStream(filename));
					log.info('wrote ' + fileInput + ' in ' + filename);
				}
				catch(err) {
					log.error(err);
				}
			}
		});
	},

	applyIniDefaultTemplate: (name, server) => {
		if (name === '' || server === '') {
			return;
		}
		dialog.showOpenDialog({message: 'load template', properties: ['openFile', 'noResolveAliases']}, async filePaths => {
			if (undefined != filePaths && '' != filePaths[0]) {
				const userdat = await setting.readSettingByKey(constants.userdatPath);
				const fileOutput = path.dirname(userdat.value) + '\\' +
					name.charAt(0).toUpperCase() + name.slice(1) +
					'-' + serverController.toNumber(server) + '.ini';
				try {
					fs.createReadStream(filePaths[0]).pipe(fs.createWriteStream(fileOutput));
					log.info('wrote ' + filePaths[0] + ' in ' + fileOutput);
				}
				catch(err) {
					log.error(err);
				}
			}
		});
	}
}