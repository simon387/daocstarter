let fileName = 'dist.zip'
let archiver = require('archiver');
let archive = archiver('zip');
let fileOutput = require('fs').createWriteStream(fileName);

fileOutput.on('close', function () {
	console.log(archive.pointer() + ' total bytes');
	console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.pipe(fileOutput);
archive.glob("dist/daocstarter-win32-x64/**");

archive.on('error', function(err){
	throw err;
});
archive.finalize();
