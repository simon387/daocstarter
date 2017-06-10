'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');
const serverController = require('./server.js');
const constants = require('../constants.js');
const path = require('path');
const fs = require('fs');
const log = require('electron-log');
log.transports.file.level = 'debug';

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
		db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
			const fileInput = path.dirname(userdat.value) + '\\' +
				name.charAt(0).toUpperCase() + name.slice(1) +
				'-' + serverController.toNumber(server) + '.ini';
			
			fs.createReadStream(fileInput)
			.pipe(fs.createWriteStream(constants.backupPath() + '\\default.ini'));
		});
	},

	applyIniDefaultTemplate: (name, server) => {
		if (name === '' || server === '') {
			return;
		}
		db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
			const fileOutput = path.dirname(userdat.value) + '\\' +
				name.charAt(0).toUpperCase() + name.slice(1) +
				'-' + serverController.toNumber(server) + '.ini';
			
			fs.createReadStream(constants.backupPath() + '\\default.ini')
			.pipe(fs.createWriteStream(fileOutput));
		});
	}
}