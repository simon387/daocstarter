"use strict";
const electron = require('electron');
const Menu = electron.Menu;
const opn = require('opn');
const {shell} = require('electron');
const db = require("./db-module.js");
const {dialog} = require('electron');
const path = require('path');

Menu.getApplicationMenu();

const menuTemplate = [
	{
		label: 'Tools',
		submenu: [
			{
				label: 'Show screenshot directory',
				click: () => {
					shell.showItemInFolder(electron.app.getPath("documents") + "\\Electronic Arts\\Dark Age of Camelot\\.");
				}
			},
			{
				label: 'Open user setting directory',
				click: () => {
					db.settingDatastore.findOne({_id:"2"}, function(err, doc) {
						if (!require('fs').existsSync(doc["value"])) {
							dialog.showErrorBox("error", "User.dat not found!");
						}
						let	userdat = doc;
						shell.showItemInFolder(userdat["value"]);
					});
				}
			},
			{
				label: 'Edit user.dat',
				click: () => {
					db.settingDatastore.findOne({_id:"2"}, function(err, doc) {
						if (!require('fs').existsSync(doc["value"])) {
							dialog.showErrorBox("error", "User.dat not found!");
						}
						let	userdat = doc;
						shell.openItem(userdat["value"]);
					});
				}
			},
			{
				label: 'Remove clients limiter',
				click: () => {
					require("./handle-module.js").killMutants();
				}
			},
			{
				label: 'Patch client',
				click: () => {
					db.settingDatastore.findOne({_id:"1"}, function(err, gamedll) {
						if (!require('fs').existsSync(gamedll["value"])) {
							dialog.showErrorBox("error", "camelot.exe not found!");
						} else {
							let exec = require('child_process').exec;
							let cmd = 'camelot.exe';
							let child = exec(
								cmd, {
									cwd: path.dirname(gamedll["value"]),
									setsid:false,
									detached:true,
								},
								function(error, stdout, stderr) {
									if (error === null) {
										console.log('success');
									} else {
										console.log('error');
									}
								}
							);
						}
					});
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
					db.characterDatastore.update({favourite:true},
					{$set:{x:40,y:440}}, {returnUpdatedDocs:true,multi:true},
					function(err, numAffected, affectedDocuments){
						if (numAffected > 0) {
							const BrowserWindow = require('electron').BrowserWindow;
							let win = BrowserWindow.getFocusedWindow();
							win.reload();
						}
					});
				}
			}
		]
	},
	{
		label: '?',
		submenu: [
			{
				label: 'About DAoC Starter',
				click: () => {
					opn('https://github.com/simon387/daocstarter');
				}
			}
		]
	}
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
