'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllClassesNames: response => {
		db.classDatastore.find({}).sort({name: 1}).exec((err, docs) => {
			return util.getAllNamesHelper(response, docs);
		});
	}
}
