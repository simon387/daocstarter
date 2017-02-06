const electron = require('electron');
const app = electron.app;

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;

var mainWindow;

//const nw = require('nw.gui');

app.on('ready', function() {
	mainWindow = new BrowserWindow(); //"/*width: 400, height: 300,*/ /*backgroundColor: '#2e2c29'*/});
	//mainWindow.loadURL('https://github.com');

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		//pathname: path.join(__dirname, 'html', 'main.html'),
		protocol: 'file',
		slashes: true
	}));

	// Type 4: Persistent datastore for a Node Webkit app called 'nwtest'
	// For example on Linux, the datafile will be ~/.config/nwtest/nedb-data/something.db
	//var Datastore = require('nedb'),
	//path = require('path'),
	//db = new Datastore({ filename: path.join(nw.App.dataPath, 'something.db') });
});
