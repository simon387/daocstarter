'use strict';

const fs = require('fs');
const {ipcMain, dialog} = require('electron');
const db = require('./db-module.js');
const accountController = require('./controller/account.js');
const spellcraftController = require('./controller/spellcraft.js');
const settingController = require('./controller/setting.js');
const characterController = require('./controller/character.js');
const teamController = require('./controller/team.js')
const gamedll = require('./gamedll-module.js');
const constants = require('./constants.js');

ipcMain.on(constants.getCharacterPerPage, async event => {
	let setting = await settingController.readSettingByKey(constants.accountItemsPerPage);
	event.sender.send(constants.getCharacterPerPageReply, setting.value);
});

ipcMain.on(constants.getAccountPerPage, async event => {
	let setting = await settingController.readSettingByKey(constants.accountItemsPerPage);
	event.sender.send(constants.getAccountPerPageReply, setting.value);
});

ipcMain.on(constants.getTeamPerPage, async event => {
	let setting = await settingController.readSettingByKey(constants.teamItemsPerPage);
	event.sender.send(constants.getTeamPerPageReply, setting.value);
});

ipcMain.on(constants.getSettingPerPage, async event => {
	let setting = await settingController.readSettingByKey(constants.characterItemsPerPage);
	event.sender.send(constants.getSettingPerPageReply, setting.value);
});

ipcMain.on(constants.setItemsPerPage, async (event, key, value) => {
	settingController.updateSettingByKey(key, value);
});

ipcMain.on(constants.getAllFavouriteCharacters, async event => {
	let characters = await characterController.getAllFavouriteCharacters();
	event.sender.send(constants.getAllFavouriteCharactersReply, characters);
});

ipcMain.on(constants.saveFavouriteCoordinate, (event, id, left, top) => {
	characterController.saveFavouriteCoordinate(id, left, top);
});

ipcMain.on(constants.killCharacter, (event, id) => {
	gamedll.killCharacter(id);
});

ipcMain.on(constants.playAccount, (event, id, server) => {
	gamedll.playAccount(id, server);
});

ipcMain.on(constants.killAccount, (event, id) => {
	gamedll.killAccount(id);
});

ipcMain.on(constants.editSettingNumber, async (event, id) => {
	let setting = await settingController.findOneById(id);
	event.sender.send(constants.editSettingNumberReply, setting, id);
});

ipcMain.on(constants.editSettingStringa, async (event, id) => {
	let setting = await settingController.findOneById(id);
	event.sender.send(constants.editSettingStringaReply, setting, id);
});

ipcMain.on(constants.saveSettingNumber, async (event, id, value) => {
	await settingController.updateSettingById(id, value);
	event.sender.send(constants.saveSettingNumberReply);
});

ipcMain.on(constants.saveSettingStringa, async (event, id, value) => {
	await settingController.updateSettingById(id, value);
	event.sender.send(constants.saveSettingStringaReply);
});

ipcMain.on(constants.saveTeam, async (event, id, name, team) => {
	await teamController.update(id, name, team);
	event.sender.send(constants.saveTeamReply);
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

ipcMain.on('get-all-chars', event => {
	db.characterDatastore.find({}, (err, docs) => {
		event.sender.send('get-all-chars-reply', docs);
	});
});

ipcMain.on('remove-team', (event, id) => {
	db.teamDatastore.remove({_id: id}, {multi: false}, (err, numRemoved) => {
		event.sender.send('remove-team-reply');
	});
});

ipcMain.on('playCharacter', (event, charArrayID) => {
	let accountSet = new Set();
	let accountArray;
	db.settingDatastore.findOne({key: 'default.login.delay.milli'}, (err, setting) => {
		db.characterDatastore.find({_id: {$in: charArrayID}}, async (err, characters) => {
			for (let character of characters) {
				accountSet.add(character.account);
			}
			accountArray = Array.from(accountSet);
			if (accountArray.length == charArrayID.length) {
				for (let id of charArrayID) {
					gamedll.playCharacter(id);
					await sleep(setting.value);
				}
			}
			else {
				dialog.showErrorBox('Error', "You can't play characters from same account!");
			}
		});
	});
});

ipcMain.on('playTeamRow', (event, id) => {
	let accountSet = new Set();
	let accountArray;
	let charArrayName = [];
	db.teamDatastore.findOne({_id: id}, (err, team) => {
		for (let i = 0; i <= 7; i++) {
			if (team['char' + i] != undefined && team['char' + i] != ' ') {
				charArrayName.push(team['char' + i]);
			}
		}

		db.characterDatastore.find({name: {$in: charArrayName}}, async (err, characters) => {
			for (let character of characters) {
				accountSet.add(character.account);
			}
			accountArray = Array.from(accountSet);

			if (accountArray.length == charArrayName.length) {
				for (let i = 0; i <= 7; i++) {
					if (team['char' + i] != undefined && team['char' + i] != ' ') {
						gamedll.playCharacterFromTeam(
							team['char' + i],
							team['res' + i],
							team['windowed' + i],
							team['borderless' + i],
							team['width' + i],
							team['positionx' + i],
							team['positiony' + i]);
						await sleep(team['deelay' + i]);
					}
				}
			}
			else {
				dialog.showErrorBox('Error', "You can't play characters from same account!");
			}
		});
	});
});

ipcMain.on('killTeamRow', (event, id) => {
	gamedll.killTeam(id);
});

ipcMain.on('editTeam', (event, id) => {
	db.teamDatastore.findOne({_id: id}, (err, team) => {
		event.sender.send('editTeam-reply', team, id);
	});
});

let waiting = -1;
ipcMain.on('importFromAppData', event => {
	db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
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
			dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");
		}
	});
});

const finish = (event, chars) => {
	waiting--;
	if (waiting == 0) {
		db.accountDatastore.find({}).sort({name: 1}).exec((err, accounts) => {
			event.sender.send('importFromAppData-reply', chars, accounts);
		});
	}
}

ipcMain.on('edit-setting-booleano', (event, id) => {
	settingController.editSettingBooleano(event, id);
});

ipcMain.on('save-setting-booleano', (event, id, value) => {
	settingController.saveSettingBooleano(event, id, value);
});

ipcMain.on('set-ini-default-template', (event, name, server) => {
	characterController.setIniDefaultTemplate(name, server);
});

ipcMain.on('apply-ini-default-template', (event, name, server) => {
	characterController.applyIniDefaultTemplate(name, server);
});

//TODO
ipcMain.on('spellcraft-tool-start', event => {
	spellcraftController.OpenForm(event);
});
