'use strict';

const {app} = require('electron');
const Datastore = require('nedb');
const path = require('path');
const constants = require('./constants.js');

const init = () => {
	//account
	module.exports.accountDatastore = new Datastore({
		filename: constants.dbPath + 'account',
		autoload: true
	});
	module.exports.accountDatastore.ensureIndex({
		fieldName: 'name',
		unique: true
	}, err => {});
	//server
	module.exports.serverDatastore = new Datastore({
		filename: constants.dbPath + 'server',
		autoload: true
	});
	module.exports.serverDatastore.ensureIndex({
		fieldName: 'name',
		unique: true
	}, err => {});
	module.exports.serverDatastore.insert([
		{name: constants.ywain + '1',  ip: constants.ywainIp, port: constants.ywainPort, n: '41'},
		{name: constants.ywain + '2',  ip: constants.ywainIp, port: constants.ywainPort, n: '49'},
		{name: constants.ywain + '3',  ip: constants.ywainIp, port: constants.ywainPort, n: '50'},
		{name: constants.ywain + '4',  ip: constants.ywainIp, port: constants.ywainPort, n: '51'},
		{name: constants.ywain + '5',  ip: constants.ywainIp, port: constants.ywainPort, n: '52'},
		{name: constants.ywain + '6',  ip: constants.ywainIp, port: constants.ywainPort, n: '53'},
		{name: constants.ywain + '7',  ip: constants.ywainIp, port: constants.ywainPort, n: '54'},
		{name: constants.ywain + '8',  ip: constants.ywainIp, port: constants.ywainPort, n: '55'},
		{name: constants.ywain + '9',  ip: constants.ywainIp, port: constants.ywainPort, n: '56'},
		{name: constants.ywain + '10', ip: constants.ywainIp, port: constants.ywainPort, n: '57'}
	], err => {});
	//realm
	module.exports.realmDatastore = new Datastore({
		filename: constants.dbPath + 'realm',
		autoload: true
	});
	module.exports.realmDatastore.ensureIndex({
		fieldName: 'name',
		unique:true
	}, err => {});
	module.exports.realmDatastore.insert([
		{name: constants.albion, n: '1'},
		{name: constants.hibernia, n: '3'},
		{name: constants.midgard, n: '2'}], err => {});
	//class
	module.exports.classDatastore = new Datastore({
		filename: constants.dbPath + 'class',
		autoload: true
	});
	module.exports.classDatastore.ensureIndex({
		fieldName: 'name',
		unique: true
	}, err => {});
	module.exports.classDatastore.insert([
		{name: 'Armsman', realm: constants.albion},
		{name: 'Cabalist', realm: constants.albion},
		{name: 'Cleric', realm: constants.albion},
		{name: 'Friar', realm: constants.albion},
		{name: 'Heretic', realm: constants.albion},
		{name: 'Infiltrator', realm: constants.albion},
		{name: 'Mauler (Alb) ', realm: constants.albion},
		{name: 'Mercenary', realm: constants.albion},
		{name: 'Minstrel', realm: constants.albion},
		{name: 'Necromancer', realm: constants.albion},
		{name: 'Paladin', realm: constants.albion},
		{name: 'Reaver', realm: constants.albion},
		{name: 'Scout', realm: constants.albion},
		{name: 'Sorcerer', realm: constants.albion},
		{name: 'Theurg', realm: constants.albion},
		{name: 'Wizard', realm: constants.albion},
		{name: 'Animist', realm: constants.hibernia},
		{name: 'Bainshee', realm: constants.hibernia},
		{name: 'Bard', realm: constants.hibernia},
		{name: 'Blademaster', realm: constants.hibernia},
		{name: 'Champion', realm: constants.hibernia},
		{name: 'Druid', realm: constants.hibernia},
		{name: 'Eldritch', realm: constants.hibernia},
		{name: 'Enchanter', realm: constants.hibernia},
		{name: 'Hero', realm: constants.hibernia},
		{name: 'Mauler (Hib) ', realm: constants.hibernia},
		{name: 'Mentalist', realm: constants.hibernia},
		{name: 'Nightshade', realm: constants.hibernia},
		{name: 'Ranger', realm: constants.hibernia},
		{name: 'Valewalker', realm: constants.hibernia},
		{name: 'Vampiir', realm: constants.hibernia},
		{name: 'Warden', realm: constants.hibernia},
		{name: 'Berserker', realm: constants.midgard},
		{name: 'Bonedancer', realm: constants.midgard},
		{name: 'Healer', realm: constants.midgard},
		{name: 'Hunter', realm: constants.midgard},
		{name: 'Mauler (Mid) ', realm: constants.midgard},
		{name: 'Runemaster', realm: constants.midgard},
		{name: 'Savage', realm: constants.midgard},
		{name: 'Shadowblade', realm: constants.midgard},
		{name: 'Shaman', realm: constants.midgard},
		{name: 'Skald', realm: constants.midgard},
		{name: 'Spiritmaster', realm: constants.midgard},
		{name: 'Thane', realm: constants.midgard},
		{name: 'Valkyrie', realm: constants.midgard},
		{name: 'Warlock', realm: constants.midgard},
		{name: 'Warrior', realm: constants.midgard}], err => {});
	//character
	module.exports.characterDatastore = new Datastore({
		filename: constants.dbPath + 'character',
		autoload: true
	});
	//team
	module.exports.teamDatastore = new Datastore({
		filename: constants.dbPath + 'team',
		autoload: true
	});
	module.exports.teamDatastore.ensureIndex({
		fieldName: 'name',
		unique: true
	}, err => {});
	//setting 
	module.exports.settingDatastore = new Datastore({
		filename: constants.dbPath + 'setting',
		autoload: true
	});
	module.exports.settingDatastore.ensureIndex({
		fieldName: 'key',
		unique: true
	}, err => {});
	module.exports.settingDatastore.insert({
		_id: '10',
		key: constants.quitMinimizeToTray,
		type: constants.typeBooleano,
		value: false}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '9',
		key: constants.minimizeToTray,
		type: constants.typeBooleano,
		value: false}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '8',
		key: constants.customResolutionsCommaSeparated,
		type: constants.typeStringa,
		value: constants.defaultBaseResolutions}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '7',
		key: constants.defaultLoginDelayMilli,
		type: constants.typeNumero,
		value: 2000}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '6',
		key: constants.settingItemsPerPage,
		type: constants.typeNumero,
		value: 10}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '5',
		key: constants.accountItemsPerPage,
		type: constants.typeNumero,
		value: 10}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '4',
		key: constants.teamItemsPerPage,
		type: constants.typeNumero,
		value: 10}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '3',
		key: constants.characterItemsPerPage,
		type: constants.typeNumero,
		value: 10}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '2',
		key: constants.pathToUserDat,
		type: constants.typeFile,
		value: constants.defaultPathToUserDat}, err => {}
	);
	module.exports.settingDatastore.insert({
		_id: '1',
		key: constants.pathToGameDll,
		type: constants.typeFile,
		value: constants.defaultPathToGameDll}, err => {}
	);
}

module.exports = {init};
