'use strict';

const fs = require('fs');
const {app} = require('electron');
const compiled_prefix = 'resources\\app\\';
const borderless_path_dev = 'autoit\\borderless\\borderless.exe';
const borderless_path_compiled = compiled_prefix + borderless_path_dev;
const calgamma_path_dev = 'autoit\\calgamma\\CALGamma.exe';
const calgamma_path_compiled = compiled_prefix + calgamma_path_dev;
const titlerenamer_path_dev = 'autoit\\titlerenamer\\titlerenamer.exe';
const titlerenamer_path_compiled = compiled_prefix + titlerenamer_path_dev;

module.exports = {
	backupPath: app.getPath('userData') + '\\backup',
	userdatPath: 'path.to.user.dat',
	playCSS: "class='btnX btn-primary btn-sm sr-button'",
	cancCSS: "class='sr-button btnX btn-primary btn-md btnX-delete'",
	editCSS: "class='sr-button btnX btn-md btn-successX'",
	getAllFavouriteCharactersReply: 'getAllFavouriteCharacters-reply',
	asynchronousGetPort: 'asynchronous-get-port',
	asynchronousGetPortReply: 'asynchronous-reply-get-port',
	camelotExe: 'camelot.exe',
	camtestExe: 'camtest.exe',

	handle_path: () => {
		const handle_path_dev = 'vendor\\handle\\handle.exe';
		if (fs.existsSync(handle_path_compiled)) {
			return compiled_prefix + handle_path_dev;
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