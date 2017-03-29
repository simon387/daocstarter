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
const daocstarterau3 = "daocstarter.au3";

try {
	fs.unlinkSync(daocstarterau3);
	console.log('successfully deleted ' + daocstarterau3);
} catch(error) {
	console.log(error + "...");
}

let buffer = new Buffer(
	'#RequireAdmin\r\n' +
	'#NoTrayIcon\r\n' +
	'#include <Misc.au3>\r\n' +
	'#include <array.au3>\r\n' +
	'_Singleton(@ScriptName)\r\n' +
	'Global Const $VERSION = "' + require('./package.json').version + '"\r\n' +
	'Global Const $DIST_ZIP_PATH = @AppDataDir & "\\daocstarter\\" & $VERSION; & "\\daocstarter-win32-x64"\r\n' +
	'Global Const $WORKINGDIR = $DIST_ZIP_PATH & "\\dist\\daocstarter-win32-x64"\r\n' +
	'Global Const $EXE = $WORKINGDIR & "\\daocstarter.exe"\r\n' +
	'Global Const $TMP_ZIP_PATH = @TempDir & "\\dist.zip"\r\n' +
	'Global Const $TMP_TITLE_RENAMER = @TempDir & "\\titlerenamer.exe"\r\n' +
	'FileInstall(".\\titlerenamer\\titlerenamer.exe", $TMP_TITLE_RENAMER, 1)\r\n' +
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

fs.open(daocstarterau3, 'w', function(err, fd) {
	if (err) {
		throw 'error opening file: ' + err;
	}

	fs.write(fd, buffer, 0, buffer.length, null, function(err) {
		if (err) throw 'error writing file: ' + err;
		fs.close(fd, function() {
			console.log('file written');
			try {
				fs.unlinkSync(distzip);
				console.log('successfully deleted ' + distzip);
				fs.unlinkSync(exe);
				console.log('successfully deleted ' + exe);
			} catch(error) {
				console.log(error + "...");
			}

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
			//
		})
	});
});

/* sorgente di titlerenamer.exe
#NoTrayIcon
WinSetTitle(_WinGetByPID($CmdLine[1]), "", $CmdLine[2])
Func _WinGetByPID($iPID, $iArray = 1) ; 0 Will Return 1 Base Array & 1 Will Return The First Window.
	Local $aError[1] = [0], $aWinList, $sReturn
	If IsString($iPID) Then
		$iPID = ProcessExists($iPID)
	EndIf
	$aWinList = WinList()
	For $A = 1 To $aWinList[0][0]
		If WinGetProcess($aWinList[$A][1]) = $iPID And BitAND(WinGetState($aWinList[$A][1]), 2) Then
			If $iArray Then
				Return $aWinList[$A][1]
			EndIf
			$sReturn &= $aWinList[$A][1] & Chr(1)
		EndIf
	Next
	If $sReturn Then
		Return StringSplit(StringTrimRight($sReturn, 1), Chr(1))
	EndIf
	Return SetError(1, 0, $aError)
EndFunc
*/