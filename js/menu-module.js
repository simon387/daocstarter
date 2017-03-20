const electron = require('electron');
const Menu = electron.Menu;
const opn = require('opn');
const {shell} = require('electron');
const db = require("./db-module.js");

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
					//TODO
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
				label: 'Check for update',
				click: () => {
					//TODO
				}
			},
			{
				label: 'About Daocstarter',
				click: () => {
					opn('https://github.com/simon387/daocstarter');
				}
			}
		]
	}
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
