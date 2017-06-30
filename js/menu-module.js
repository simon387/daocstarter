'use strict';

const fs = require('fs');
const path = require('path');
const opn = require('opn');
const {shell, dialog, BrowserWindow, Menu} = require('electron');
const handle = require('./handle-module.js');
const gamedll = require('./gamedll-module.js');
const child_process = require('child_process');
const constants = require('./constants.js');
const log = require('./log-module.js').getLog();
const settingController = require('./controller/setting.js');
const characterController = require('./controller/character.js');

Menu.getApplicationMenu();

const menuTemplate = [
	{
		label: 'Window',
		submenu: [
			{
				role: 'minimize'
			},
			{
				role: 'quit'
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				role: 'selectall'
			},
			{
				role: 'cut',
			},
			{
				role: 'copy',
			},
			{
				role: 'paste',
			},
			{
				role: 'delete'
			}
		]
	},
	{
		label: 'Client',
		submenu: [
			{
				label: 'Remove clients limiter',
				click: () => {
					handle.killMutants();
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Patch client',
				click: () => {
					gamedll.patchClient();
				}
			},
			{
				label: 'Patch client from test server',
				click: () => {
					gamedll.patchClient(true);
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Kill all clients',
				click: () => {
					gamedll.killAllClients();
				}
			}
		]
	},
	{
		label: 'Tools',
		submenu: [
			{
				label: 'Show DAoC screenshot directory',
				click: () => {
					shell.showItemInFolder(constants.screenshotDir);
				}
			},
			{
				label: 'Open DAoC user setting directory',
				click: async () => {
					let userdat = await settingController.readSettingByKey(constants.pathToUserDat);
					if (fs.existsSync(userdat.value)) {
						shell.showItemInFolder(userdat.value);
					}
					else {
						dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");
					}
				}
			},
			{
				label: 'Edit user.dat',
				click: async () => {
					let userdat = await settingController.readSettingByKey(constants.pathToUserDat);
					if (fs.existsSync(userdat.value)) {
						shell.openItem(userdat.value);
					}
					else {
						dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");
					}
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Open DAoCStarter user setting directory',
				click: () => {
					shell.openItem(constants.daocstarterSettingsDir);
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Run CALGamma Tool',
				click: () => {
					const exec = child_process.exec;
					exec(constants.calgamma_path(), (err, so, se) => {});
				}
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				role: 'zoomin'
			},
			{
				role: 'zoomout'
			},
			{
				role: 'resetzoom'
			},
			{
				role: 'togglefullscreen'
			},
			{
				type: 'separator'
			},
			{
				role: 'reload'
			},
			{
				role: 'forcereload'
			},
			{
				type: 'separator'
			},
			{
				label: 'Reset favourites positions',
				click: async () => {
					let numAffected = await characterController.resetAllFavouritesPositions();
					if (numAffected > 0) {
						const win = BrowserWindow.getFocusedWindow();
						win.reload();
					}
				}
			},
			{
				type: 'separator'
			},
			{
				role: 'toggledevtools'
			}
		]
	},
	{
		label: 'Links',
		submenu: [
			{
				label: 'darkageofcamelot.com',
				click: () => {
					opn('http://www.darkageofcamelot.com');
				}
			},
			{
				label: 'origin.com',
				click: () => {
					opn('https://www.origin.com/');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'craftsage.com',
				click: () => {
					opn('http://www.craftsage.com');
				}
			},
			{
				label: 'excidio.net/charplaner',
				click: () => {
					opn('http://www.excidio.net/charplaner/');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'sorcery.net',
				click: () => {
					opn('http://www.sorcery.net/index.php?option=com_wrapper&view=wrapper&Itemid=69');
				}
			},
			{
				label: 'DAoC YWAIN Discord channel',
				click: () => {
					opn('https://discord.gg/KwAGwYa');
				}
			},
		]
	},
	{
		label: '?',
		submenu: [
			{
				label: 'Report a BUG or suggestions',
				click: () => {
					opn('https://github.com/simon387/daocstarter/issues');
				}
			},
			{
				label: 'About DAoC Starter',
				click: () => {
					opn('https://github.com/simon387/daocstarter');
				}
			}
		]
	}
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
