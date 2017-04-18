'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');

module.exports = {
	getAllClassesNames: response => {
		db.classDatastore.find({}).sort({name: 1}).exec((err, docs) => {
			return util.getAllNamesHelper(response, docs);
		});
	}
}
