'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');
const log = require('../log-module.js').getLog();


const findAllForDT =  () => {
	return new Promise(function(resolve, reject) {
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
				row.push(util.editButton('Account', account._id) + ' ' +
					util.deleteButton('Account', account._id));
				payload.aaData.push(row);
			});
			resolve(payload);
		});
	});
}
	
const findAll = () => {
	return new Promise(function(resolve, reject) {
		db.accountDatastore.find({}).sort({name: 1}).exec((err, accounts) => {
			resolve(accounts);
		});
	});
}

const findAllAccountsNames = () => {
	return new Promise(function(resolve, reject) {
		db.accountDatastore.find({}, (err, accounts) => {
			resolve(util.getAllNamesHelper(accounts));
		});
	});
}

const remove = id => {
	db.accountDatastore.remove({_id: id}, {multi: false}, (err, numRemoved) => {
		log.info('removing account ' + id);
	});
}

const findOneById = id => {
	return new Promise(function(resolve, reject) {
		db.accountDatastore.findOne({_id: id}, (err, account) => {
			resolve(account);
		});
	});
}

const findOneByName = name => {
	return new Promise(function(resolve, reject) {
		db.accountDatastore.findOne({name: name}, (err, account) => {
			resolve(account);
		});
	});
}

const create = obj => {
	return new Promise(function(resolve, reject) {
		db.accountDatastore.insert({
			name: obj['account-name'],
			password: obj['account-password'],
			server: obj['account-server'],
			resolution: obj['account-resolution'],
			windowed: obj['account-windowed'] === undefined ? false : true,
			title: obj['account-title']
		}, (err, newAccount) => {
			resolve(newAccount);
		});
	});
}

const update = (id, obj) => {
	return new Promise(function(resolve, reject) {
		db.accountDatastore.update({_id: id}, {$set:{
			name: obj['account-name'],
			password: obj['account-password'],
			server: obj['account-server'],
			resolution: obj['account-resolution'],
			windowed: obj['account-windowed'] === undefined ? false : true,
			title: obj['account-title']}
		}, {returnUpdatedDocs: true, multi: false}, (err, numAffected, updatedAccount) => {
			resolve(updatedAccount);
		});
	});
}


const selectYwain = (account) => {
	let select = "<select class='select-account-server' id='" + account._id + "' onchange=\\\"playAccountRow('" + account._id + "', 'usaSelezionato')\\\">";
	for (let i = 1; i < 11; i++) {
		select += "<option value='Ywain" + i + "' " + (account.server === 'Ywain' + i ? 'selected' : "") + ">" + "Ywain" + i + "</option>";
	}
	select += "</select>";
	return select;
}

module.exports = {
	findAllForDT,
	findAll,
	findAllAccountsNames,
	remove, 
	findOneById,
	findOneByName,
	create,
	update
};
