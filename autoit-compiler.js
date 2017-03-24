"use strict";
const shell = require('node-powershell');
const distzip = 'dist.zip';
const archiver = require('archiver');
const archive = archiver('zip', {
	zlib: { level: 0 } // Sets the compression level.
});
const packagercmd = 'electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\\i.ico --overwrite';
const autoitcmd = '& "C:\\Program Files (x86)\\AutoIt3\\Aut2Exe\\Aut2exe.exe" /in "C:\\electron\\daocstarter\\daocstarter.au3" /icon img\\i.ico /comp 4'
const fs = require('fs');
const exe = "daocstarter.exe"

fs.unlinkSync(distzip);
console.log('successfully deleted ' + distzip);
fs.unlinkSync(exe);
console.log('successfully deleted ' + exe);

let ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
ps.addCommand(packagercmd)
.then(function() {
	 ps.invoke();
})
.then(function(output){
	return ps.dispose();
})
.then(function() {
	console.log('successfully executed ' + packagercmd);
	let fileOutput = fs.createWriteStream(distzip);
	fileOutput.on('close', function () {
		console.log(archive.pointer() + ' total bytes; archiver has been finalized and the output file descriptor has closed.');
		let powershell = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
		powershell.addCommand(autoitcmd)
		.then(function() {
			powershell.invoke();
		})
		.then(function(output){
			powershell.dispose();
			console.log("writing " + exe + "...");
		})
		.catch(function(err){
			console.log(err);
			powershell.dispose();
		});
	});
	archive.pipe(fileOutput);
	archive.glob("dist/daocstarter-win32-x64/**");
	archive.on('error', function(err){
		throw err;
	});
	archive.finalize();
})
.catch(function(err){
	ps.dispose();
});
