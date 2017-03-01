"use strict";
const electron = require('electron');
const app = electron.app;
let db;
initDB();

function initDB() {
	let fs = require('fs');
	if (!fs.existsSync('db')) {
		fs.mkdir('db');
	}
	let tingoDB = require('tingodb')().Db;
	db = new tingoDB('db', {});
	//account
	db.collection('account').createIndex({name:1},{unique:true});
	//server
	let serverCollection = db.collection('server');
	db.collection('server').createIndex({name:1},{unique:true});
	serverCollection.insert([{name:'Ywain1', ip:"107.23.173.143", port:"10622", n:"41"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain2', ip:"107.23.173.143", port:"10622", n:"49"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain3', ip:"107.23.173.143", port:"10622", n:"50"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain4', ip:"107.23.173.143", port:"10622", n:"51"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain5', ip:"107.23.173.143", port:"10622", n:"52"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain6', ip:"107.23.173.143", port:"10622", n:"53"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain7', ip:"107.23.173.143", port:"10622", n:"54"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain8', ip:"107.23.173.143", port:"10622", n:"55"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain9', ip:"107.23.173.143", port:"10622", n:"56"}], {w:1}, function(err, result) {});
	serverCollection.insert([{name:'Ywain10', ip:"107.23.173.143", port:"10622", n:"57"}], {w:1}, function(err, result) {});
	//realm
	let realmCollection = db.collection('realm');
	db.collection('realm').createIndex({name:1},{unique:true});
	realmCollection.insert([{name:'Albion', n:1}], {w:1}, function(err, result) {});
	realmCollection.insert([{name:'Hibernia', n:3}], {w:1}, function(err, result) {});
	realmCollection.insert([{name:'Midgard', n:2}], {w:1}, function(err, result) {});
	//class
	let classCollection = db.collection('class');
	db.collection('class').createIndex({name:1},{unique:true});
	classCollection.insert([{name:'Armsman', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Cabalist', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Cleric', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Friar', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Heretic', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Infiltrator', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Mauler (Alb)', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Mercenary', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Minstrel', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Necromancer', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Paladin', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Reaver', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Scout', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Sorcerer', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Theurg', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Wizard', realm:'Albion'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Animist', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Bainshee', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Bard', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Blademaster', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Champion', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Druid', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Eldritch', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Enchanter', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Hero', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Mauler (Hib)', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Mentalist', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Nightshade', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Ranger', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Valewalker', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Vampiir', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Warden', realm:'Hibernia'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Berserker', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Bonedancer', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Healer', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Hunter', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Mauler (Mid)', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Runemaster', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Savage', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Shadowblade', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Shaman', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Skald', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Spiritmaster', realm:''}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Thane', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Valkyrie', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Warlock', realm:'Midgard'}], {w:1}, function(err, result) {});
	classCollection.insert([{name:'Warrior', realm:'Midgard'}], {w:1}, function(err, result) {});
	//character
	//db.collection('character').createIndex({name:1,account:1},{unique:true});
	startExpress();
}

function sendAllAccounts (response) {
	let accountCollection = db.collection('account');
	let cursor = accountCollection.find({});
	let accounts = '{"aaData":[';
	cursor.each(function(err, item) {
		if (item == null) {
			accounts = accounts.slice(0, -1);
			accounts += ']}';
			if (accounts === '{"aaData":]}') {
				accounts ='{"aaData":[]}';
			}
			response.send(accounts);
		} else {
			accounts += '["' + item._id + '","' + item.name + '","' + item.password + '","' + "<a data-id='row-" + item._id + "' href='javascript:editAccountRow(" + item._id + ");' class='btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href='javascript:removeAccountRow(" + item._id + ");' class='btnX btn-default btn-md btnX-delete'>remove<\/a>" + '"],';
		}
	});
}

function getAllAccountsNames(response) {
	let accountCollection = db.collection('account');
	let cursor = accountCollection.find({}, {name:1, _id:0});
	let accountsArray = [];
	cursor.each(function(err, item) {
		if (item == null) {
			return response.send(accountsArray);
		} else {
			accountsArray.push(item.name);
		}
	});
}

function startExpress() {
	let express = require('express');
	let server = express();
	let port = 3000;

	server.get('/', function (request, response) {
		response.setHeader('Content-Type', 'application/json');
		
		if (request.query.getAllAccountsNames != undefined) {
			getAllAccountsNames(response);
		}

		if (request.query.ajaxAccount != undefined || request.query.removeAccount != undefined || request.query.editAccount != undefined) {
			let accountCollection = db.collection('account');
			if (request.query.removeAccount != undefined) {
				accountCollection.remove({"_id":request.query.removeAccount});
			}
			if (request.query.editAccount != undefined) {//per aprire la modal di edit, ritorniamo l'elemento da modificare
				accountCollection.findOne({"_id":request.query.editAccount}, function(err, item) {
					response.send(item);
				});
			} else {//view normale
				sendAllAccounts(response)	
			}
		}
	});

	server.post('/', function (request, response) {
		let body = '';
		response.setHeader('Content-Type', 'application/json');
		request.on('data', function (data) {
			body += data;
			if (body.length > 1e6) {
				request.connection.destroy();
			}
		});

		request.on('end', function () {
			let post = require('querystring').parse(body);
			if (request.query.addAccount != undefined || request.query.editAccount != undefined) {
				let accountCollection = db.collection('account');
				if (request.query.addAccount != undefined) {
					accountCollection.insert([{name:post['account-name'], password:post['account-password']}], {w:1}, function(err, result) {
						response.send(result);
					});
				} else if (request.query.editAccount != undefined) {//edit effettiva
					accountCollection.update({_id:request.query.editAccount},{name:post['account-name'], password:post['account-password']}, function(){
						accountCollection.findOne({"_id":request.query.editAccount}, function(err, item) {
							response.send(item);
						});
					});
				}
			}
		});
	});

	server.listen(port, function () {
		console.log('Express running in electron and listening on port ' + port + '!');
	});
}

app.on('ready', function() {
	const path = require('path');
	const url = require('url');
	const BrowserWindow = electron.BrowserWindow;
	let mainWindow = new BrowserWindow({width: 1024, height: 768 /*backgroundColor: '#2e2c29'*/});
	//mainWindow.loadURL('https://github.com');
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'html', 'views', 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	//dev mode automatica
	//mainWindow.webContents.openDevTools();	
});
