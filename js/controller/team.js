'use strict';

const util = require('./common-util.js');
const db = require('../db-module.js');

module.exports = {
	getAllTeams: response => {
		db.teamDatastore.find({}, (err, docs) => {
			let ret = '{"aaData":[';
			docs.forEach(team => {
				ret += '["' + team._id + '","' +
				util.playButton('Team', team._id) + ' ' +
				util.qtdButton('Team', team._id) + '","' +
				team.name + '","' +
				util.editButton('Team', team._id) + ' ' + 
				util.deleteButton('Team', team._id) + '"],';
			});
			response.send(util.correggiRispostaPerDataTable(ret));
		});
	}
}