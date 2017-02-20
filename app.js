const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

//const nw = require('nw.gui');
//var router = require('electron-request-response/main');

var express = require('express');
var server = express();

//server.use(express.static('public'));

server.get('/', function (req, res) {
	//console.log('STATUS: ' + res.statusCode);
	//console.log('HEADERS: ' + JSON.stringify(res.headers));
  
//  console.log(req);

  	//res.json('"sEcho": 3,"iTotalRecords": 57,"iTotalDisplayRecords": 57,{"aaData":[["8","asdasd","asd@asdasd.com","keasd",null,"<a data-id=\"row-8\" href=\"javascript:editRow(8);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(8);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["7","1","1@1.1","1",null,"<a data-id=\"row-7\" href=\"javascript:editRow(7);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(7);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["3","simone","564564n387@hotmail.it","34",null,"<a data-id=\"row-3\" href=\"javascript:editRow(3);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(3);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["6","marco","darinasd@pollo.com","asd",null,"<a data-id=\"row-6\" href=\"javascript:editRow(6);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(6);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["5","simone","45687@hotmail.it","345",null,"<a data-id=\"row-5\" href=\"javascript:editRow(5);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(5);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["9","A","A@a.a","a",null,"<a data-id=\"row-9\" href=\"javascript:editRow(9);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(9);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["10","asd","asdasd@asd.e","asd",null,"<a data-id=\"row-10\" href=\"javascript:editRow(10);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(10);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["11","simone","simon387@asd.it","asdsda",null,"<a data-id=\"row-11\" href=\"javascript:editRow(11);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(11);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["12","a","a@a.a","a",null,"<a data-id=\"row-12\" href=\"javascript:editRow(12);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(12);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["13","a","a@a.a","a",null,"<a data-id=\"row-13\" href=\"javascript:editRow(13);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(13);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["14","a","a@a.a","a",null,"<a data-id=\"row-14\" href=\"javascript:editRow(14);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(14);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["15","a","a@a.a","a",null,"<a data-id=\"row-15\" href=\"javascript:editRow(15);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(15);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["16","a","a@a.a","a",null,"<a data-id=\"row-16\" href=\"javascript:editRow(16);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(16);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}');


	//res.send('{"aaData":[["8","asdasd","asd@asdasd.com","keasd",null,"<a data-id=\"row-8\" href=\"javascript:editRow(8);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(8);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["7","1","1@1.1","1",null,"<a data-id=\"row-7\" href=\"javascript:editRow(7);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(7);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["3","simone","564564n387@hotmail.it","34",null,"<a data-id=\"row-3\" href=\"javascript:editRow(3);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(3);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["6","marco","darinasd@pollo.com","asd",null,"<a data-id=\"row-6\" href=\"javascript:editRow(6);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(6);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["5","simone","45687@hotmail.it","345",null,"<a data-id=\"row-5\" href=\"javascript:editRow(5);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(5);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["9","A","A@a.a","a",null,"<a data-id=\"row-9\" href=\"javascript:editRow(9);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(9);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["10","asd","asdasd@asd.e","asd",null,"<a data-id=\"row-10\" href=\"javascript:editRow(10);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(10);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["11","simone","simon387@asd.it","asdsda",null,"<a data-id=\"row-11\" href=\"javascript:editRow(11);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(11);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["12","a","a@a.a","a",null,"<a data-id=\"row-12\" href=\"javascript:editRow(12);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(12);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["13","a","a@a.a","a",null,"<a data-id=\"row-13\" href=\"javascript:editRow(13);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(13);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["14","a","a@a.a","a",null,"<a data-id=\"row-14\" href=\"javascript:editRow(14);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(14);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["15","a","a@a.a","a",null,"<a data-id=\"row-15\" href=\"javascript:editRow(15);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(15);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["16","a","a@a.a","a",null,"<a data-id=\"row-16\" href=\"javascript:editRow(16);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(16);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}');
	res.send('{"aaData":[["7","1","1@1.1","1",null,"<a data-id=\"row-7\" href=\"javascript:editRow(7);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(7);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["6","marco","darinasd@pollo.com","asd",null,"<a data-id=\"row-6\" href=\"javascript:editRow(6);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(6);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["5","simone","45687@hotmail.it","345",null,"<a data-id=\"row-5\" href=\"javascript:editRow(5);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(5);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["18","h","asfd@gasofj.colm","h",null,"<a data-id=\"row-18\" href=\"javascript:editRow(18);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(18);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["14","a","a@a.a","a",null,"<a data-id=\"row-14\" href=\"javascript:editRow(14);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(14);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["15","a","a@a.a","a",null,"<a data-id=\"row-15\" href=\"javascript:editRow(15);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(15);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["16","a","a@a.a","a",null,"<a data-id=\"row-16\" href=\"javascript:editRow(16);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(16);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["17","prova","chiocciola@c.o","asd",null,"<a data-id=\"row-17\" href=\"javascript:editRow(17);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(17);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}');
	
	console.log(res);
});

server.listen(3000, function () {
	console.log('Express running in electron and listening on port 3000!');
});

app.on('ready', function() {

/*
	let Db = require('tingodb')().Db;
	let assert = require('assert');

	var db = new Db('c:\\db', {});
	// Fetch a collection to insert document into
	var collection = db.collection("batch_document_insert_collection_safe");
	let col = db.collection("tabella");
	col.insert([{numero:2}], {w:1}, function(err, result) {});

	// Insert a single document
	collection.insert([{hello:'world_safe1'}
	, {hello:'world_safe2'}], {w:1}, function(err, result) {
		assert.equal(null, err);

		// Fetch the document
		collection.findOne({hello:'world_safe2'}, function(err, item) {
			assert.equal(null, err);
			assert.equal('world_safe2', item.hello);
		})
	});
*/




	mainWindow = new BrowserWindow(); //"/*width: 400, height: 300,*/ /*backgroundColor: '#2e2c29'*/});
	//mainWindow.loadURL('https://github.com');

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'html', 'views', 'main.html'),
		//pathname: path.join(__dirname, 'html', 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	//dev mode
	mainWindow.webContents.openDevTools();
//	router.makeAddressable('mainWindow', mainWindow);
	
	// Type 4: Persistent datastore for a Node Webkit app called 'nwtest'
	// For example on Linux, the datafile will be ~/.config/nwtest/nedb-data/something.db
	//var Datastore = require('nedb'),
	//path = require('path'),
	//db = new Datastore({ filename: path.join(nw.App.dataPath, 'something.db') });
});

