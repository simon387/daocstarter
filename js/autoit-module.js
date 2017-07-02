'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const {dialog} = require('electron');
const constants = require('./constants.js');
const log = require('./log-module.js').getLog();
const exec = child_process.exec;

module.exports = {
	renameCharacterWindow: (prc, account, character) => {
		return new Promise(function(resolve, reject) {
			if (undefined != character.title && '' != character.title && prc.pid > 0) {
				return resolve(exec(constants.titlerenamer_path() + ' ' +
					prc.pid + ' "' + character.title + '"', (err, so, se) => {}));
			}
			else {
				if (undefined != account.title && '' != account.title && prc.pid > 0) {
					return resolve(exec(constants.titlerenamer_path() + ' ' + prc.pid +
						' "' + account.title + '"', (err, so, se) => {}));
				}
			}
			resolve();
		});
	},

	renameAccountWindow: (prc, account) => {
		return new Promise(function(resolve, reject) {
			if (undefined != account.title && '' != account.title && prc.pid > 0) {
				return resolve(exec(constants.titlerenamer_path() + ' ' + prc.pid +
					' "' + account.title + '"', (err, so, se) => {}));
			}
			resolve();
		});
	},

	applyBorderless: (apply, prc, width, height, positionX, positionY) => {
		return new Promise(function(resolve, reject) {
			if (true === apply) {
				try {
					if (undefined === width || width < 800) {
						width = xy[0];
					}
					if (undefined === height || height < 600) {
						height = xy[1];
					}
				}
				catch (e) {
					log.error(e);
					width = 800;
					height = 600;
				}
				if (positionX === undefined || positionX === '') {
					positionX = 0;
				}
				if (positionY === undefined || positionY === '') {
					positionY = 0;
				}
				return resolve(exec(constants.borderless_path() + ' ' + prc.pid + ' ' +
					width + ' ' + height + ' ' + positionX + ' ' + positionY,
					(err, so, se) => {}));
			}
			resolve();
		});
	}
}
