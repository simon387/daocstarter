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
	startExpress();
}

function sendAllAccounts (response) {
	let accountCollection = db.collection('account');
	let cursor = accountCollection.find({});
	let accounts = '{"aaData":[';
	cursor.each(function(err, item) {
		if(item == null) {
			accounts = accounts.slice(0, -1);
			accounts += ']}';
			if (accounts === '{"aaData":]}') {
				accounts ='{"aaData":[]}';
			}
			response.send(accounts);
		} else {
			accounts += '["' + item._id + '","' + item.name + '","' + item.password + '","' +
			"<a data-id='row-" + item._id + "' href='javascript:editAccountRow(" + item._id +
			");' class='btnX btn-md btn-successX'>edit<\/a>&nbsp;<a href='javascript:removeAccountRow("
			+ item._id +
			");' class='btnX btn-default btn-md' style='background-color: #c83a2a;border-color: #b33426; color: #ffffff;'>remove<\/a>" + '"],';
		}
	});
}

function startExpress() {
	let express = require('express');
	let server = express();
	let port = 3000;

	server.get('/', function (request, response) {
		response.setHeader('Content-Type', 'application/json');
		
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
				} else if (request.query.editAccount != undefined) {
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
