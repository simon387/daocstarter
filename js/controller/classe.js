'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	findAllClassesNames: () => {
		return new Promise(function(resolve, reject) {
			db.classDatastore.find({}).sort({n: 1}).exec((err, classes) => {
				resolve(util.getAllNamesHelper(classes));
			});
		});
	},

	findOneByName: name => {
		return new Promise(function(resolve, reject) {
			db.classDatastore.findOne({name: name}, (err, classe) => {
				resolve(classe);
			});
		});
	},
}
