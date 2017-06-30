'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllTeamsForDT: () => {
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

	findOne: id => {
		return new Promise(function(resolve, reject) {
			db.teamDatastore.findOne({_id: id}, (err, team) => {
				resolve(team);
			});
		});
	},

	remove: id => {
		return new Promise(function(resolve, reject) {
			db.teamDatastore.remove({_id: id}, {multi: false}, (err, numRemoved) => {
				resolve(numRemoved);
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
	},

	update: (id, name, team) => {
		return new Promise(function(resolve, reject) {
			db.teamDatastore.update({_id: id}, {$set: {
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
				resolve(numAffected);
				if (err) {
					log.error(err);
				}
			});
		});
	}
} 