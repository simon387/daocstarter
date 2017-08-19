'use strict';

const util = require('./common-util');
const db = require('../db-module');

const findAllClassesNames = () => {
	return new Promise(function(resolve, reject) {
		db.classDatastore.find({}).sort({n: 1}).exec((err, classes) => {
			resolve(util.getAllNamesHelper(classes));
		});
	});
}

const findOneByName = name => {
	return new Promise(function(resolve, reject) {
		db.classDatastore.findOne({name: name}, (err, classe) => {
			resolve(classe);
		});
	});
}

module.exports = {findAllClassesNames, findOneByName};
