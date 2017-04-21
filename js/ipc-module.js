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

ipcMain.on('saveSettingNumber', (event, id, value) => {
	db.settingDatastore.update(
		{_id: id},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveSettingNumber-reply');
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
