'use strict';

const {ipcMain, BrowserWindow} = require('electron');
const db = require('../db-module');
const constants = require('../constants');

const getAllNamesHelper = (docs, noSort = false) => {
	let array = [];
	docs.forEach(doc => {
		array.push(doc.name);
	});
	if (noSort) {
		return array;
	}
	return array.sort();
}

const playButton = (entity, id) => {
	return '<a href=javascript:play' + entity + "Row(\'" + id +
	"\'); " + constants.playCSS + '>play<\/a>';
}

const qtdButton = (entity, id) => {
	return '<a href=javascript:kill' + entity + "Row(\'" + id +
	"\'); " + constants.cancCSS + '>qtd<\/a>';
}

const editButton = (entity, id, type = '') => {
	const idContainer = type === '' ? "(\'" + id + "\'); " : '(' + id + '); ';
	return "<a data-id='row-" + id + "' href=javascript:edit" + entity +
	'Row' + type + idContainer + constants.editCSS + '>edit<\/a>';
}

const deleteButton = (entity, id) => {
	return '<a href=javascript:remove' + entity + "Row(\'" + id +
	"\'); " + constants.cancCSS + '>X<\/a>';
}

const moveFavourites = (size) => {
	db.characterDatastore.update({$and: [{favourite: true}, {x: {$gt: size[0] - 150}} ]}, {$set: {x: size[0] - 150}},
	{returnUpdatedDocs: true, multi: true},
	(err, numAffected, affectedDocuments) => {
		if (numAffected > 0) {
			refreshFavourites();
		}
		db.characterDatastore.update({$and: [{favourite: true}, {y: {$gt: size[1] - 150}} ]}, {$set: {y: size[1] - 150}},
		{returnUpdatedDocs: true, multi: true},
		(err, numAffected, affectedDocuments) => {
			if (numAffected > 0) {
				refreshFavourites();
			}
		});
	});
}

const refreshFavourites = () => {
	const win = BrowserWindow.getFocusedWindow();
	db.characterDatastore.find({favourite: true},
	{returnUpdatedDocs: true, multi: true},
	(err, doc) => {
		win.webContents.send(constants.getAllFavouriteCharactersReply, doc);
	});
}

module.exports = {
	getAllNamesHelper,
	playButton,
	qtdButton,
	editButton,
	deleteButton,
	moveFavourites
}
