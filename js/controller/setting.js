'use strict';

const util = require('./common-util');
const db = require('../db-module');
const trayModule = require('../tray-module');


const getAllSettingsForDT = () => {
	return new Promise(function(resolve, reject) {
		db.settingDatastore.find({_id: {$in: ['1', '10', '2', '7', '8', '9']}}, (err, settings) => {
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
}

const editSettingBooleano  =(event, id) => {
	db.settingDatastore.findOne({_id: id}, (err, setting) => {
		event.sender.send('edit-setting-booleano-reply', setting);
	});
}

const saveSettingBooleano = (event, id, value) => {
	db.settingDatastore.update({_id: id},
		{$set: {value: value}},
		{returnUpdatedDocs: false, multi: false}, (err, numAffected, affectedDocuments) => {
			event.sender.send('save-setting-booleano-reply');
			if (id === '9' || id === '10') {
				trayModule.applySettings();
			}
		}
	);
}

const updateSettingByKey = (key, value, upsert = false) => {
	return new Promise(function(resolve, reject) {
		db.settingDatastore.update(
			{key: key},
			{$set: {value: value}},
			{returnUpdatedDocs: true, multi: false, upsert: upsert},
			(err, numAffected, affectedDocuments) => {
				resolve(numAffected);
				if (err) {
					log.error(err);
				}
		});
	});
}

const updateSettingById = (id, value) => {
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
}

const findOneById = id => {
	return new Promise(function(resolve, reject) {
		db.settingDatastore.findOne({_id: id}, (err, setting) => {
			resolve(setting);
		});
	});
}

const update = (id, obj) => {
	return new Promise(function(resolve, reject) {
		db.settingDatastore.update(
			{key: id},
			{$set: {value: obj['setting-value-file']}},
			{returnUpdatedDocs: true, multi: false}, (err, numAffected, setting) => {
			resolve(setting);
		});
	});
}


module.exports = {
	getAllSettingsForDT,
	editSettingBooleano,
	saveSettingBooleano,
	updateSettingByKey,
	updateSettingById,
	findOneById,
	update
}