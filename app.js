'use strict';

const {app, Menu, Tray, BrowserWindow} = require('electron');
const packageJSON = require('./package.json');
const path = require('path');
const commonUtil = require('./js/controller/common-util.js');
require('./js/update-module.js').updateCheck();
require('./js/db-module.js').init();
require('./js/ipc-module');
require('./js/express-module.js');
require('./js/menu-module.js');

let tray = null;

app.on('ready', () => {
	tray = new Tray('img/i.ico')
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Restore Daocstarter',
			click: () => {
				mainWindow.show();
			}
		},
		{
			label: 'Quit',
			click: () => {
				app.isQuiting = true;
				app.quit();
			}
		}
	]);
	tray.setToolTip('Daocstarter!');
	tray.setContextMenu(contextMenu);

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

	mainWindow.on('resize', () => {
		commonUtil.moveFavourites(mainWindow.getSize());
	});

	mainWindow.on('minimize', event => {
		event.preventDefault()
		mainWindow.hide();
	});

	mainWindow.on('close', event => {
		if(!app.isQuiting) {
			event.preventDefault()
			mainWindow.hide();
		}
		return false;
	});

	tray.on('click', event => {
		if (mainWindow.isVisible()) {
			mainWindow.hide();
		}
		else {
			mainWindow.show();
		}
	});
});

app.on('window-all-closed', app.quit);//altrimenti al quit lascia i processi appesi-.-
