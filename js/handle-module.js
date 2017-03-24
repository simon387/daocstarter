"use strict";
const shell = require('node-powershell');
const {dialog} = require('electron');

module.exports = {
	killMutants: function () {
		console.log("killMutants called!");
		if (require('os').platform() != 'win32') {
			return;
		}
		var exec = require('child_process').exec; 
		exec('NET SESSION', function(err, so, se) {
			if (se.length === 0) {
				getGameDllPids();
			} else {
				dialog.showMessageBox({message:"You are NOT running AS admin! you can run only two DAoC instances!"});
			}
		});
	}
}

function getGameDllPids() {
	let ps = require('ps-node');
	let aPID = [];
	ps.lookup({
		command: 'game.dll',
		psargs: 'ux'
	}, function(err, resultList) {
		if (err) {
			throw new Error(err);
		}
		resultList.forEach(function(process){
			if (process){
				aPID.push(process.pid);
			}
		});
		if (aPID.length > 0) {
			getGameDllHandles(aPID);
		}
	});
}

function getGameDllHandles(aPID) {
	let aHex = [];
	let spawn = require('child_process').spawn;
	//const handle_exe = spawn('handle\\handle.exe', ['-a', '-nobanner']);
	let handle_exe = spawn('resources\\app\\handle\\handle.exe', ['-a', '-nobanner']);
	let findstr_exe = spawn('findstr', ['DAoCi']);
	handle_exe.stdout.on('data', (data) => {
		findstr_exe.stdin.write(data);
	});
	handle_exe.stderr.on('data', (data) => {
		console.log(`ps stderr: ${data}`);
	});
	handle_exe.on('close', (code) => {
		if (code !== 0) {
			console.log(`getprocess process exited with code ${code}`);
		}
		findstr_exe.stdin.end();
	});
	findstr_exe.stdout.on('data', (data) => {
		let aRighe = data.toString().split('\n');
		if (aRighe instanceof Array) {
			for (let i = 0; i < aRighe.length; i++) {
				let hex = aRighe[i].split(':');
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
			let spawn = require('child_process').spawn;
			//let handle_exe = spawn('handle\\handle.exe', ['-c', aHex[h], '-y', '-p', aPID[p]]);
			let handle_exe = spawn('resources\\app\\handle\\handle.exe', ['-c', aHex[h], '-y', '-p', aPID[p]]);
			handle_exe.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
			});
			handle_exe.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});
			handle_exe.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
			});
		}
	}
}
