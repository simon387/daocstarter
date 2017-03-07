"use strict";
const electron = require('electron');
require("./js/db-manager.js").initDB();
require("./js/express-manager.js").startExpress();
require("./js/menu-manager.js");

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
