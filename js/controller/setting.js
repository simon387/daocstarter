'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');
const trayModule = require('../tray-module.js');

module.exports = {
	getAllSettingsForDT: () => {
		return new Promise(function(resolve, reject) {
			db.settingDatastore.find({_id: {$nin: ['3', '4', '5', '6']}}, (err, settings) => {
				let payload = new Object();
				payload.aaData = [];
				settings.forEach(setting => {
					let row = [];
					row.push(setting._id);
					row.push(setting.key);
					row.push(setting.value);
					row.push(util.editButton('Setting', setting._id, setting.type));
					payload.aaData.push(row);
				});
				resolve(payload);
			});
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
				if (id === '9' || id === '10') {
					trayModule.applySettings();
				}
			}
		);
	},

	updateSettingByKey: (key, value) => {
		return new Promise(function(resolve, reject) {
			db.settingDatastore.update(
				{key: key},
				{$set: {value: value}},
				{returnUpdatedDocs: true, multi: false},
				(err, numAffected, affectedDocuments) => {
					resolve(numAffected);
					if (err) {
						log.error(err);
					}
			});
		});
	},

	updateSettingById: (id, value) => {
		return new Promise(function(resolve, reject) {
			db.settingDatastore.update(
				{_id: id},
				{$set: {value: value}},
				{returnUpdatedDocs: true, multi: false},
				(err, numAffected, affectedDocuments) => {
					resolve(numAffected);
					if (err) {
						log.error(err);
					}
			});
		});
	},

	findOneById: id => {
		return new Promise(function(resolve, reject) {
			db.settingDatastore.findOne({_id: id}, (err, setting) => {
				resolve(setting);
			});
		});
	},

	update: (id, obj) => {
		return new Promise(function(resolve, reject) {
			db.settingDatastore.update(
				{key: id},
				{$set: {value: obj['setting-value-file']}},
				{returnUpdatedDocs: true, multi: false}, (err, numAffected, setting) => {
				resolve(setting);
			});
		});
	}
}
