'use strict'

const {Menu, Tray, BrowserWindow} = require('electron');
const log = require('./log-module').getLog();
const settingCommonController = require('./controller/setting-common');
const constants = require('./constants');
let _tray = null;
let _app;
let _mainWindow;

const setup = (app, mainWindow) => {
	setTray(app, mainWindow);
}

const applySettings = async () => {
	let minimizeToTray = false;
	let quitMinimizeToTray = false;
	let setting = await settingCommonController.findOneByKey(constants.minimizeToTray);
	minimizeToTray = setting.value;
	setting = await	settingCommonController.findOneByKey(constants.quitMinimizeToTray);
	quitMinimizeToTray = setting.value;
	if (minimizeToTray) {
		_mainWindow.on('minimize', event => {
			event.preventDefault()
			_mainWindow.hide();
		});

		_mainWindow.on('restore', event => {
			event.preventDefault()
			_mainWindow.show();
			_mainWindow.restore();
		});

	}
	else {
		_mainWindow.on('minimize', event => {
			event.preventDefault();
			_mainWindow.minimize();
		});

		_mainWindow.on('restore', event => {
			event.preventDefault();

		});
	}

	if (quitMinimizeToTray) {
		_mainWindow.removeAllListeners('close');

		_mainWindow.on('close', event => {
			event.preventDefault();
			_mainWindow.minimize();
		});

	}
	else {
		_mainWindow.on('close', event => {
			try {
				event.preventDefault();
				_mainWindow.hide()
				_app.exit(0);
			}
			catch(e) {
				log.error(e);
			}
		});
	}
}

const setTray = (app, mainWindow) => {
	try {
		_tray = new Tray(constants.icoCompiled);
	}
	catch(e) {
		try {
			_tray = new Tray(constants.ico);
		}
		catch(e) {
			log.warn('Sorry, no Tray Icon for you!')
		}
	}

	if (null != _tray) {
		_tray.setToolTip('Daocstarter!');
		_tray.setContextMenu(Menu.buildFromTemplate([{
			label: 'Quit',
			click: () => {
				_app.exit(0);
			}
		}]));

		_tray.on('click', event => {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			else {
				mainWindow.minimize();
			}
		});

		_app = app;
		_mainWindow = mainWindow;
		applySettings();
	}
}

module.exports = {setup, applySettings};
