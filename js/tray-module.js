'use strict'

const {Menu, Tray, BrowserWindow} = require('electron');
const db = require('./db-module.js');
const log = require('./log-module.js').getLog();
let _tray;
let _app;
let _mainWindow;

module.exports = {
	setup: (tray, app, mainWindow) => {
		return setTray(tray, app, mainWindow);
	},
	applySettings: () => {
		applySettings();
	}
}

const applySettings = () => {
	let minimizeToTray = false;
	let quitMinimizeToTray = false;
	db.settingDatastore.findOne({key: 'minimize.to.tray'}, (err, setting) => {
		minimizeToTray = setting.value;
		db.settingDatastore.findOne({key: 'quit.minimize.to.tray'}, (err, setting) => {
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
					event.preventDefault();
					_mainWindow.hide()
					_app.exit(0);
				});
			}
			
		});
	});

}

const setTray = (tray, app, mainWindow) => {
	try {
		tray = new Tray('resources\\app\\img\\i.ico');
	}
	catch(e) {
		try {
			tray = new Tray('img/i.ico');
		}
		catch(e) {
			log.warn('Sorry, no Tray Icon for you!')
		}
	}

	if (null != tray) {
		tray.setToolTip('Daocstarter!');
		tray.setContextMenu(Menu.buildFromTemplate([{
			label: 'Quit',
			click: () => {
				_app.exit(0);
			}
		}]));

		tray.on('click', event => {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			else {
				mainWindow.minimize();
			}
		});
		
		_tray = tray;
		_app = app;
		_mainWindow = mainWindow;
		applySettings();
		return tray;
	}
}
