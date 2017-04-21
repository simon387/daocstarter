'use strict';

const {app} = require('electron');
const dbPath = app.getPath("userData") + '/db/';
const Datastore = require('nedb');
let accountDatastore;
let characterDatastore;
let serverDatastore;
let realmDatastore;
let classDatastore;
let settingDatastore;

module.exports = {
	accountDatastore: accountDatastore,
	characterDatastore: characterDatastore,
	serverDatastore: serverDatastore,
	realmDatastore: realmDatastore,
	classDatastore: classDatastore,
	settingDatastore: settingDatastore,
	init: () => {
		//account
		module.exports.accountDatastore = new Datastore({filename:dbPath + 'account', autoload: true});
		module.exports.accountDatastore.ensureIndex({fieldName: 'name', unique: true}, err => {});
		//server
		module.exports.serverDatastore = new Datastore({filename:dbPath + 'server', autoload: true});
		module.exports.serverDatastore.ensureIndex({fieldName: 'name', unique: true}, err => {});
		const ywain = 'Ywain';
		const ip = '107.23.173.143';
		const port = '10622';
		const albion = 'Albion';
		const hibernia = 'Hibernia';
		const midgard = 'Midgard';
		module.exports.serverDatastore.insert([
			{name: ywain + '1', ip: ip, port: port, n: '41'},
			{name: ywain + '2', ip: ip, port: port, n: '49'},
			{name: ywain + '3', ip: ip, port: port, n: '50'},
			{name: ywain + '4', ip: ip, port: port, n: '51'},
			{name: ywain + '5', ip: ip, port: port, n: '52'},
			{name: ywain + '6', ip: ip, port: port, n: '53'},
			{name: ywain + '7', ip: ip, port: port, n: '54'},
			{name: ywain + '8', ip: ip, port: port, n: '55'},
			{name: ywain + '9', ip: ip, port: port, n: '56'},
			{name: ywain + '10', ip: ip, port: port, n: '57'}], err => {});
		//realm
		module.exports.realmDatastore = new Datastore({filename: dbPath + 'realm', autoload: true});
		module.exports.realmDatastore.ensureIndex({fieldName: 'name', unique:true}, err => {});
		module.exports.realmDatastore.insert([
			{name: albion, n: '1'},
			{name: hibernia, n: '3'},
			{name: midgard, n: '2'}], err => {});
		//class
		module.exports.classDatastore = new Datastore({filename: dbPath + 'class', autoload: true});
		module.exports.classDatastore.ensureIndex({fieldName: 'name', unique: true}, err => {});
		module.exports.classDatastore.insert([
			{name: 'Armsman', realm: albion},
			{name: 'Cabalist', realm: albion},
			{name: 'Cleric', realm: albion},
			{name: 'Friar', realm: albion},
			{name: 'Heretic', realm: albion},
			{name: 'Infiltrator', realm: albion},
			{name: 'Mauler (Alb) ', realm:albion},
			{name: 'Mercenary', realm: albion},
			{name: 'Minstrel', realm: albion},
			{name: 'Necromancer', realm: albion},
			{name: 'Paladin', realm: albion},
			{name: 'Reaver', realm: albion},
			{name: 'Scout', realm: albion},
			{name: 'Sorcerer', realm: albion},
			{name: 'Theurg', realm: albion},
			{name: 'Wizard', realm: albion},
			{name: 'Animist', realm: hibernia},
			{name: 'Bainshee', realm: hibernia},
			{name: 'Bard', realm: hibernia},
			{name: 'Blademaster', realm: hibernia},
			{name: 'Champion', realm: hibernia},
			{name: 'Druid', realm: hibernia},
			{name: 'Eldritch', realm: hibernia},
			{name: 'Enchanter', realm: hibernia},
			{name: 'Hero', realm: hibernia},
			{name: 'Mauler (Hib) ', realm:hibernia},
			{name: 'Mentalist', realm: hibernia},
			{name: 'Nightshade', realm: hibernia},
			{name: 'Ranger', realm: hibernia},
			{name: 'Valewalker', realm: hibernia},
			{name: 'Vampiir', realm: hibernia},
			{name: 'Warden', realm: hibernia},
			{name: 'Berserker', realm: midgard},
			{name: 'Bonedancer', realm: midgard},
			{name: 'Healer', realm: midgard},
			{name: 'Hunter', realm: midgard},
			{name: 'Mauler (Mid) ', realm:midgard},
			{name: 'Runemaster', realm: midgard},
			{name: 'Savage', realm: midgard},
			{name: 'Shadowblade', realm: midgard},
			{name: 'Shaman', realm: midgard},
			{name: 'Skald', realm: midgard},
			{name: 'Spiritmaster', realm: midgard},
			{name: 'Thane', realm: midgard},
			{name: 'Valkyrie', realm: midgard},
			{name: 'Warlock', realm: midgard},
			{name: 'Warrior', realm: midgard}], err => {});
		//character
		module.exports.characterDatastore = new Datastore({filename: dbPath + 'character', autoload: true});
		//team
		module.exports.teamDatastore = new Datastore({filename: dbPath + 'team', autoload: true});
		//setting
		module.exports.settingDatastore = new Datastore({filename: dbPath + 'setting', autoload: true});
		module.exports.settingDatastore.ensureIndex({fieldName: 'key', unique: true}, err => {});
		module.exports.settingDatastore.insert({
			_id: '7',
			key: 'default.login.delay.milli',
			type: 'Numero',
			value: 2000}, err => {}
		);
		module.exports.settingDatastore.insert({
			_id: '6',
			key: 'setting.items.per.page',
			type: 'Numero',
			value: 10}, err => {}
		);
		module.exports.settingDatastore.insert({
			_id: '5',
			key: 'account.items.per.page',
			type: 'Numero',
			value: 10}, err => {}
		);
		module.exports.settingDatastore.insert({
			_id: '4',
			key: 'team.items.per.page',
			type: 'Numero',
			value: 10}, err => {}
		);
		module.exports.settingDatastore.insert({
			_id: '3',
			key: 'character.items.per.page',
			type: 'Numero',
			value: 10}, err => {}
		);
		module.exports.settingDatastore.insert({
			_id: '2',
			key: 'path.to.user.dat',
			type: 'File',
			value: app.getPath('appData').replace(/\\/g, '\\\\') + '\\\\Electronic Arts\\\\Dark Age of Camelot\\\\LotM\\\\user.dat'}, err => {}
		);
		module.exports.settingDatastore.insert({
			_id: '1',
			key: 'path.to.game.dll',
			type: 'File',
			value: 'C:\\\\Program Files (x86)\\\\Electronic Arts\\\\Dark Age of Camelot\\\\game.dll'}, err => {}
		);
	}
}
