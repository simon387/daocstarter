'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');

module.exports = {
	getAllSettings: response => {
		db.settingDatastore.find({_id: {$in: ['1', '2', '7', '8']}}, (err, docs) => {
			let ret = '{"aaData":[';
			docs.forEach(setting => {
				ret += '["' + setting._id + '","' +
				setting.key + '","' +
				setting.value + '","' +
				util.editButton('Setting', setting._id, setting.type) + '"],';
			});
			response.send(util.correggiRispostaPerDataTable(ret));
		});
	}
}