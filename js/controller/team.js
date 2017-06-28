'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllTeams: response => {
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
			response.send(payload);
		});
	}
}