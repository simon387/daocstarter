'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	// getAllServersNames: response => {
	// 	db.serverDatastore.find({}).sort({n: 1}).exec((err, docs) => {
	// 		return util.getAllNamesHelper(response, docs);
	// 	});
	// },
	getAllServersNames: () => {
		return new Promise(function(resolve, reject) {
			db.serverDatastore.find({}).sort({n: 1}).exec((err, servers) => {
				resolve(util.getAllNamesHelper(servers));
			});
		});
	},

	toNumber: serverName => {
		switch (serverName) {
			case 'Ywain1': return '41';
			case 'Ywain2': return '49';
			case 'Ywain3': return '50';
			case 'Ywain4': return '51';
			case 'Ywain5': return '52';
			case 'Ywain6': return '53';
			case 'Ywain7': return '54';
			case 'Ywain8': return '55';
			case 'Ywain9': return '56';
			case 'Ywain10': return '57';
		}
	}
}
