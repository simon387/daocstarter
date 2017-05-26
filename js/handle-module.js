'use strict';

const ps = require('ps-node');
const child_process = require('child_process');
const fs = require('fs');
const constants = require('./constants.js');

module.exports = {
	killMutants: function () {
		let aPID = [];
		ps.lookup({
			command: 'game.dll',
			psargs: 'ux'
		}, (err, resultList) => {
			if (err) {
				throw new Error(err);
			}
			resultList.forEach(process => {
				if (process){
					//console.log("_PUSHATO UN PROCESSO")
					aPID.push(process.pid);
				}
			});
			if (aPID.length > 0) {
				getGameDllHandles(aPID);
			}
		});
	}
}

function getGameDllHandles(aPID) {
	const spawn = child_process.spawn;
	let aHex = [];
	const handle_exe= spawn(constants.handle_path, ['-a', '-nobanner']);
	const findstr_exe = spawn('findstr', ['DAoC']);//i
	handle_exe.stdout.on('data', (data) => {
		findstr_exe.stdin.write(data);
	});
	handle_exe.stderr.on('data', (data) => {
		console.log(`ps stderr: ${data}`);
	});
	handle_exe.on('close', (code) => {
		if (code !== 0) {
			console.log(`handle_exe process exited with code ${code}`);
		}
		findstr_exe.stdin.end();
	});
	findstr_exe.stdout.on('data', (data) => {
		const dataRows = data.toString().split('\n');
		//console.log("dataRows", dataRows)
		if (dataRows instanceof Array) {
			for (let r = 0; r < dataRows.length; r++) {
				let hex = dataRows[r].split(':');
				aHex.push(hex[0].replace(/\ +/g, ''));
			}
			if (aHex.length > 0) {
				killHandles (aPID, aHex);
			}
		}
	});
	findstr_exe.stderr.on('data', (data) => {
		console.log(`findstr_exe stderr: ${data}`);
	});
	findstr_exe.on('close', (code) => {
		if (code !== 0) {
			console.log(`findstr_exe process exited with code ${code}`);
		}
	});
}

function killHandles (aPID, aHex) {
	for (let p = 0; p < aPID.length; p++) {
		for (let h = 0; h < aHex.length; h++) {
			const spawn = child_process.spawn;
			const handle_exe = spawn(constants.handle_path, ['-c', aHex[h], '-y', '-p', aPID[p]]);
			handle_exe.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
			});
			handle_exe.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});
			handle_exe.on('close', (code) => {
				console.log(`handle_exe process exited with code ${code}`);
			});
		}
	}
}
