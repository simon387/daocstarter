/*
#NoTrayIcon
#include <WinAPI.au3>
#include <WindowsConstants.au3>

Global Const $pid = $CmdLine[1]
Global Const $width = $CmdLine[2]
Global Const $height = $CmdLine[3]
Global Const $x = $CmdLine[4]
Global Const $y = $CmdLine[5]

Global Const $wh = _WinGetByPID($pid)

Global $var = _WinAPI_GetWindowHeight($wh);
Global $c = 0

While True
	If _WinAPI_GetWindowHeight($wh) <> $var Then ExitLoop
	$var = _WinAPI_GetWindowHeight($wh)
	Sleep(100)
	$c += 1
	If $c > 200 Then ExitLoop
WEnd

Global $iStyle = _WinAPI_GetWindowLong($wh, $GWL_STYLE)

;~ $iStyle = BitOR(BitXOR($iStyle, $WS_MINIMIZEBOX, $WS_MAXIMIZEBOX, $WS_CAPTION, $WS_BORDER, $WS_SIZEBOX), $WS_POPUP)
$iStyle = BitAnd($iStyle, BitNot($WS_BORDER))
$iStyle = BitAnd($iStyle, BitNot($WS_CAPTION))

_WinAPI_SetWindowLong($wh, $GWL_STYLE, $iStyle)

_WinAPI_SetWindowRgn($wh, _WinAPI_CreateRectRgn(0, 0, $width, $height))

_WinAPI_MoveWindow($wh, $x, $y, $width, $height)

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
