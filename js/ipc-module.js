'use strict';

const {ipcMain} = require('electron');
const db = require('./db-module.js');
const accountController = require('./controller/account.js');
const gamedll = require('./gamedll-module.js');

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
	db.characterDatastore.find({favourite: true} , (err, docs) => {
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

ipcMain.on('playCharacter', (event, id) => {
	gamedll.playCharacter(id);
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
