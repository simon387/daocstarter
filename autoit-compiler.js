"use strict";
const shell = require('node-powershell');
let fileName = 'dist.zip';
let archiver = require('archiver');
let archive = archiver('zip', {
	zlib: { level: 0 } // Sets the compression level.
});
let fileOutput = require('fs').createWriteStream(fileName);

fileOutput.on('close', function () {
	console.log(archive.pointer() + ' total bytes');
	console.log('archiver has been finalized and the output file descriptor has closed.');
	console.log('calling the autoit compiler...');
	let powershell = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
	powershell.addCommand('& "C:\\Program Files (x86)\\AutoIt3\\Aut2Exe\\Aut2exe.exe" /in "C:\\electron\\daocstarter\\daocstarter.au3" /icon img\\i.ico /comp 4')
	//"C:\Program Files (x86)\AutoIt3\Aut2Exe\Aut2exe.exe" /in "C:\electron\daocstarter\daocstarter.au3" /icon img\i.ico /comp 4
	.then(function() {
		console.log("...powershell.invoke()...");
		return powershell.invoke();
	})
	.then(function(output){
		console.log("...powershell.dispose() [OK!]");
		powershell.dispose();
	})
	.catch(function(err){
		console.log("...powershell.dispose() due to error!");
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
