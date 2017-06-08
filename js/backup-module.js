'use strict';

const fs = require('fs');
const path = require('path');
const {app} = require('electron');
const log = require('electron-log');
const backupPath = app.getPath('userData') + '\\backup';
log.transports.file.level = 'debug';

module.exports = {
	backupFile: inputFile => {

		if (!fs.existsSync(inputFile)) {
			log.error('file ' + inputFile + ' does not exists! backup failed');
			return;
		}

		if (!fs.existsSync(backupPath)){
			fs.mkdirSync(backupPath);
		}

		let outputFile = backupPath + '\\' + path.basename(inputFile);
		let i = 0;

		while (fs.existsSync(outputFile + '_bck_' + i)) {
			i++;
		}
		outputFile = outputFile + '_bck_' + i;

		try {
			fs.createReadStream(inputFile).pipe(fs.createWriteStream(outputFile));
		}
		catch(e) {
			log.error(e);
		}
	}

}