'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const constants = require('./constants');
const settingCommonController = require('./controller/setting-common');

const patchClient = async isTest => {
	let exe = constants.camelotExe;
	if (isTest) {
		exe = constants.camtestExe;
	}
	let gamedll = await settingCommonController.findOneByKey(constants.pathToGameDll);
	if (fs.existsSync(gamedll.value)) {
		const exec = child_process.exec;
		const cmd = exe;
		const child = exec(
			cmd, {
				cwd: path.dirname(gamedll.value),
				setsid: false,
				detached: true,
			},
			(error, stdout, stderr) => {
				if (error) {
					log.error(error);
				}
			}
		);
	}
	else {
		dialog.showErrorBox(constants.error, constants.errorGameDllNF);
	}
}

module.exports = {patchClient};
