'use strict';

const {ipcMain} = require('electron');
const db = require('./db-module.js');
const accountController = require('./controller/account.js');
const gamedll = require('./gamedll-module.js');
const {dialog} = require('electron');

ipcMain.on('asynchronous-get-character-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-character-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-get-account-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-account-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-get-team-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-team-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-get-setting-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-setting-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-set-items-per-page', (event, key, value) => {
	db.settingDatastore.update(
		{key: key},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
	});
});

ipcMain.on('getAllFavouriteCharacters', event => {
	db.characterDatastore.find({favourite: true}, (err, docs) => {
		event.sender.send('getAllFavouriteCharacters-reply', docs);
	});
});

ipcMain.on('saveFavouriteCoordinate', (event, id, left, top) => {
	db.characterDatastore.update(
		{_id: id},
		{$set: {x: left, y: top}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
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


ipcMain.on('killCharacter', (event, id) => {
	gamedll.killCharacter(id);
});

ipcMain.on('playAccount', (event, id) => {
	gamedll.playAccount(id);
});

ipcMain.on('killAccount', (event, id) => {
	gamedll.killAccount(id);
});

ipcMain.on('editSettingNumber', (event, id) => {
	db.settingDatastore.findOne({_id: id}, (err, setting) => {
		event.sender.send('editSettingNumber-reply', setting, id);
	});
});

ipcMain.on('editSettingStringa', (event, id) => {
	db.settingDatastore.findOne({_id: id}, (err, setting) => {
		event.sender.send('editSettingStringa-reply', setting, id);
	});
});

ipcMain.on('saveSettingNumber', (event, id, value) => {
	db.settingDatastore.update(
		{_id: id},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveSettingNumber-reply');
	});
});

ipcMain.on('saveSettingStringa', (event, id, value) => {
	db.settingDatastore.update(
		{_id: id},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveSettingStringa-reply');
	});
});

ipcMain.on('saveTeam', (event, id, value) => {

	const borderless0 = value[5] === undefined ? false : value[5];
	const windowed0 = value[3] === undefined ? false : value[3];

//	console.log(windowed0, borderless0)
	db.teamDatastore.update(
		{_id: id},
		{$set: {
			name: value[0],
			char0: value[1],
			res0: value[2],
			windowed0: windowed0,
			deelay0: value[4],
			borderless0: borderless0,
			width0: value[6],
			height0: value[7],
			positionx0: value[8],
			positiony0: value[9]
//+7
		}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveTeam-reply');
	});
});

//event.sender.send('asynchronous-reply-get-account-per-page', doc.value);
/*
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}*/

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

//ipcMain.on('playTeamRow', (event, id) => {
	//TODO
//});

//ipcMain.on('killTeamRow', (event, id) => {
	//TODO
//});

ipcMain.on('editTeam', (event, id) => {
	db.teamDatastore.findOne({_id: id}, (err, team) => {
		event.sender.send('editTeam-reply', team, id);
	});
});