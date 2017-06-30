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
	getAllCharactersForDT: () => {
		return new Promise(function(resolve, reject) {
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
				resolve(payload);
			});
		});
	},

	getAllCharacterNames: () => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.find({}, (err, characters) => {
				resolve(util.getAllNamesHelper(characters));
			});
		});
	},

	remove: id => {
		db.characterDatastore.remove({_id: id}, {multi: false}, (err, numRemoved) => {
			log.info('removing character ' + id);
		});
	},

	findOneById: id => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.findOne({_id: id}, (err, character) => {
				resolve(character);
			});
		});
	},

	create: obj => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.insert({
				name: obj['character-name'],
				lastlogin: '-',
				account: obj['character-account'],
				server: obj['character-server'],
				classe: obj['character-class'],
				resolution: obj['character-resolution'],
				windowed: obj['character-windowed'] === undefined ? false : true,
				favourite: obj['character-favourite'] === undefined ? false : true,
				title: obj['character-title'],
				spellcrafter: obj['character-spellcrafter'] === undefined ? false : true,
				fullscreen_windowed: obj['character-fullscreen_windowed'] === undefined ? false : true,
				forward_breaks_runlock: obj['character-forwardbreaksrunlock'] === undefined ? false : true,
				borderless: obj['character-borderless'] === undefined ? false : true,
				width: obj['character-width'],
				height: obj['character-height'],
				positionX: obj['character-position-x'],
				positionY: obj['character-position-y']
			}, (err, newCharacter) => {
				resolve(newCharacter);
			});
		});
	},

	update: (id, obj) => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.update({_id: id},{
				$set:{
					name: obj['character-name'],
					account: obj['character-account'],
					server: obj['character-server'],
					classe: obj['character-class'],
					resolution: obj['character-resolution'],
					windowed: obj['character-windowed'] === undefined ? false : true,
					favourite: obj['character-favourite'] === undefined ? false : true,
					title: obj['character-title'],
					spellcrafter: obj['character-spellcrafter'] === undefined ? false : true,
					fullscreen_windowed: obj['character-fullscreen_windowed'] === undefined ? false : true,
					forward_breaks_runlock: obj['character-forwardbreaksrunlock'] === undefined ? false : true,
					borderless: obj['character-borderless'] === undefined ? false : true,
					width: obj['character-width'],
					height: obj['character-height'],
					positionX: obj['character-position-x'],
					positionY: obj['character-position-y']
				}
			},
			{returnUpdatedDocs: true, multi: false}, (err, numAffected, updatedCharacter) => {
				resolve(updatedCharacter);
			});
		});
	},

	importFromAppData: obj => {
		return new Promise(function(resolve, reject) {
			let charNameArray = obj.charName;
			let charServerArray = obj.charServer;
			let charAccountArray = obj.charAccount;
			for (let c = 0; c < charNameArray.length; c++) {
				db.characterDatastore.insert({
					name: charNameArray[c],
					lastlogin: '-',
					account: charAccountArray[c],
					server: charServerArray[c],
				}, (err, newDoc) => {
					log.error(err);
				});
				if (c == charNameArray.length - 1) {
					resolve({});
				}
			}
		});
	},

	setIniDefaultTemplate: (name, server) => {
		if (name === '' || server === '') {
			return;
		}
		dialog.showSaveDialog({message: 'save as template'}, async (filename) => {
			log.info(filename)
			if (undefined != filename && '' != filename) {
				const userdat = await setting.findOneByKey(constants.pathToUserDat);
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
				const userdat = await setting.findOneByKey(constants.pathToUserDat);
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
	},

	resetAllFavouritesPositions: () => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.update(
				{
					favourite: true
				},
				{
					$set: {x: 40, y: 220}
				},
				{
					returnUpdatedDocs: true, multi: true
				},
			(err, numAffected, affectedDocuments) => {
				resolve(numAffected);
			});
		});
	},

	getAllFavouriteCharacters: () => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.find({favourite: true}, (err, characters) => {
				resolve(characters);
			});
		});
	},

	saveFavouriteCoordinate: () => {
		db.characterDatastore.update(
			{_id: id},
			{$set: {x: left, y: top}},
			{returnUpdatedDocs: true, multi: false},
			(err, numAffected, affectedDocuments) => {
				if (err) {
					log.error(err);
				}
		});
	},

	getAllCharacters: () => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.find({}, (err, characters) => {
				resolve(characters);
				if (err) {
					log.error(err);
				}
			});
		});
	},
	
	getByIdArray: characterArrayID => {
		return new Promise(function(resolve, reject) {
			db.characterDatastore.find({_id: {$in: characterArrayID}}, (err, characters) => {
				resolve(charactes);
			});
		});
	}
	


}