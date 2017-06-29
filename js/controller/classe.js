'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllClassesNames: () => {
		return new Promise(function(resolve, reject) {
			db.classDatastore.find({}).sort({n: 1}).exec((err, classes) => {
				resolve(util.getAllNamesHelper(classes));
			});
		});
	}
}
