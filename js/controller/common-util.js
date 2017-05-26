'use strict';

const BrowserWindow = require('electron').BrowserWindow;
const {ipcMain} = require('electron');
const db = require('../db-module.js');

const playCSS = "class='btnX btn-primary btn-sm sr-button'";
const cancCSS = "class='sr-button btnX btn-primary btn-md btnX-delete'";
const editCSS = "class='sr-button btnX btn-md btn-successX'";

module.exports = {
	correggiRispostaPerDataTable: ret => {
		ret = ret.slice(0, -1) + ']}';
		if (ret === '{"aaData":]}') {
			ret = '{"aaData":[]}';
		}
		return ret;
	},

	getAllNamesHelper: (response, docs) => {
		let array = [];
		docs.forEach(doc => {
			array.push(doc.name);
		});
		return response.send(array.sort());
	},

	playButton: (entity, id) => {
		return '<a href=javascript:play' + entity + "Row(\'" + id +
		"\'); " + playCSS + '>play<\/a>';
	},

	qtdButton: (entity, id) => {
		return '<a href=javascript:kill' + entity + "Row(\'" + id +
		"\'); " + cancCSS + '>qtd<\/a>';
	},

	editButton: (entity, id, type = '') => {
		const idContainer = type === '' ? "(\'" + id + "\'); " : '(' + id + '); ';
		return "<a data-id='row-" + id + "' href=javascript:edit" + entity +
		'Row' + type + idContainer + editCSS + '>edit<\/a>';
	},

	deleteButton: (entity, id) => {
		return '<a href=javascript:remove' + entity + "Row(\'" + id +
		"\'); " + cancCSS + '>X<\/a>';
	},

	moveFavourites: (size) => {
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
}

const refreshFavourites = () => {
	const win = BrowserWindow.getFocusedWindow();
	db.characterDatastore.find({favourite: true},
	{returnUpdatedDocs: true, multi: true},
	(err, doc) => {
		win.webContents.send('getAllFavouriteCharacters-reply', doc);
	});
}
