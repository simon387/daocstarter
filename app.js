"use strict";
const electron = require('electron');
require("./js/db-module.js").init();
require("./js/express-module.js").start();
require("./js/menu-module.js");

electron.app.on('ready', function() {
	const BrowserWindow = electron.BrowserWindow;
	let mainWindow = new BrowserWindow({
		width:1280,
		height:720,
		show:false,
		title:"DAoC Starter",
		icon:"img/i.ico"
	});
	mainWindow.loadURL(require('url').format({
		pathname:require('path').join(__dirname, 'html', 'views', 'main.html'),
		protocol:'file',
		slashes:true
	}));
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	});
	//mainWindow.webContents.openDevTools();//dev mode automatica	
});

electron.app.on('window-all-closed', electron.app.quit);//altrimenti al quit lascia dei processi appesi-.-
