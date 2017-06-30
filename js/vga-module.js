'use strict';

const os = require('os');
const shell = require('node-powershell');
const constants = require('./constants.js');
const log = require('./log-module.js').getLog();
const settingController = require('./controller/setting.js');

module.exports = {
	getAllResolutions: () => {
		
		return new Promise(async function(resolve, reject) {

			if (os.platform() != 'win32') {
				log.warn('Per ora il modulo vga-module funziona solo su windows');
				return resolve (["4096×2160"]);
			}

			let setting = await settingController.findOneByKey(constants.customResolutionsCommaSeparated);
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
							return resolve(array);
						}
						else {
							return resolve(['1920x1200', '800x600']);
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
							return resolve(array);
						}
						else {
							return resolve(['1920x1200', '800x600']);
						}
					}
					else {
						return resolve(Array.from(matches));
					}
				})
				.catch(err => {
					ps.dispose();
					log.error(err);
					return resolve(array);
				});
			}
			catch(e) {
				log.error(e);
				return resolve(array);
			}
		});
	}
};
