'use strict';

const {ipcMain} = require('electron');
const db = require('./db-module.js');
const accountController = require('./controller/account.js');
const gamedll = require('./gamedll-module.js');
const {dialog} = require('electron');

ipcMain.on('asynchronous-get-character-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-character-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-get-account-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-account-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-get-team-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-team-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-get-setting-per-page', (event, item) => {
	db.settingDatastore.findOne({key: item}, (err, doc) => {
		event.sender.send('asynchronous-reply-get-setting-per-page', doc.value);
	});
});

ipcMain.on('asynchronous-set-items-per-page', (event, key, value) => {
	db.settingDatastore.update(
		{key: key},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
	});
});

ipcMain.on('getAllFavouriteCharacters', event => {
	db.characterDatastore.find({favourite: true}, (err, docs) => {
		event.sender.send('getAllFavouriteCharacters-reply', docs);
	});
});

ipcMain.on('saveFavouriteCoordinate', (event, id, left, top) => {
	db.characterDatastore.update(
		{_id: id},
		{$set: {x: left, y: top}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
	});
});

ipcMain.on('killCharacter', (event, id) => {
	gamedll.killCharacter(id);
});

ipcMain.on('playAccount', (event, id) => {
	gamedll.playAccount(id);
});

ipcMain.on('killAccount', (event, id) => {
	gamedll.killAccount(id);
});

ipcMain.on('editSettingNumber', (event, id) => {
	db.settingDatastore.findOne({_id: id}, (err, setting) => {
		event.sender.send('editSettingNumber-reply', setting, id);
	});
});

ipcMain.on('editSettingStringa', (event, id) => {
	db.settingDatastore.findOne({_id: id}, (err, setting) => {
		event.sender.send('editSettingStringa-reply', setting, id);
	});
});

ipcMain.on('saveSettingNumber', (event, id, value) => {
	db.settingDatastore.update(
		{_id: id},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveSettingNumber-reply');
	});
});

ipcMain.on('saveSettingStringa', (event, id, value) => {
	db.settingDatastore.update(
		{_id: id},
		{$set: {value: value}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveSettingStringa-reply');
	});
});

ipcMain.on('saveTeam', (event, id, name, team) => {

	db.teamDatastore.update(
		{_id: id},
		{$set: {
			name: name,

			char0: team['team0'][0],
			res0: team['team0'][1],
			windowed0: team['team0'][2] === undefined ? false : team['team0'][2],
			deelay0: team['team0'][3],
			borderless0: team['team0'][4] === undefined ? false : team['team0'][4],
			width0: team['team0'][5],
			height0: team['team0'][6],
			positionx0: team['team0'][7],
			positiony0: team['team0'][8],

			char1: team['team1'][0],
			res1: team['team1'][1],
			windowed1: team['team1'][2] === undefined ? false : team['team1'][2],
			deelay1: team['team1'][3],
			borderless1: team['team1'][4] === undefined ? false : team['team1'][4],
			width1: team['team1'][5],
			height1: team['team1'][6],
			positionx1: team['team1'][7],
			positiony1: team['team1'][8],

			char2: team['team2'][0],
			res2: team['team2'][1],
			windowed2: team['team2'][2] === undefined ? false : team['team2'][2],
			deelay2: team['team2'][3],
			borderless2: team['team2'][4] === undefined ? false : team['team2'][4],
			width2: team['team2'][5],
			height2: team['team2'][6],
			positionx2: team['team2'][7],
			positiony2: team['team2'][8],

			char3: team['team3'][0],
			res3: team['team3'][1],
			windowed3: team['team3'][2] === undefined ? false : team['team3'][2],
			deelay3: team['team3'][3],
			borderless3: team['team3'][4] === undefined ? false : team['team3'][4],
			width3: team['team3'][5],
			height3: team['team3'][6],
			positionx3: team['team3'][7],
			positiony3: team['team3'][8],

			char4: team['team4'][0],
			res4: team['team4'][1],
			windowed4: team['team4'][2] === undefined ? false : team['team4'][2],
			deelay4: team['team4'][3],
			borderless4: team['team4'][4] === undefined ? false : team['team4'][4],
			width4: team['team4'][5],
			height4: team['team4'][6],
			positionx4: team['team4'][7],
			positiony4: team['team4'][8],


			char5: team['team5'][0],
			res5: team['team5'][1],
			windowed5: team['team5'][2] === undefined ? false : team['team5'][2],
			deelay5: team['team5'][3],
			borderless5: team['team5'][4] === undefined ? false : team['team5'][4],
			width5: team['team5'][5],
			height5: team['team5'][6],
			positionx5: team['team5'][7],
			positiony5: team['team5'][8],

			char6: team['team6'][0],
			res6: team['team6'][1],
			windowed6: team['team6'][2] === undefined ? false : team['team6'][2],
			deelay6: team['team6'][3],
			borderless6: team['team6'][4] === undefined ? false : team['team6'][4],
			width6: team['team6'][5],
			height6: team['team6'][6],
			positionx6: team['team6'][7],
			positiony6: team['team6'][8],

			char7: team['team7'][0],
			res7: team['team7'][1],
			windowed7: team['team7'][2] === undefined ? false : team['team7'][2],
			deelay7: team['team7'][3],
			borderless7: team['team7'][4] === undefined ? false : team['team7'][4],
			width7: team['team7'][5],
			height7: team['team7'][6],
			positionx7: team['team7'][7],
			positiony7: team['team7'][8]

		}},
		{returnUpdatedDocs: true, multi: false},
		(err, numAffected, affectedDocuments) => {
			event.sender.send('saveTeam-reply');
	});
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

ipcMain.on('get-all-chars', event => {
	db.characterDatastore.find({}, (err, docs) => {
		event.sender.send('get-all-chars-reply', docs);
	});
});

ipcMain.on('remove-team', (event, id) => {
	db.teamDatastore.remove({_id: id}, {multi: false}, (err, numRemoved) => {
		event.sender.send('remove-team-reply');
	});
});

ipcMain.on('playCharacter', (event, charArrayID) => {
	let accountSet = new Set();
	let accountArray;
	db.settingDatastore.findOne({key: 'default.login.delay.milli'}, (err, setting) => {
		db.characterDatastore.find({_id: {$in: charArrayID}}, async (err, characters) => {
			for (let character of characters) {
				accountSet.add(character.account);
			}
			accountArray = Array.from(accountSet);
			if (accountArray.length == charArrayID.length) {
				for (let id of charArrayID) {
					gamedll.playCharacter(id);
					await sleep(setting.value);
				}
			}
			else {
				dialog.showErrorBox('Error', "You can't play characters from same account!");
			}
		});
	});
});

ipcMain.on('playTeamRow', (event, id) => {
	let accountSet = new Set();
	let accountArray;
	let charArrayName = [];
	db.teamDatastore.findOne({_id: id}, (err, team) => {
		for (let i = 0; i <= 7; i++) {
			if (team['char' + i] != undefined && team['char' + i] != ' ') {
				charArrayName.push(team['char' + i]);
			}
		}

		db.characterDatastore.find({name: {$in: charArrayName}}, async (err, characters) => {
			for (let character of characters) {
				accountSet.add(character.account);
			}
			accountArray = Array.from(accountSet);

			if (accountArray.length == charArrayName.length) {
				for (let i = 0; i <= 7; i++) {
					if (team['char' + i] != undefined && team['char' + i] != ' ') {
						gamedll.playCharacterFromTeam(
							team['char' + i],
							team['res' + i],
							team['windowed' + i],
							team['borderless' + i],
							team['width' + i],
							team['positionx' + i],
							team['positiony' + i]);
						await sleep(team['deelay' + i]);
					}
				}
			}
			else {
				dialog.showErrorBox('Error', "You can't play characters from same account!");
			}
		});
	});
});

ipcMain.on('killTeamRow', (event, id) => {
	gamedll.killTeam(id);
});

ipcMain.on('editTeam', (event, id) => {
	db.teamDatastore.findOne({_id: id}, (err, team) => {
		event.sender.send('editTeam-reply', team, id);
	});
});
