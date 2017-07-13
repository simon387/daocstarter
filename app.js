'use strict';

const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const commonUtil = require('./js/controller/common-util.js');
const constants = require('./js/constants.js');
const trayModule = require('./js/tray-module.js');
const log = require('./js/log-module.js').getLog();
require('./js/update-module.js').updateCheck();
require('./js/db-module.js').init();
require('./js/ipc-module');
require('./js/express-module.js');
require('./js/menu-module.js');
let mainWindow = null;

log.info(constants.logInit);

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		mainWindow.focus();
	}
});

if (shouldQuit) {
	app.quit();
}

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1400,
		height: 809,
		minWidth: 400,
		minHeight: 400,
		show: false,
		resizable: true,
		title: constants.title + app.getVersion(),
		icon: constants.icoCompiled
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

	trayModule.setup(app, mainWindow);
});

app.on('quit', () => {
	log.info(constants.logQuit);
});
