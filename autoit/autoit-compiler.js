"use strict";

const fs = require('fs');
const shell = require('node-powershell');
const archiver = require('archiver');
const packagejson = require('../package.json');
const distzip = 'dist.zip';
const archive = archiver('zip', {zlib: {level: 9} /* Sets the compression level.0-9*/});
const ignoreList = '--ignore=version --ignore=borderless\.js --ignore=CALGamma\.js --ignore=titlerenamer\.js --ignore=autoit-compiler\.js --ignore=daocstarter\.au3 --ignore=.*\.md$ --ignore=handle64\.exe --ignore=creative\.less --ignore=mixins\.less --ignore=variables\.less';
const packagercmd = 'electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\\i.ico --overwrite ' + ignoreList;
//YOU NEED TO EDIT THIS LINE
const daocstarterau3Location = '"C:\\dev\\daocstarter\\daocstarter.au3"';
// const daocstarterau3Location = '"C:\\dev\\rep-gh\\daocstarter\\daocstarter.au3"';
//AND MAYBE THIS ONE TOO
//const autoitcmd = '& "C:\\Program Files (x86)\\AutoIt3\\Aut2Exe\\Aut2exe.exe" /in ' + daocstarterau3Location + ' /icon img\\i.ico /comp 4';
const autoitcmd = '"C:\\Program Files (x86)\\AutoIt3\\Aut2Exe\\Aut2exe.exe" /in ' + daocstarterau3Location + ' /icon img\\i.ico /comp 4';

const daocstarterau3 = "daocstarter.au3";
const exe = "daocstarter.exe"
const buffer = new Buffer (
	'#RequireAdmin\r\n' +
	'#NoTrayIcon\r\n' +
	'#pragma compile(Compression, 4)\r\n' +
	'#pragma compile(Icon, .\\img\\i.ico)\r\n' +
	'#pragma compile(x64, true)\r\n' +
	'#include <Misc.au3>\r\n' +
	'#include <array.au3>\r\n' +
	'_Singleton(@ScriptName)\r\n' +
	'Global Const $VERSION = "' + packagejson.version + '"\r\n' +
	'Global Const $DIST_ZIP_PATH = @AppDataDir & "\\daocstarter\\" & $VERSION; & "\\daocstarter-win32-x64"\r\n' +
	'Global Const $WORKINGDIR = $DIST_ZIP_PATH & "\\dist\\daocstarter-win32-x64"\r\n' +
	'Global Const $EXE = $WORKINGDIR & "\\daocstarter.exe"\r\n' +
	'Global Const $TMP_ZIP_PATH = @TempDir & "\\dist.zip"\r\n' +
	';~ DirRemove($DIST_ZIP_PATH, 1)\r\n' +
	'If Not FileExists($EXE) Then\r\n' +
	'\tFileInstall(".\\dist.zip", $TMP_ZIP_PATH, 1);1=overwrite\r\n' +
	'\t_Zip_UnzipAll($TMP_ZIP_PATH, $DIST_ZIP_PATH & "\\")\r\n' +
	'EndIf\r\n' +
	'ShellExecute($EXE, "", $WORKINGDIR)\r\n' +
	'Func _Zip_UnzipAll($hZipFile, $hDestPath)\r\n' +
	'\tIf Not FileExists($hDestPath) Then DirCreate($hDestPath)\r\n' +
	'\tLocal $aArray[1], $oApp = ObjCreate("Shell.Application")\r\n' +
	'\t$oApp.Namespace($hDestPath).CopyHere($oApp.Namespace($hZipFile).Items)\r\n' +
	'\tFor $item In $oApp.Namespace($hZipFile).Items\r\n' +
	'\t\t_ArrayAdd($aArray, $item)\r\n' +
	'\tNext\r\n' +
	'\tWhile 1\r\n' +
	'\t\tIf ControlGetHandle("[CLASS:#32770]", "", "[CLASS:SysAnimate32; INSTANCE:1]") <> "" And WinGetState("[CLASS:#32770]") <> @SW_HIDE Then WinSetState(WinGetHandle("[CLASS:#32770]"), "", @SW_HIDE)\r\n' +
	'\t\tIf FileExists($hDestPath & "\\" & $aArray[UBound($aArray) - 1]) Then Return SetError(0, 0, 1)\r\n' +
	'\t\tSleep(500)\r\n' +
	'\tWEnd\r\n' +
	'EndFunc\r\n'
);

try {
	fs.unlinkSync(daocstarterau3);
	console.log('successfully deleted ' + daocstarterau3);
} catch(error) {
	console.log(error + "...");
} finally {
	//fs.writeFileSync(daocstarterau3, buffer);
	fs.writeFile(daocstarterau3, buffer, 'utf8', function(err) {
		if (err) {
			return console.log(err);
		}
		console.log('file written');
		try {
			fs.unlinkSync(distzip);
			console.log('successfully deleted ' + distzip);
			fs.unlinkSync(exe);
			console.log('successfully deleted ' + exe);
		} catch(error) {
			console.log(error + "...");
		} finally {
			let { exec } = require('child_process');
			console.log("wait please...");
			exec(packagercmd, (err, stdout, stderr) => {
				if (err) {
					return;// node couldn't execute the command
				}
				// the *entire* stdout and stderr (buffered)
				console.log(`stdout: ${stdout}`);
				console.log(`stderr: ${stderr}`);
				console.log('successfully executed ' + packagercmd);
				// create a file to stream archive data to.
				var output = fs.createWriteStream(distzip);
				var archive = archiver('zip', {
					zlib: { level: 9 } // Sets the compression level.
				});
				archive.pipe(output);
				archive.glob("dist/daocstarter-win32-x64/**");
				output.on('close', function() {
					console.log(archive.pointer() + ' total bytes');
					console.log('archiver has been finalized and the output file descriptor has closed.');
					console.log("\nwait please!");
				
				});
				// output.on('end', function() {
				// 	console.log("ASD FINE")
				// });
				archive.finalize();
			});
		}
	});
}
