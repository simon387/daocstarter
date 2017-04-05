"use strict";

const electron = require('electron');
const Menu = electron.Menu;
const opn = require('opn');
const {shell} = require('electron');
const db = require("./db-module.js");
const {dialog} = require('electron');
const path = require('path');
const BrowserWindow = require('electron').BrowserWindow;
const handle = require("./handle-module.js");
const gamedll = require("./gamedll-module.js");
const fs = require('fs');
const child_process = require('child_process');
const {app} = require('electron');

Menu.getApplicationMenu();

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Exit',
				click: () => {
					electron.app.quit();
				}
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
					db.settingDatastore.findOne({_id:"1"}, (err, gamedll) => {
						if (fs.existsSync(gamedll["value"])) {
							const exec = child_process.exec;
							const cmd = 'camelot.exe';
							const child = exec(
								cmd, {
									cwd: path.dirname(gamedll["value"]),
									setsid:false,
									detached:true,
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
					db.settingDatastore.findOne({_id:"2"}, (err, userdat) => {
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
					db.settingDatastore.findOne({_id:"2"}, (err, userdat) => {
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
				label: 'Open DAoCStarter user setting directory',
				click: () => {
					shell.openItem(app.getPath("userData"));
				}
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Reset favourites positions',
				click: () => {
					db.characterDatastore.update({favourite:true}, {$set:{x:40, y:440}}, {returnUpdatedDocs:true, multi:true},
					(err, numAffected, affectedDocuments) => {
						if (numAffected > 0) {
							const win = BrowserWindow.getFocusedWindow();
							win.reload();
						}
					});
				}
			},
			{
				label: 'Toggle Develop Tools',
				click: () => {
					const win = BrowserWindow.getFocusedWindow();
					win.toggleDevTools();
				}
			}
		]
	},
	{
		label: '?',
		submenu: [
			{
				label: 'Report a BUG',
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
