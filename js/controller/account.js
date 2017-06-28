'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllAccounts: response => {
		db.accountDatastore.find({}, (err, accounts) => {
			let payload = new Object();
			payload.aaData = [];
			accounts.forEach(account => {
				let row = [];
				row.push(account._id);
				row.push(util.playButton('Account', account._id) + ' ' +
					util.qtdButton('Account', account._id) + ' ' +
					selectYwain(account));
				row.push(account.name);
				row.push(account.password.replace(/./g, '*'));
				row.push(account.server);
				row.push(account.resolution);
				row.push(account.windowed);
				row.push(util.editButton('Account', account._id));
				row.push(util.deleteButton('Account', account._id));
				payload.aaData.push(row);
			});
			response.send(payload);
		});
	},
	
	getAllAccountsNames: response => {
		db.accountDatastore.find({}, (err, docs) => {
			return util.getAllNamesHelper(response, docs);
		});
	},
}

const selectYwain = (account) => {
	let select = "<select class='select-account-server' id='" + account._id + "' onchange=\\\"playAccountRow('" + account._id + "', 'usaSelezionato')\\\">";
	for (let i = 1; i < 11; i++) {
		select += "<option value='Ywain" + i + "' " + (account.server === 'Ywain' + i ? 'selected' : "") + ">" + "Ywain" + i + "</option>";
	}
	select += "</select>";
	return select;
}
