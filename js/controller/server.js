'use strict';

const util = require('./common-util');
const db = require('../db-module');

const findAllServersNames = () => {
	return new Promise(function(resolve, reject) {
		db.serverDatastore.find({}).sort({n: 1}).exec((err, servers) => {
			resolve(util.getAllNamesHelper(servers, true));
		});
	});
}

const toNumber = serverName => {
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

const findOneByName = name => {
	return new Promise(function(resolve, reject) {
		db.serverDatastore.findOne({name: name}, (err, server) => {
			resolve(server);
		});
	});
}

module.exports = {findAllServersNames, toNumber, findOneByName};
