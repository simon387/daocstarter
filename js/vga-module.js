'use strict';

const os = require('os');
const shell = require('node-powershell');
const db = require('./db-module.js');

module.exports = {
	getAllResolutions: response => {
		if (os.platform() != 'win32') {
			return response.send(["4096×2160"]);
		}
		let ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
		ps.addCommand('get-wmiobject -query "' +
		'select HorizontalResolution, VerticalResolution ' +
		'from CIM_VideoControllerResolution" | ' +
		'Sort-Object HorizontalResolution, VerticalResolution -descending | ' +
		'select HorizontalResolution, VerticalResolution')
		.then(() => {
			return ps.invoke();
		})
		.then(output => {
			let str = output.replace(/[\n\r]/g, '').replace(/\ +/g, 'x');
			let regexp = /\d+x+\d+/g;
			let match;
			let matches = new Set();
			while ((match = regexp.exec(str)) != null) {
				matches.add(match[0]);
			}
			ps.dispose();
			if (0 == matches.length) {
				db.settingDatastore.findOne({key: 'custom.resolutions.comma.separated'}, (err, doc) => {
					const array = doc.value.split(',');
					if (array.length != 0) {
						response.send(array)
					}
					else {
						response.send(['1920x1200', '800x600']);
					}
				});
			}
			else {
				response.send(Array.from(matches));
			}
		})
		.catch(err => {
			ps.dispose();
		});
	}
};
