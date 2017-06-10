'use strict';

const fs = require('fs');
const path = require('path');
const log = require('electron-log');
const constants = require('./constants.js');
log.transports.file.level = 'debug';

module.exports = {
	backupFile: inputFile => {

		if (!fs.existsSync(inputFile)) {
			log.error('file ' + inputFile + ' does not exists! backup failed');
			return;
		}

		if (!fs.existsSync(constants.backupPath())){
			fs.mkdirSync(constants.backupPath());
		}

		let outputFile = constants.backupPath() + '\\' + path.basename(inputFile);
		let i = 0;

		while (fs.existsSync(outputFile + '_backup_' + i)) {
			i++;
		}
		outputFile = outputFile + '_backup_' + i;

		try {
			fs.createReadStream(inputFile).pipe(fs.createWriteStream(outputFile));
			log.info('Backuped ' + outputFile)
		}
		catch(e) {
			log.error(e);
		}
	}

}