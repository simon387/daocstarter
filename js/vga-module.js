'use strict';

const os = require('os');
const shell = require('node-powershell');
const constants = require('./constants');
const log = require('./log-module').getLog();
const settingCommonController = require('./controller/setting-common');

const getAllResolutions = () => {
	return new Promise(async function(resolve, reject) {
		if (os.platform() != constants.win32Platform) {
			log.warn(constants.warnVGAModule);
			return resolve (constants.defaultBaseResolutionsArray);
		}
		let setting = await settingCommonController.findOneByKey(constants.customResolutionsCommaSeparated);
		const array = setting.value.split(',');
		let ps;
		try{
			ps = new shell({executionPolicy: constants.executionPolicy, debugMsg: false, noProfile: true});
			ps.addCommand(constants.vgaQuery)
			.then(() => {
				return ps.invoke();
			})
			.then(output => {
				if ('' == output) {
					if (array.length != 0) {
						return resolve(array);
					}
					else {
						return resolve(constants.defaultBaseResolutionsArray);
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
						return resolve(constants.defaultBaseResolutionsArray);
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

module.exports = {getAllResolutions};
