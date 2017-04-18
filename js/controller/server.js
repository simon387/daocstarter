'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');

module.exports = {
	getAllServersNames: response => {
		db.serverDatastore.find({}).sort({n: 1}).exec((err, docs) => {
			return util.getAllNamesHelper(response, docs);
		});
	}
}
