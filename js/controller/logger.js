/*
!!

vedere logger-temp
non committato su macchina windows!

*/


//const electron = require('electron');
//const app = electron.app;


function startClicked() {
	console.log("startClicked");
	//alert("startClicked");

/*	var child = require('child_process').execFile;
	var executablePath_ = "C:\\Program Files (x86)\\Electronic Arts\\Dark Age of Camelot\\game.dll";
	var executablePath = "C:\\Windows\\System32\\cmd.exe";
	var parameters = [executablePath_, "107.23.173.143", "10622", "41", "rayvaughan", "W1", "Rayvaughan", "2"];
	child(executablePath, parameters, function(err, data) {
		console.log(err)
		console.log(data.toString());
	});
*/
/*
	var child = require('child_process').execFile;
	var executablePath = "C:\\Program Files (x86)\\Electronic Arts\\Dark Age of Camelot\\game.dll";

	child(executablePath, function(err, data) {
		if(err){
		console.error(err);
		return;
		}
	
		console.log(data.toString());
	});*/

	var executablePath = "C:\\Program Files (x86)\\Electronic Arts\\Dark Age of Camelot\\game.dll";
	var dir = "C:\\Program Files (x86)\\Electronic Arts\\Dark Age of Camelot";

	var spawn = require('child_process').spawn;
	var prc = spawn(executablePath, ["107.23.173.143"], {
		cwd : dir, 
		setsid: false,
		detached: true,
	});
	console.log('Spawned child pid: ' + prc.pid)
}