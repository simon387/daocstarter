'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllTeams: () => {
		return new Promise(function(resolve, reject) {
			db.teamDatastore.find({}, (err, teams) => {
				let payload = new Object();
				payload.aaData = [];
				teams.forEach(team => {
					let row = [];
					row.push(team._id);
					row.push(util.playButton('Team', team._id) + ' ' +
						util.qtdButton('Team', team._id));
					row.push(team.name);
					row.push(util.editButton('Team', team._id) + ' ' + 
						util.deleteButton('Team', team._id));
					payload.aaData.push(row);
				});
				resolve(payload);
			});
		});
	},

	create: obj => {
		return new Promise(function(resolve, reject) {
			db.teamDatastore.insert({
				name: obj['team-name'],
				char0: obj['team-character0'] === undefined ? ' ' : obj['team-character0'],
				res0: obj['team-resolution0'],
				windowed0: obj['team-windowed0'] === undefined ? false : true,
				deelay0: obj['team-deelay0'],
				borderless0: obj['team-borderless0'] === undefined ? false : true,
				width0: obj['team-width0'],
				height0: obj['team-height0'],
				positionx0: obj['team-position-x0'],
				positiony0: obj['team-position-y0'],
				
				char1: obj['team-character1'] === undefined ? ' ' : obj['team-character1'],
				res1: obj['team-resolution1'],
				windowed1: obj['team-windowed1'] === undefined ? false : true,
				deelay1: obj['team-deelay1'],
				borderless1: obj['team-borderless1'] === undefined ? false : true,
				width1: obj['team-width1'],
				height1: obj['team-height1'],
				positionx1: obj['team-position-x1'],
				positiony1: obj['team-position-y1'],

				char2: obj['team-character2'] === undefined ? ' ' : obj['team-character2'],
				res2: obj['team-resolution2'],
				windowed2: obj['team-windowed2'] === undefined ? false : true,
				deelay2: obj['team-deelay2'],
				borderless2: obj['team-borderless2'] === undefined ? false : true,
				width2: obj['team-width2'],
				height2: obj['team-height2'],
				positionx2: obj['team-position-x2'],
				positiony2: obj['team-position-y2'],

				char3: obj['team-character3'] === undefined ? ' ' : obj['team-character3'],
				res3: obj['team-resolution3'],
				windowed3: obj['team-windowed3'] === undefined ? false : true,
				deelay3: obj['team-deelay3'],
				borderless3: obj['team-borderless3'] === undefined ? false : true,
				width3: obj['team-width3'],
				height3: obj['team-height3'],
				positionx3: obj['team-position-x3'],
				positiony3: obj['team-position-y3'],

				char4: obj['team-character4'] === undefined ? ' ' : obj['team-character4'],
				res4: obj['team-resolution4'],
				windowed4: obj['team-windowed4'] === undefined ? false : true,
				deelay4: obj['team-deelay4'],
				borderless4: obj['team-borderless4'] === undefined ? false : true,
				width4: obj['team-width4'],
				height4: obj['team-height4'],
				positionx4: obj['team-position-x4'],
				positiony4: obj['team-position-y4'],

				char5: obj['team-character5'] === undefined ? ' ' : obj['team-character5'],
				res5: obj['team-resolution5'],
				windowed5: obj['team-windowed5'] === undefined ? false : true,
				deelay5: obj['team-deelay5'],
				borderless5: obj['team-borderless5'] === undefined ? false : true,
				width5: obj['team-width5'],
				height5: obj['team-height5'],
				positionx5: obj['team-position-x5'],
				positiony5: obj['team-position-y5'],

				char6: obj['team-character6'] === undefined ? ' ' : obj['team-character6'],
				res6: obj['team-resolution6'],
				windowed6: obj['team-windowed6'] === undefined ? false : true,
				deelay6: obj['team-deelay6'],
				borderless6: obj['team-borderless6'] === undefined ? false : true,
				width6: obj['team-width6'],
				height6: obj['team-height6'],
				positionx6: obj['team-position-x6'],
				positiony6: obj['team-position-y6'],

				char7: obj['team-character7'] === undefined ? ' ' : obj['team-character7'],
				res7: obj['team-resolution7'],
				windowed7: obj['team-windowed7'] === undefined ? false : true,
				deelay7: obj['team-deelay7'],
				borderless7: obj['team-borderless7'] === undefined ? false : true,
				width7: obj['team-width7'],
				height7: obj['team-height7'],
				positionx7: obj['team-position-x7'],
				positiony7: obj['team-position-y7']
			}, (err, newTeam) => {
				resolve(newTeam);
			});
		});
	}
} 