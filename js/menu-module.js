const electron = require('electron');
const Menu = electron.Menu;
const opn = require('opn');
const {shell} = require('electron');
const db = require("./db-module.js");
const update = require("./update-module.js");
const {dialog} = require('electron');

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
