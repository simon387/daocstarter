'use strict';

const fs = require('fs');
const {app} = require('electron');
const userData = app.getPath('userData');
const handle_path_compiled = 'resources\\app\\handle\\handle.exe';
const handle_path_dev = 'handle\\handle.exe';
const borderless_path_compiled = 'resources\\app\\borderless\\borderless.exe';
const borderless_path_dev = 'borderless\\borderless.exe';
const calgamma_path_compiled = 'resources\\app\\calgamma\\CALGamma.exe';
const calgamma_path_dev = 'calgamma\\CALGamma.exe';
const titlerenamer_path_compiled = 'resources\\app\\titlerenamer\\titlerenamer.exe';
const titlerenamer_path_dev = 'titlerenamer\\titlerenamer.exe';

module.exports = {
	backupPath: () => {
		return userData + '\\backup';
	},

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