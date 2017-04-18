'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');

module.exports = {
	getAllAccounts: response => {
		db.accountDatastore.find({}, (err, docs) => {
			let ret = '{"aaData":[';
			docs.forEach(account => {
				ret += '["' + account._id + '","' +
				util.playButton('Account', account._id) + ' ' +
				util.qtdButton('Account', account._id) + '","' +
				account.name + '","' +
				account.password.replace(/./g, '*') + '","' +
				account.server + '","' +
				account.resolution + '","' +
				account.windowed + '","' +
				util.editButton('Account', account._id) + ' ' +
				util.deleteButton('Account', account._id) + '"],';
			});
			response.send(util.correggiRispostaPerDataTable(ret));
		});
	},
	
	getAllAccountsNames: response => {
		db.accountDatastore.find({}, (err, docs) => {
			return util.getAllNamesHelper(response, docs);
		});
	},
}