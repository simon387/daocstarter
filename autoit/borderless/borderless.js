'use strict';

const fs = require('fs');
const borderless = "borderless.au3";
const buffer = new Buffer (
'#NoTrayIcon\r\n' +
'#include <WinAPI.au3>\r\n' +
'#include <WindowsConstants.au3>\r\n' +
'\r\n' +
'Global Const $pid = $CmdLine[1]\r\n' +
'Global Const $width = $CmdLine[2]\r\n' +
'Global Const $height = $CmdLine[3]\r\n' +
'Global Const $x = $CmdLine[4]\r\n' +
'Global Const $y = $CmdLine[5]\r\n' +
'\r\n' +
'Global Const $wh = _WinGetByPID($pid)\r\n' +
'\r\n' +
'Global $var = _WinAPI_GetWindowHeight($wh);\r\n' +
'Global $c = 0\r\n' +
'\r\n' +
'While True\r\n' +
'	If _WinAPI_GetWindowHeight($wh) <> $var Then ExitLoop\r\n' +
'	$var = _WinAPI_GetWindowHeight($wh)\r\n' +
'	Sleep(100)\r\n' +
'	$c += 1\r\n' +
'	If $c > 200 Then ExitLoop\r\n' +
'WEnd\r\n' +
'\r\n' +
'Global $iStyle = _WinAPI_GetWindowLong($wh, $GWL_STYLE)\r\n' +
'\r\n' +
';~ $iStyle = BitOR(BitXOR($iStyle, $WS_MINIMIZEBOX, $WS_MAXIMIZEBOX, $WS_CAPTION, $WS_BORDER, $WS_SIZEBOX), $WS_POPUP)\r\n' +
'$iStyle = BitAnd($iStyle, BitNot($WS_BORDER))\r\n' +
'$iStyle = BitAnd($iStyle, BitNot($WS_CAPTION))\r\n' +
'\r\n' +
'_WinAPI_SetWindowLong($wh, $GWL_STYLE, $iStyle)\r\n' +
'\r\n' +
'_WinAPI_SetWindowRgn($wh, _WinAPI_CreateRectRgn(0, 0, $width, $height))\r\n' +
'\r\n' +
'_WinAPI_MoveWindow($wh, $x, $y, $width, $height)\r\n' +
'\r\n' +
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
'EndFunc\r\n'
);

try {
	fs.unlinkSync(borderless);
	console.log('successfully deleted ' + borderless);
} catch(error) {
	console.log(error + "...");
}
fs.open(borderless, 'w', (err, fd) => {
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
