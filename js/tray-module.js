'use strict'

const {Menu, Tray} = require('electron');
const db = require('./db-module.js');
let _tray;
let _app;
let _mainWindow;

module.exports = {
	setup: (tray, app, mainWindow) => {
		setTray(tray, app, mainWindow);
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

				_tray.on('click', event => {
					if (_mainWindow.isVisible()) {
						_mainWindow.hide();
					}
					else {
						_mainWindow.show();
					}
				})

			}
			if (quitMinimizeToTray) {
				_mainWindow.on('close', event => {
					_mainWindow.hide();
				});
			}
		});
	});

}

const setTray = (tray, app) => {
	_tray = tray;
	_app = app;
	_mainWindow = mainWindow;
	try {
		tray = new Tray('resources\\app\\img\\i.ico');
	}
	catch(e) {
		try {
			tray = new Tray('img/i.ico');
		}
		catch(e) {
			console.log('Sorry, no Tray Icon for you!')
		}
	}

	if (null != tray) {
		tray.setToolTip('Daocstarter!');
		tray.setContextMenu(Menu.buildFromTemplate([{
			label: 'Quit',
			click: () => {
				app.isQuiting = true;
				app.quit();
			}
		}]));
/*
		tray.on('click', event => {
			if (mainWindow.isVisible()) {
				mainWindow.hide();
			}
			else {
				mainWindow.show();
			}
		});*/
		applySettings();
	}
}
