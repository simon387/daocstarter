'use strict';

const http = require('http');
const compareVersions = require('compare-versions');
const opn = require('opn');
const {app, dialog} = require('electron');
const log = require('./log-module.js').getLog();

module.exports = {
	updateCheck: () => {
		const opts = {
			host: 'www.simonecelia.it',
			path: '/daocstarter/version.html'
		}
		let request = http.request(opts, res => {
			let remoteVersion = '';
			res.on('data', chunk => {
				remoteVersion += chunk;
			});
			res.on('end', () => {
				if (compareVersions(app.getVersion(), remoteVersion) < 0) {
					const options = {
						type: 'info',
						title: 'Update available!',
						detail: 'Version ' + remoteVersion + ' is available!\nThe GitHub webpage will be loaded for the download!'
					}
					opn('https://github.com/simon387/daocstarter/releases');
					dialog.showMessageBox(options)//[browserWindow, ]options[, callback]
					electron.app.quit();
				}
			});
		});
		request.on('error', error => {
			log.error(error.message);
		});
		request.end();
	}
}
