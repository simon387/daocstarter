'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {dialog, ipcMain} = require('electron');
const serverController = require('./server.js');
const util = require('./common-util.js');
const db = require('../db-module.js');
const constants = require('../constants.js');
const log = require('../log-module.js').getLog();
const settingCommonController = require('./setting-common.js');
const accountController = require('./account.js');
let waiting = -1;

const findAllForDT = () => {
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
}

const findAllCharacterNames = () => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.find({}, (err, characters) => {
			resolve(util.getAllNamesHelper(characters));
		});
	});
}

const remove = id => {
	db.characterDatastore.remove({_id: id}, {multi: false}, (err, numRemoved) => {
		log.info('removing character ' + id);
	});
}

const findOneById = id => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.findOne({_id: id}, (err, character) => {
			resolve(character);
		});
	});
}

const findOneByName = name => {
	return new Promise((resolve, reject) => {
		db.characterDatastore.findOne({name: name}, (err, character) => {
			resolve(character);
		});
	});
}

const create = obj => {
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
}

const update = (id, obj) => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.update({_id: id},{$set:{
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
			positionY: obj['character-position-y']}
		},
		{returnUpdatedDocs: true, multi: false}, (err, numAffected, updatedCharacter) => {
			resolve(updatedCharacter);
		});
	});
}

const importFromAppData = obj => {
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
				if (err) {
					log.error(err);
				}
			});
			if (c == charNameArray.length - 1) {
				resolve({});
			}
		}
	});
}

const setIniDefaultTemplate = (name, server) => {
	if (name === '' || server === '') {
		return;
	}
	dialog.showSaveDialog({message: 'save as template'}, async (filename) => {
		log.info(filename)
		if (undefined != filename && '' != filename) {
			const userdat = await settingCommonController.findOneByKey(constants.pathToUserDat);
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
}

const applyIniDefaultTemplate = (name, server) => {
	if (name === '' || server === '') {
		return;
	}
	dialog.showOpenDialog({message: 'load template', properties: ['openFile', 'noResolveAliases']}, async filePaths => {
		if (undefined != filePaths && '' != filePaths[0]) {
			const userdat = await settingCommonController.findOneByKey(constants.pathToUserDat);
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

const resetAllFavouritesPositions = () => {
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
}

const getAllFavouriteCharacters = () => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.find({favourite: true}, (err, characters) => {
			resolve(characters);
		});
	});
}

const findAllSpellcrafter = () => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.find({spellcrafter: true}, (err, characters) => {
			resolve(characters);
		});
	});
}

const saveFavouriteCoordinate = (id, left, top) => {
	db.characterDatastore.update(
		{_id: id},
		{$set: {x: left, y: top}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			if (err) {
				log.error(err);
			}
	});
}

const getAllCharacters = () => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.find({}, (err, characters) => {
			resolve(characters);
			if (err) {
				log.error(err);
			}
		});
	});
}

const getByIdArray = characterArrayID => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.find({_id: {$in: characterArrayID}}, (err, characters) => {
			resolve(characters);
		});
	});
}

const getByNameArray = characterArrayName => {
	return new Promise(function(resolve, reject) {
		db.characterDatastore.find({name: {$in: characterArrayName}}, (err, characters) => {
			resolve(characters);
		});
	});
}

const importFromAppDataStart = async event => {
	let userdat = await settingCommonController.findOneByKey(constants.pathToUserDat);
	let chars = [];
	if (fs.existsSync(userdat['value'])) {
		const path = userdat['value'].replace(/user\.dat$/gi, '');
		const re = new RegExp('^[A-Z]([a-z])+-(41|49|50|51|52|53|54|55|56|57){1}\.ini$');
		fs.readdir(path, (err, files) => {
			waiting = files.length;
			files.forEach(i => {
				let file = path + '/' + i;
				fs.lstat(file, (err, stats) => {
					if (stats.isFile() && re.test(i)) {
						let char = {};
						let array = i.split('-');
						let name = array[0];
						array = array[1].split('.');
						switch(array[0]) {
							case '41': char.server = 'Ywain1'; break;
							case '49': char.server = 'Ywain2'; break;
							case '50': char.server = 'Ywain3'; break;
							case '51': char.server = 'Ywain4'; break;
							case '52': char.server = 'Ywain5'; break;
							case '53': char.server = 'Ywain6'; break;
							case '54': char.server = 'Ywain7'; break;
							case '55': char.server = 'Ywain8'; break;
							case '56': char.server = 'Ywain9'; break;
							case '57': char.server = 'Ywain10'; break;
						}
						char.name = name;
						chars.push(char);
						finish(event, chars);
					}
					else {
						waiting--;
					}
				});
			})
		});
	}
	else {
		dialog.showErrorBox(constants.error, constants.errorUserDatNF);
	}
}

const updateLastLogin = id => {
	return new Promise(function(resolve, reject) {
		const now = moment(Date.now()).format(constants.timestampFormat);
		db.characterDatastore.update({_id: id}, {$set: {lastlogin: now}},
		(err, numAffected, affectedDocuments) => {
			resolve();
		});
	});
}

const getFullIniName = (userdat, character, server) => {
	return new Promise((resolve, reject) => {
		resolve(
			path.join(path.dirname(userdat.value),
			character.name.charAt(0).toUpperCase() +
			character.name.slice(1) + constants.minus + server.n + constants.ini)
			/*path.dirname(userdat.value) + constants.doubleSlash +
			character.name.charAt(0).toUpperCase() +
			character.name.slice(1) + constants.minus + server.n + constants.ini*/
		);
	})
}


const finish = async (event, chars) => {
	waiting--;
	if (waiting == 0) {
		let accounts = await accountController.findAll();
		event.sender.send(constants.importFromAppDataReply, chars, accounts);
	}
}

module.exports = {
	findAllForDT,
	findAllCharacterNames,
	remove,
	findOneById,
	findOneByName,
	create,
	update,
	importFromAppData,
	setIniDefaultTemplate,
	applyIniDefaultTemplate,
	resetAllFavouritesPositions,
	getAllFavouriteCharacters,
	findAllSpellcrafter,
	saveFavouriteCoordinate,
	getAllCharacters,
	getByIdArray,
	getByNameArray,
	importFromAppDataStart,
	updateLastLogin,
	getFullIniName
};
