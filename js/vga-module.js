'use strict';

const os = require('os');
const shell = require('node-powershell');
const db = require('./db-module.js');

module.exports = {
	getAllResolutions: response => {
		
		db.settingDatastore.findOne({key: 'custom.resolutions.comma.separated'}, (err, setting) => {
			const array = setting.value.split(',');
			let ps;
			try{
				ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
					ps.addCommand('get-wmiobject -query "' +
				'select HorizontalResolution, VerticalResolution ' +
				'from CIM_VideoControllerResolution where HorizontalResolution > 799" | ' +
				'Sort-Object HorizontalResolution, VerticalResolution -descending | ' +
				'select HorizontalResolution, VerticalResolution')
				.then(() => {
					return ps.invoke();
				})
				.then(output => {
					if ('' == output) {
						if (array.length != 0) {
							return response.send(array);
						}
						else {
							return response.send(['1920x1200', '800x600']);
						}
					}
					let str = output.replace(/[\n\r]/g, '').replace(/\ +/g, 'x');
					let regexp = /\d+x+\d+/g;
					let match;
					let matches = new Set();
					while ((match = regexp.exec(str)) != null) {
						matches.add(match[0]);
					}
					ps.dispose();
					if (0 == matches.length) {
						if (array.length != 0) {
							return response.send(array);
						}
						else {
							return response.send(['1920x1200', '800x600']);
						}
					}
					else {
						return response.send(Array.from(matches));
					}
				})
				.catch(err => {
					ps.dispose();
					return response.send(array);
				});
			}
			catch(e) {
				console.log(e);
				return response.send(array);
			}
		});
	}
};
