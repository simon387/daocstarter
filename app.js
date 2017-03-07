"use strict";

const electron = require('electron');
const {app} = require('electron');
const path = require('path');
const {dialog} = require('electron');
//packager : http://mylifeforthecode.com/using-electron-packager-to-package-an-electron-app/

let db = require("./js/db-manager.js");
db.initDBandExpress();
//require('fs').unlinkSync('C:/electron/daocstarter/db/setting');

//http://www.codeblocq.com/2016/09/Set-Menu-Items-in-Electron/
const Menu = electron.Menu;
Menu.getApplicationMenu();
const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'About',
				click: () => {
					console.log('About Clicked');
				}
			}
		]
	}
];
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

electron.app.on('ready', function() {
	const url = require('url');
	const BrowserWindow = electron.BrowserWindow;
	let mainWindow = new BrowserWindow({
		width:1280,
		height:720,
		show:false,
		title:"DAoC Starter",
		icon:"img/i.ico"		
	});
	//mainWindow.loadURL('https://github.com');
	mainWindow.loadURL(url.format({
		pathname:path.join(__dirname, 'html', 'views', 'main.html'),
		protocol:'file',
		slashes:true
	}));
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	});
	//dev mode automatica
	//mainWindow.webContents.openDevTools();	
});
