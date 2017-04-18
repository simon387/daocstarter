'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');

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
	}
}