'use strict';

const fs = require('fs');
const {app} = require('electron');
const userData = app.getPath('userData');
const backupDir = '\\backup';
const handle_path_compiled = 'resources\\app\\vendor\\handle\\handle.exe';
const handle_path_dev = 'vendor\\handle\\handle.exe';
const borderless_path_compiled = 'resources\\app\\autoit\\borderless\\borderless.exe';
const borderless_path_dev = 'autoit\\borderless\\borderless.exe';
const calgamma_path_compiled = 'resources\\app\\autoit\\calgamma\\CALGamma.exe';
const calgamma_path_dev = 'autoit\\calgamma\\CALGamma.exe';
const titlerenamer_path_compiled = 'resources\\app\\autoit\\titlerenamer\\titlerenamer.exe';
const titlerenamer_path_dev = 'autoit\\titlerenamer\\titlerenamer.exe';

module.exports = {
	backupPath: userData + backupDir,

	handle_path: () => {
		if (fs.existsSync(handle_path_compiled)) {
			return handle_path_compiled;
		}
		else {
			return handle_path_dev;
		}
	},

	borderless_path: () => {
		if (fs.existsSync(borderless_path_compiled)) {
			return borderless_path_compiled;
		}
		else {
			return borderless_path_dev;
		}
	},

	calgamma_path: () => {
		if (fs.existsSync(calgamma_path_compiled)) {
			return calgamma_path_compiled;
		}
		else {
			return calgamma_path_dev;
		}
	},

	titlerenamer_path: () => {
		if (fs.existsSync(titlerenamer_path_compiled)) {
			return titlerenamer_path_compiled;
		}
		else {
			return titlerenamer_path_dev;
		}
	}
}