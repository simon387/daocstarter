'use strict';
/*
 * perchè NODE impazzisce con require intrecciati
 */
const db = require('../db-module.js');

const findOneByKey = key => {
	return new Promise(function(resolve, reject) {
		db.settingDatastore.findOne({key: key}, (err, value) => {
			resolve(value);
		});
	});
}

module.exports = {findOneByKey};
