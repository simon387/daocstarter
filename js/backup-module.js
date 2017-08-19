'use strict';

const fs = require('fs');
const path = require('path');
const log = require('./log-module').getLog();
const constants = require('./constants');

const backupUserDat = userdat => {
	return new Promise(function(resolve, reject) {
		resolve(backupFile(userdat.value));
	});
}

const backupCharacter = (fullIniName) => {
	return new Promise(function(resolve, reject) {
		resolve(backupFile(fullIniName));
	});
}

const backupFile = inputFile => {
	if (!fs.existsSync(inputFile)) {
		log.error('file', inputFile, 'does not exists! backup failed');
		return;
	}

	if (!fs.existsSync(constants.backupPath)){
		fs.mkdirSync(constants.backupPath);
	}

	let outputFile = path.join(constants.backupPath, path.basename(inputFile));
	let i = 0;

	while (fs.existsSync(outputFile + '_backup_' + i)) {
		i++;
	}
	outputFile = outputFile + '_backup_' + i;

	try {
		fs.createReadStream(inputFile).pipe(fs.createWriteStream(outputFile));
		log.info('Backuped', outputFile)
	}
	catch(e) {
		log.error(e);
	}
}

module.exports = {backupUserDat, backupCharacter};
