'use strict';

const log = require('electron-log');

module.exports = {
	getLog: () => {
		log.transports.file.level = 'debug';
		return log;
	}
}
