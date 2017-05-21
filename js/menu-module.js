'use strict';

const electron = require('electron');
const Menu = electron.Menu;
const opn = require('opn');
const {shell} = require('electron');
const db = require('./db-module.js');
const {dialog} = require('electron');
const path = require('path');
const BrowserWindow = require('electron').BrowserWindow;
const handle = require('./handle-module.js');
const gamedll = require('./gamedll-module.js');
const fs = require('fs');
const child_process = require('child_process');
const {app} = require('electron');
const os = require('os');

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
				label: 'Patch client',
				click: () => {
					db.settingDatastore.findOne({key: 'path.to.game.dll'}, (err, gamedll) => {
						if (fs.existsSync(gamedll["value"])) {
							const exec = child_process.exec;
							const cmd = 'camelot.exe';
							const child = exec(
								cmd, {
									cwd: path.dirname(gamedll["value"]),
									setsid: false,
									detached: true,
								},
								(error, stdout, stderr) => {}
							);
						}
						else {
							dialog.showErrorBox("error", "camelot.exe not found!\nGo to settings and select the right game.dll");
						}
					});
				}
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
					shell.showItemInFolder(electron.app.getPath("documents") + "\\Electronic Arts\\Dark Age of Camelot\\.");
				}
			},
			{
				label: 'Open DAoC user setting directory',
				click: () => {
					db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
						if (fs.existsSync(userdat["value"])) {
							shell.showItemInFolder(userdat["value"]);
						}
						else {
							dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");
						}
					});
				}
			},
			{
				label: 'Edit user.dat',
				click: () => {
					db.settingDatastore.findOne({key: 'path.to.user.dat'}, (err, userdat) => {
						if (fs.existsSync(userdat["value"])) {
							shell.openItem(userdat["value"]);
						}
						else {
							dialog.showErrorBox("error", "User.dat not found!\nPlease edit the location from Setting section!");
						}
					});
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Open DAoCStarter user setting directory',
				click: () => {
					shell.openItem(app.getPath("userData"));
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Run CALGamma Tool',
				click: () => {
					const exec = child_process.exec;
					exec(os.tmpdir() + '\\CALGamma.exe', (err, so, se) => {});
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
				click: () => {
					db.characterDatastore.update({favourite: true}, {$set:{x: 40, y: 220}}, {returnUpdatedDocs: true, multi: true},
					(err, numAffected, affectedDocuments) => {
						if (numAffected > 0) {
							const win = BrowserWindow.getFocusedWindow();
							win.reload();
						}
					});
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
				label: 'sc.excidio.net',
				click: () => {
					opn('http://sc.excidio.net/charplaner/');
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
				label: 'DAoC discord channel',
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
