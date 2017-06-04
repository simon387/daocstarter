'use strict'

const {Menu, Tray} = require('electron');

module.exports = {
	setup: (tray, app, mainWindow) => {
		
	}
}

const setTray = () => {
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

		tray.on('click', event => {
			if (mainWindow.isVisible()) {
				mainWindow.hide();
			}
			else {
				mainWindow.show();
			}
		});
	}
}
