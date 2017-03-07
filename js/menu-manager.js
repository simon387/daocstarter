const electron = require('electron');
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