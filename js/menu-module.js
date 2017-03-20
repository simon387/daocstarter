const electron = require('electron');
const Menu = electron.Menu;
const opn = require('opn');
const {shell} = require('electron');
const db = require("./db-module.js");
const update = require("./update-module.js");

Menu.getApplicationMenu();

const menuTemplate = [
	{
		label: 'Tools',
		submenu: [
			{
				label: 'Show screenshot directory',
				click: () => {
					//TODO
					shell.showItemInFolder('/home/scelia/Scaricati');
				}
			},
			{
				label: 'Open user setting directory',
				click: () => {
					//TODO
					shell.showItemInFolder('/home/scelia/Scaricati');
				}
			},
			{
				label: 'Edit user.dat',
				click: () => {
					db.settingDatastore.findOne({_id:"2"}, function(err, doc) {//cerco l'user.dat
						if (!require('fs').existsSync(doc["value"])) {
							dialog.showErrorBox("error", "User.dat not found!");
						}
						let	userdat = doc;
						shell.openItem(userdat["value"]);
					});
				}
			},
			{
				label: 'Remove client limiter',
				click: () => {
					//TODO
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
