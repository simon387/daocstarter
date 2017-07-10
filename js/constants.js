'use strict';

const fs = require('fs');
const path = require('path');
const {app} = require('electron');
const compiled_prefix = path.join('resources', 'app');

module.exports = {
	backupPath: path.join(app.getPath('userData'), 'backup'),
	pathToUserDat: 'path.to.user.dat',
	pathToGameDll: 'path.to.game.dll',
	quitMinimizeToTray: 'quit.minimize.to.tray',
	minimizeToTray: 'minimize.to.tray',
	customResolutionsCommaSeparated: 'custom.resolutions.comma.separated',
	defaultLoginDelayMilli: 'default.login.delay.milli',
	settingItemsPerPage: 'setting.items.per.page',
	accountItemsPerPage: 'account.items.per.page',
	teamItemsPerPage: 'team.items.per.page',
	characterItemsPerPage: 'character.items.per.page',
	typeBooleano: 'booleano',
	typeNumero: 'Numero',
	typeFile: 'File',
	typeStringa: 'Stringa',
	defaultPathToUserDat: app.getPath('appData').replace(/\\/g, '\\\\') + '\\\\Electronic Arts\\\\Dark Age of Camelot\\\\LotM\\\\user.dat',
	defaultPathToGameDll: 'C:\\\\Program Files (x86)\\\\Electronic Arts\\\\Dark Age of Camelot\\\\game.dll',
	defaultBaseResolutions: '1920x1080,800x600',
	defaultBaseResolutionsArray: ['1920x1200', '800x600'],
	playCSS: "class='btnX btn-primary btn-sm sr-button'",
	cancCSS: "class='sr-button btnX btn-primary btn-md btnX-delete'",
	editCSS: "class='sr-button btnX btn-md btn-successX'",
	asynchronousGetPort: 'asynchronous-get-port',
	asynchronousGetPortReply: 'asynchronous-reply-get-port',
	camelotExe: 'camelot.exe',
	camtestExe: 'camtest.exe',
	gameDll: 'game.dll',
	userDat: 'user.dat',
	psargs: 'ux',
	utf8: 'utf-8',
	updateHost: 'www.simonecelia.it',
	updatePath: '/daocstarter/version.html',
	githubReleases: 'https://github.com/simon387/daocstarter/releases',
	dbPath: path.join(app.getPath('userData'), 'db') + '/',
	ywain: 'Ywain',
	ywainIp: '107.23.173.143',
	ywainPort: '10622',
	albion: 'Albion',
	hibernia: 'Hibernia',
	midgard: 'Midgard',
	screenshotDir: path.join(app.getPath('documents'), 'Electronic Arts', 'Dark Age of Camelot'),
	daocstarterSettingsDir: app.getPath('userData'),
	ico: path.join('resources', 'app', 'img', 'i.ico'),
	icoCompiled: 'img/i.ico',
	getCharacterPerPage: 'asynchronous-get-character-per-page',
	getCharacterPerPageReply: 'asynchronous-reply-get-character-per-page',
	getAccountPerPage: 'asynchronous-get-account-per-page',
	getAccountPerPageReply: 'asynchronous-reply-get-account-per-page',
	getTeamPerPage: 'asynchronous-get-team-per-page',
	getTeamPerPageReply: 'asynchronous-reply-get-team-per-page',
	getSettingPerPage: 'asynchronous-get-setting-per-page',
	getSettingPerPageReply: 'asynchronous-reply-get-setting-per-page',
	setItemsPerPage: 'asynchronous-set-items-per-page',
	getAllFavouriteCharacters: 'getAllFavouriteCharacters',
	getAllFavouriteCharactersReply: 'getAllFavouriteCharacters-reply',
	saveFavouriteCoordinate: 'saveFavouriteCoordinate',
	killCharacter: 'killCharacter',
	playAccount: 'playAccount',
	killAccount: 'killAccount',
	editSettingNumber: 'editSettingNumber',
	editSettingNumberReply: 'editSettingNumber-reply',
	editSettingStringa: 'editSettingStringa',
	editSettingStringaReply: 'editSettingStringa-reply',
	saveSettingNumber: 'saveSettingNumber',
	saveSettingNumberReply: 'saveSettingNumber-reply',
	saveSettingStringa: 'saveSettingStringa',
	saveSettingStringaReply: 'saveSettingStringa-reply',
	saveTeam: 'saveTeam',
	saveTeamReply: 'saveTeam-reply',
	getAllChars: 'get-all-chars',
	getAllCharsReply: 'get-all-chars-reply',
	removeTeam: 'remove-team',
	removeTeamReply: 'remove-team-reply',
	error: 'Error',
	errorSameAccount: "You can't play characters from same account!",
	playCharacter: 'playCharacter',
	playTeamRow: 'playTeamRow',
	killTeamRow: 'killTeamRow',
	editTeam: 'editTeam',
	editTeamReply: 'editTeam-reply',
	importFromAppData: 'importFromAppData',
	errorUserDatNF: "User.dat not found!\nPlease edit the location from Setting section!",
	errorGameDllNF: "game.dll not found!\nPlease edit the location from Setting section!",
	importFromAppDataReply: 'importFromAppData-reply',
	editSettingBooleano: 'edit-setting-booleano',
	saveSettingBooleano: 'save-setting-booleano',
	setIniDefaultTemplate: 'set-ini-default-template',
	applyIniDefaultTemplate: 'apply-ini-default-template',
	spellcraftToolStart: 'spellcraft-tool-start',
	spellcraftToolStartReply: 'spellcraft-tool-start-reply',
	infoExpress: 'Express running in electron and listening on port',
	warnVGAModule: 'vga-module working only on windows',
	win32Platform: 'win32',
	vgaQuery: 'get-wmiobject -query "' +
		'select HorizontalResolution, VerticalResolution ' +
		'from CIM_VideoControllerResolution where HorizontalResolution > 799" | ' +
		'Sort-Object HorizontalResolution, VerticalResolution -descending | ' +
		'select HorizontalResolution, VerticalResolution',
	executionPolicy: 'Bypass',
	timestampFormat: 'DD/MM/YY HH:mm',
	errorAlreadyLoggedIn: 'The account is already logged in!',
	infoSpawnedChildPid: 'Spawned child pid:',
	doubleSlash: '\\',
	minus: '-',
	ini: '.ini',
	getSpellcrafters: 'get-spellcrafters',
	getSpellcraftersReply: 'get-spellcrafters-reply',
	spellcraftFormSubmitEvent: 'spellcraft-form-submit-event',
	spellcraftFormSubmitEventReply: 'spellcraft-form-submit-event-reply',

	handle_path: () => {
		const handle_path_dev = path.join('vendor', 'handle', 'handle.exe');
		if (fs.existsSync(handle_path_dev)) {
			return handle_path_dev;
		}
		else {
			return path.join(compiled_prefix, handle_path_dev);
		}
	},

	borderless_path: () => {
		const borderless_path_dev = path.join('autoit', 'borderless', 'borderless.exe');
		if (fs.existsSync(borderless_path_dev)) {
			return borderless_path_dev;
		}
		else {
			return path.join(compiled_prefix, borderless_path_dev);
		}
	},

	calgamma_path: () => {
		const calgamma_path_dev = path.join('autoit', 'calgamma', 'CALGamma.exe');
		if (fs.existsSync(calgamma_path_dev)) {
			return calgamma_path_dev;
		}
		else {
			return path.join(compiled_prefix, calgamma_path_dev);
		}
	},

	titlerenamer_path: () => {
		const titlerenamer_path_dev = path.join('autoit', 'titlerenamer', 'titlerenamer.exe');
		if (fs.existsSync(titlerenamer_path_dev)) {
			return titlerenamer_path_dev;
		}
		else {
			return path.join(compiled_prefix, titlerenamer_path_dev);
		}
	}
}
