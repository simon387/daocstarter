'use strict';

const fs = require('fs');
const ps = require('ps-node');
const child_process = require('child_process');
const constants = require('./constants');
const log = require('./log-module').getLog();

const killMutants = function () {
	return new Promise(function(resolve, reject) {
		log.info('killMutants called');
		let aPID = [];
		ps.lookup({
			command: constants.gameDll,
			psargs: constants.psargs
		}, async (err, resultList) => {
			if (err) {
				log.error(err);
			}
			resultList.forEach(process => {
				if (process){
					aPID.push(process.pid);
				}
			});
			if (aPID.length > 0) {
				resolve(await getGameDllHandles(aPID));
			}
		});
	});
}

function getGameDllHandles(aPID) {
	log.info('getGameDllHandles called');
	return new Promise(function(resolve, reject) {
		const spawn = child_process.spawn;
		let aHex = [];
		const handle_exe= spawn(constants.handle_path(), ['-a', '-nobanner']);
		const findstr_exe = spawn('findstr', ['DAoC']);//i
		handle_exe.stdout.on('data', (data) => {
			findstr_exe.stdin.write(data);
		});
		handle_exe.stderr.on('data', (data) => {
			log.error(`ps stderr: ${data}`);
		});
		handle_exe.on('close', (code) => {
			if (code !== 0) {
				log.error(`handle_exe process exited with code ${code}`);
			}
			findstr_exe.stdin.end();
		});
		findstr_exe.stdout.on('data', async data => {
			const dataRows = data.toString().split('\n');
			if (dataRows instanceof Array) {
				for (let r = 0; r < dataRows.length; r++) {
					let hex = dataRows[r].split(':');
					aHex.push(hex[0].replace(/\ +/g, ''));
				}
				if (aHex.length > 0) {
					resolve(await killHandles (aPID, aHex));
				}
			}
		});
		findstr_exe.stderr.on('data', (data) => {
			log.error(`findstr_exe stderr: ${data}`);
		});
		findstr_exe.on('close', (code) => {
			if (code !== 0) {
				log.error(`findstr_exe process exited with code ${code}`);
			}
		});
	});
}

function killHandles (aPID, aHex) {
	log.info('killHandles called');
	return new Promise(function(resolve, reject) {
		for (let p = 0; p < aPID.length; p++) {
			for (let h = 0; h < aHex.length; h++) {
				const spawn = child_process.spawn;
				const handle_exe = spawn(constants.handle_path(), ['-c', aHex[h], '-y', '-p', aPID[p]]);
				handle_exe.stdout.on('data', (data) => {
					log.info(`stdout: ${data}`);
				});
				handle_exe.stderr.on('data', (data) => {
					log.error(`stderr: ${data}`);
				});
				handle_exe.on('close', (code) => {
					log.info(`handle_exe process exited with code ${code}`);
				});
			}
		}
		resolve();
	});
}

module.exports = {killMutants};
