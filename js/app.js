'use strict';

const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const commonUtil = require('./controller/common-util');
const constants = require('./constants');
const trayModule = require('./tray-module');
const log = require('./log-module').getLog();
require('./update-module').updateCheck();
require('./db-module').init();
require('./ipc-module');
require('./express-module');
require('./menu-module');
let mainWindow = null;

log.info(constants.logInit);

// const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
// 	if (mainWindow) {
// 		if (mainWindow.isMinimized()) {
// 			mainWindow.restore();
// 		}
// 		mainWindow.focus();
// 	}
// });
app.requestSingleInstanceLock();
app.on('second-instance', (event, argv, cwd) => {
	app.quit();
})

// if (shouldQuit) {
// 	console.log("quitto sto quittando")
// 	app.quit();
// }

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
		pathname: path.join(__dirname, '..', 'html', 'main.html'),
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
