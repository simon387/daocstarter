'use strict';

const https = require('https');
const compareVersions = require('compare-versions');
const opn = require('opn');
const {app, dialog} = require('electron');
const log = require('./log-module').getLog();
const constants = require('./constants');

const updateCheck = () => {
	const opts = {
		host: constants.updateHost,
		path: constants.updatePath
	}
	let request = https.get(opts, res => {
		let remoteVersion = '';
		res.on('data', chunk => {
			remoteVersion += chunk;
		});
		res.on('end', () => {
			if (compareVersions(app.getVersion(), remoteVersion.trim(), '>')) {
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
	request.end();
}

module.exports = {updateCheck};
