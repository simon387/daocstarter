'use strict';

const fs = require('fs');
const titlerenamer = "titlerenamer.au3";
const buffer = new Buffer (
'#NoTrayIcon\r\n' +
'WinSetTitle(_WinGetByPID($CmdLine[1]), "", $CmdLine[2])\r\n' +
'Func _WinGetByPID($iPID, $iArray = 1) ; 0 Will Return 1 Base Array & 1 Will Return The First Window.\r\n' +
'	Local $aError[1] = [0], $aWinList, $sReturn\r\n' +
'	If IsString($iPID) Then\r\n' +
'		$iPID = ProcessExists($iPID)\r\n' +
'	EndIf\r\n' +
'	$aWinList = WinList()\r\n' +
'	For $A = 1 To $aWinList[0][0]\r\n' +
'		If WinGetProcess($aWinList[$A][1]) = $iPID And BitAND(WinGetState($aWinList[$A][1]), 2) Then\r\n' +
'			If $iArray Then\r\n' +
'				Return $aWinList[$A][1]\r\n' +
'			EndIf\r\n' +
'			$sReturn &= $aWinList[$A][1] & Chr(1)\r\n' +
'		EndIf\r\n' +
'	Next\r\n' +
'	If $sReturn Then\r\n' +
'		Return StringSplit(StringTrimRight($sReturn, 1), Chr(1))\r\n' +
'	EndIf\r\n' +
'	Return SetError(1, 0, $aError)\r\n' +
'EndFunc\r\n' +
'\r\n');

try {
	fs.unlinkSync(titlerenamer);
	console.log('successfully deleted ' + titlerenamer);
} catch(error) {
	console.log(error + "...");
}
fs.open(titlerenamer, 'w', (err, fd) => {
	if (err) {
		throw 'error opening file: ' + err;
	}
	fs.write(fd, buffer, 0, buffer.length, null, (err) => {
		if (err) {
			throw 'error writing file: ' + err;
		}
		fs.close(fd, () => {
			console.log('file written');
		});
	});
});
