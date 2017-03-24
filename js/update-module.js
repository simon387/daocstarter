"use strict";

module.exports = {
	updateCheck: function () {
		let http = require('http');
		let options = {
			host: 'www.simonecelia.it',
			path: '/daocstarter/version.html'
		}
		let request = http.request(options, function (res) {
			let remoteVersion = '';
			res.on('data', function (chunk) {
				remoteVersion += chunk;
			});
			res.on('end', function () {
				//console.log(remoteVersion);
				const compareVersions = require('compare-versions');
				const pjson = require('../package.json');
				if (compareVersions(pjson.version, remoteVersion) < 0) {
					const opn = require('opn');
					const {dialog} = require('electron');
					let options = {
						type:"info",
						title:"Update available!",
						detail:"Version " + remoteVersion + " is available!\nThe GitHub webpage will be loaded for the download!"
					}
					opn('https://github.com/simon387/daocstarter/releases');
					dialog.showMessageBox(options)//[browserWindow, ]options[, callback]
					const electron = require('electron');
					electron.app.quit();
				}
			});
		});
		request.on('error', function (e) {
			console.log(e.message);
		});
		request.end();
	}
}
