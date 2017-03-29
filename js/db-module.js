"use strict";

const {app} = require('electron');
const dbPath = app.getPath("userData") + '/db/';
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

	init: function() {
		let Datastore = require('nedb');
		//account
		module.exports.accountDatastore = new Datastore({filename:dbPath + 'account', autoload:true});
		module.exports.accountDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		//server
		module.exports.serverDatastore = new Datastore({filename:dbPath + 'server', autoload:true});
		module.exports.serverDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		module.exports.serverDatastore.insert([
			{name:'Ywain1', ip:"107.23.173.143", port:"10622", n:"41"},
			{name:'Ywain2', ip:"107.23.173.143", port:"10622", n:"49"},
			{name:'Ywain3', ip:"107.23.173.143", port:"10622", n:"50"},
			{name:'Ywain4', ip:"107.23.173.143", port:"10622", n:"51"},
			{name:'Ywain5', ip:"107.23.173.143", port:"10622", n:"52"},
			{name:'Ywain6', ip:"107.23.173.143", port:"10622", n:"53"},
			{name:'Ywain7', ip:"107.23.173.143", port:"10622", n:"54"},
			{name:'Ywain8', ip:"107.23.173.143", port:"10622", n:"55"},
			{name:'Ywain9', ip:"107.23.173.143", port:"10622", n:"56"},
			{name:'Ywain10', ip:"107.23.173.143", port:"10622", n:"57"}], function(err) {});
		//realm
		module.exports.realmDatastore = new Datastore({filename:dbPath + 'realm', autoload:true});
		module.exports.realmDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		module.exports.realmDatastore.insert([
			{name:'Albion', n:"1"},
			{name:'Hibernia', n:"3"},
			{name:'Midgard', n:"2"}], function(err) {});
		//class
		module.exports.classDatastore = new Datastore({filename:dbPath + 'class', autoload:true});
		module.exports.classDatastore.ensureIndex({fieldName:'name', unique:true}, function(err) {});
		module.exports.classDatastore.insert([
			{name:'Armsman', realm:'Albion'},
			{name:'Cabalist', realm:'Albion'},
			{name:'Cleric', realm:'Albion'},
			{name:'Friar', realm:'Albion'},
			{name:'Heretic', realm:'Albion'},
			{name:'Infiltrator', realm:'Albion'},
			{name:'Mauler (Alb)', realm:'Albion'},
			{name:'Mercenary', realm:'Albion'},
			{name:'Minstrel', realm:'Albion'},
			{name:'Necromancer', realm:'Albion'},
			{name:'Paladin', realm:'Albion'},
			{name:'Reaver', realm:'Albion'},
			{name:'Scout', realm:'Albion'},
			{name:'Sorcerer', realm:'Albion'},
			{name:'Theurg', realm:'Albion'},
			{name:'Wizard', realm:'Albion'},
			{name:'Animist', realm:'Hibernia'},
			{name:'Bainshee', realm:'Hibernia'},
			{name:'Bard', realm:'Hibernia'},
			{name:'Blademaster', realm:'Hibernia'},
			{name:'Champion', realm:'Hibernia'},
			{name:'Druid', realm:'Hibernia'},
			{name:'Eldritch', realm:'Hibernia'},
			{name:'Enchanter', realm:'Hibernia'},
			{name:'Hero', realm:'Hibernia'},
			{name:'Mauler (Hib)', realm:'Hibernia'},
			{name:'Mentalist', realm:'Hibernia'},
			{name:'Nightshade', realm:'Hibernia'},
			{name:'Ranger', realm:'Hibernia'},
			{name:'Valewalker', realm:'Hibernia'},
			{name:'Vampiir', realm:'Hibernia'},
			{name:'Warden', realm:'Hibernia'},
			{name:'Berserker', realm:'Midgard'},
			{name:'Bonedancer', realm:'Midgard'},
			{name:'Healer', realm:'Midgard'},
			{name:'Hunter', realm:'Midgard'},
			{name:'Mauler (Mid)', realm:'Midgard'},
			{name:'Runemaster', realm:'Midgard'},
			{name:'Savage', realm:'Midgard'},
			{name:'Shadowblade', realm:'Midgard'},
			{name:'Shaman', realm:'Midgard'},
			{name:'Skald', realm:'Midgard'},
			{name:'Spiritmaster', realm:'Midgard'},
			{name:'Thane', realm:'Midgard'},
			{name:'Valkyrie', realm:'Midgard'},
			{name:'Warlock', realm:'Midgard'},
			{name:'Warrior', realm:'Midgard'}], function(err) {});
		//character
		module.exports.characterDatastore = new Datastore({filename:dbPath + 'character', autoload:true});
		//setting
		module.exports.settingDatastore = new Datastore({filename:dbPath + 'setting', autoload:true});
		module.exports.settingDatastore.ensureIndex({fieldName:'key', unique:true}, function(err) {});
		module.exports.settingDatastore.insert([{_id:'1', key:'path.to.game.dll', type:'File', value:'C:\\\\Program Files (x86)\\\\Electronic Arts\\\\Dark Age of Camelot\\\\game.dll'}], function(err) {});
		module.exports.settingDatastore.insert([{_id:'2', key:'path.to.user.dat', type:'File', value:app.getPath("appData").replace(/\\/g, "\\\\") + '\\\\Electronic Arts\\\\Dark Age of Camelot\\\\LotM\\\\user.dat'}], function(err) {});
	},
	
	//{"aaData":[["39","simone","simon387@hotmail.it","1211",null,"<a data-id=\"row-39\" href=\"javascript:editRow(39);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(39);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}
	getAllAccounts: function (response) {
		module.exports.accountDatastore.find({}, function(err, docs) {
			let ret = '{"aaData":[';
			docs.forEach(function (item) {
				ret += '["' + item._id + '","' + item.name + '","' + item.password.replace(/./g, '*') + '","' + "<a data-id='row-" + item._id
				+ "' href=javascript:editAccountRow(\'" + item._id + "\'); class='sr-button btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href=javascript:removeAccountRow(\'" + item._id + "\'); class='sr-button btnX btn-default btn-md btnX-delete'>X<\/a>" + '"],';
			});
			response.send(correggiRispostaPerDT(ret));
		});
	},

	getAllCharacters: function (response) {
		module.exports.characterDatastore.find({}, function(err, docs){
			let ret = '{"aaData":[';
			docs.forEach(function (item) {
				ret += '["' + item._id + '","'
				+ "<a href=javascript:playCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-primary btn-sm sr-button'>play<\/a>" + ' '
				+ "<a href=javascript:killCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-primary btn-md btnX-delete'>qtd<\/a>" + '","'
				+ item.name + '","' + item.lastlogin + '","' + item.account + '","' + item.server + '","' + item.class + '","' + item.resolution + '","' + item.windowed + '","' + "<a data-id='row-" + item._id
				+ "' href=javascript:editCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href=javascript:removeCharacterRow(\'" + item._id + "\'); class='sr-button btnX btn-default btn-md btnX-delete'>X<\/a>" + '"],';
			});
			response.send(correggiRispostaPerDT(ret));
		});
	},

	getAllSettings: function (response) {
		module.exports.settingDatastore.find({}, function(err, docs){
			let ret = '{"aaData":[';
			docs.forEach(function (item) {
				ret += '["' + item._id + '","' + item.key + '","' + item.value + '","' + "<a data-id='row-" + item._id
				+ "' href='javascript:editSettingRow" + item.type + "(" + item._id + ");' class='sr-button btnX btn-md btn-successX'>edit<\/a>" + '"],';
			});
			//setting fillers, solo per impaginazione/estetica
			ret += '["' + 3 + '","' + "-" + '","' + "-" + '","' + "<a data-id='row-" + 0
				+ "' href='javascript:editSettingRow" + "file" + "(" + 0 + ");' class='sr-button btnX btn-md btn-successX'>edit<\/a>" + '"],';
			ret += '["' + 4 + '","' + "-" + '","' + "-" + '","' + "<a data-id='row-" + 0
				+ "' href='javascript:editSettingRow" + "file" + "(" + 0 + ");' class='sr-button btnX btn-md btn-successX'>edit<\/a>" + '"],';
			ret += '["' + 5 + '","' + "-" + '","' + "-" + '","' + "<a data-id='row-" + 0
				+ "' href='javascript:editSettingRow" + "file" + "(" + 0 + ");' class='sr-button btnX btn-md btn-successX'>edit<\/a>" + '"],';
			ret += '["' + 6 + '","' + "-" + '","' + "-" + '","' + "<a data-id='row-" + 0
				+ "' href='javascript:editSettingRow" + "file" + "(" + 0 + ");' class='sr-button btnX btn-md btn-successX'>edit<\/a>" + '"],';
				
			response.send(correggiRispostaPerDT(ret));
		});
	},

	getAllAccountsNames: function (response) {
		module.exports.accountDatastore.find({}, function(err, docs) {
			return getAllNamesHelper(response, docs);
		});
	},

	getAllServersNames: function (response) {
		module.exports.serverDatastore.find({}, function(err, docs) {
			return getAllNamesHelper(response, docs);
		});
	},
	
	getAllClassesNames: function (response) {
		module.exports.classDatastore.find({}, function(err, docs) {
			return getAllNamesHelper(response, docs);
		});
	}
}

function correggiRispostaPerDT(ret) {
	ret = ret.slice(0, -1) + ']}';
	if (ret === '{"aaData":]}') {
		ret ='{"aaData":[]}';
	}
	return ret;
}

function getAllNamesHelper(response, docs) {
	let array = [];
	docs.forEach(function (doc) {
		array.push(doc.name);
	});
	return response.send(array.sort());
}
