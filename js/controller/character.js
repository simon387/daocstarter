'use strict';

const {dialog} = require('electron');
const db = require('../db-module.js');
const util = require('./common-util.js');
const serverController = require('./server.js');
const constants = require('../constants.js');
const path = require('path');
const fs = require('fs');
const log = require('../log-module.js').getLog();

module.exports = {
	getAllCharacters: response => {
		db.characterDatastore.find({}, (err, docs) => {
			let ret = '{"aaData":[';
			docs.forEach(character => {
				ret += '["' + character._id + '","' +
				util.playButton('Character', character._id) + ' ' +
				util.qtdButton('Character', character._id) + '","' +
				character.name + '","' +
				character.lastlogin + '","' +
				character.account + '","' +
				character.server + '","' +
				character.classe + '","' +
				character.resolution + '","' +
				character.windowed + '","' +
				util.editButton('Character', character._id) + ' ' +
				util.deleteButton('Character', character._id) + '"],';
			});
			response.send(util.correggiRispostaPerDataTable(ret));
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

		dialog.showSaveDialog({message: 'save as template'}, (filename) => {
			log.info(filename)
			if (undefined != filename && '' != filename) {
				db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
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
				});
			}
		});
	},

	applyIniDefaultTemplate: (name, server) => {
		if (name === '' || server === '') {
			return;
		}

		dialog.showOpenDialog({message: 'load template', properties: ['openFile', 'noResolveAliases']}, filePaths => {

			if (undefined != filePaths && '' != filePaths[0]) {

				db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
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
				});
			}


		});
	}
}