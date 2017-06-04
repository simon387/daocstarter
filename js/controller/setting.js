'use strict';

const db = require('../db-module.js');
const util = require('./common-util.js');

module.exports = {
	getAllSettings: response => {
		db.settingDatastore.find({_id: {$nin:
			['3', '4', '5', '6']
			}}, (err, docs) => {
			let ret = '{"aaData":[';
			docs.forEach(setting => {
				ret += '["' + setting._id + '","' +
				setting.key + '","' +
				setting.value + '","' +
				util.editButton('Setting', setting._id, setting.type) + '"],';
			});
			response.send(util.correggiRispostaPerDataTable(ret));
		});
	},

	editSettingBooleano: (event, id) => {
		db.settingDatastore.findOne({_id: id}, (err, setting) => {
			event.sender.send('edit-setting-booleano-reply', setting);
		});
	},

	saveSettingBooleano: (event, id, value) => {
		db.settingDatastore.update({_id: id},
			{$set: {value: value}},
			{returnUpdatedDocs: false, multi: false}, (err, numAffected, affectedDocuments) => {
				event.sender.send('save-setting-booleano-reply');
			}
		);
	}
}
