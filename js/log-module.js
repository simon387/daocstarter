'use strict';

const log = require('electron-log');

const getLog = () => {
	log.transports.file.level = 'debug';
	return log;
}

module.exports = {getLog};
