'use strict';

const http = require('http');
const compareVersions = require('compare-versions');
const opn = require('opn');
const {app, dialog} = require('electron');
const log = require('./log-module.js').getLog();
const constants = require('./constants.js');

const updateCheck = () => {
	const opts = {
		host: constants.updateHost,
		path: constants.updatePath
	}
	let request = http.request(opts, res => {
		let remoteVersion = '';
		res.on('data', chunk => {
			remoteVersion += chunk;
		});
		res.on('end', () => {
			if (compareVersions(app.getVersion(), remoteVersion) < 0) {
				const options = {
					type: constants.info,
					title: constants.titleupdateAvailable,
					detail: 'Version ' + remoteVersion + ' is available!\nThe GitHub webpage will be loaded for the download!'
				}
				opn(constants.githubReleases);
				dialog.showMessageBox(options)//[browserWindow, ]options[, callback]
				app.quit();
			}
		});
	});
	request.on('error', error => {
		log.error(error.message);
	});
	request.end();
}

module.exports = {updateCheck};
