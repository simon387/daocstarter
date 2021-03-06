'use strict';

const db = require('../db-module');

const findOneByName = name => {
	return new Promise(function(resolve, reject) {
		db.realmDatastore.findOne({name: name}, (err, realm) => {
			resolve(realm);
		});
	});
}

module.exports = {findOneByName};