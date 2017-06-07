'use strict';

const {app, BrowserWindow} = require('electron');
const packageJSON = require('./package.json');
const path = require('path');
const commonUtil = require('./js/controller/common-util.js');
const trayModule = require('./js/tray-module.js');
let tray = null;
require('./js/update-module.js').updateCheck();
require('./js/db-module.js').init();
require('./js/ipc-module');
require('./js/express-module.js');
require('./js/menu-module.js');

let log = require('electron-log');
log.transports.file.level = 'silly';

app.on('ready', () => {

	log.info('Hello, log');

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
		//setTray();
	});

	mainWindow.on('resize', () => {
		commonUtil.moveFavourites(mainWindow.getSize());
	});

	trayModule.setup(tray, app, mainWindow);
/*
	mainWindow.on('minimize', event => {
		event.preventDefault()
		mainWindow.hide();
	});*/
});

app.on('window-all-closed', app.quit);//altrimenti al quit lascia i processi appesi-.-

