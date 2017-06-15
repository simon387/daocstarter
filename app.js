'use strict';

const {app, BrowserWindow, dialog} = require('electron');
const path = require('path');
const url = require('url');
const commonUtil = require('./js/controller/common-util.js');
const trayModule = require('./js/tray-module.js');
const log = require('./js/log-module.js').getLog();
let tray = null;
require('./js/update-module.js').updateCheck();
require('./js/db-module.js').init();
require('./js/ipc-module');
require('./js/express-module.js');
require('./js/menu-module.js');

log.info('daocstarter init');

app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		width: 1400,
		height: 809,
		minWidth: 400,
		minHeight: 400,
		show: false,
		resizable: true,
		title: 'DAoC Starter v' + app.getVersion(),
		icon: 'img/i.ico'
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'html', 'views', 'main.html'),
		protocol: 'file',
		slashes: true
	}));

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.on('resize', () => {
		commonUtil.moveFavourites(mainWindow.getSize());
	});

	tray = trayModule.setup(tray, app, mainWindow);
});

app.on('quit', () => {
	log.info('daocstarter quit');
});
