'use strict';

const electron = require('electron');
const packageJSON = require('./package.json');
const path = require('path');
const commonUtil = require('./js/controller/common-util.js');
require('./js/update-module.js').updateCheck();
require('./js/db-module.js').init();
require('./js/ipc-module');
require('./js/express-module.js');
require('./js/menu-module.js');

electron.app.on('ready', () => {
	const BrowserWindow = electron.BrowserWindow;
	const mainWindow = new BrowserWindow({
		width: 1400,
		height: 809,
		minWidth: 400,
		minHeight: 400,
		show: false,
		resizable: true,
		title: 'DAoC Starter v' + packageJSON.version,
		icon: 'img/i.ico'
	});
	mainWindow.loadURL(require('url').format({
		pathname: path.join(__dirname, 'html', 'views', 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
	//mainWindow.webContents.openDevTools();//dev mode automatica
	mainWindow.on('resize', () => {
		commonUtil.moveFavourites(mainWindow.getSize());
	});
});

electron.app.on('window-all-closed', electron.app.quit);//altrimenti al quit lascia i processi appesi-.-
