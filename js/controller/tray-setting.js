'use strict';
/*
 * DRY perchè NODE impazzisce con require intrecciati
 */
const db = require('../db-module.js');

module.exports = {
	findOneByKey: key => {
		return new Promise(function(resolve, reject) {
			db.settingDatastore.findOne({key: key}, (err, value) => {
				resolve(value);
			});
		});
	}
}
