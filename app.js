const electron = require('electron');
const app = electron.app;

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;

var mainWindow;

app.on('ready', function(){
	mainWindow = new BrowserWindow({/*width: 400, height: 300,*/ /*backgroundColor: '#2e2c29'*/});
	//mainWindow.loadURL('https://github.com');
	mainWindow.loadURL(url.format({
		pathname : path.join(__dirname, 'index.html'),
		//pathname: path.join(__dirname, 'html', 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	
	
});

