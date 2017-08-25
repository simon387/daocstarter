'use strict';

const fs = require('fs');
const calgammau3 = "CALGamma.au3";
const buffer = new Buffer (
'#NoTrayIcon\r\n' +
'#AutoIt3Wrapper_icon=C:\\daocstarter\\img\\i.ico\r\n' +
'#AutoIt3Wrapper_Compression=4\r\n' +
'#include <GuiConstants.au3>\r\n' +
'#Include <WinAPI.au3>\r\n' +
'Opt ("GuiOnEventMode",1)\r\n' +
'Global Const $DAOC_CLASS = "DAoCMWC"\r\n' +
'Global $DAOC_IN_PRIMO_PIANO = false\r\n' +
'Global $par1\r\n' +
'Global $par2\r\n' +
'\r\n' +
'$redStartValue = RegRead("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Red")\r\n' +
'If $redStartValue > 386 or $redStartValue < 0 or $redStartValue = "" then  $redStartValue = 128\r\n' +
'$greenStartValue = RegRead("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Green")\r\n' +
'If $greenStartValue > 386 or $greenStartValue < 0 or $greenStartValue = "" then $greenStartValue = 128\r\n' +
'$blueStartValue = RegRead("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Blue")\r\n' +
'If $blueStartValue > 386 or $blueStartValue < 0 or $blueStartValue = "" then $blueStartValue = 128\r\n' +
'\r\n' +
'_SetGamma($redStartValue, $greenStartValue, $blueStartValue)\r\n' +
'\r\n' +
'Global $lastRed = $redStartValue\r\n' +
'Global $lastGreen = $greenStartValue\r\n' +
'Global $lastBlue = $blueStartValue\r\n' +
'Global Const $slideMin = 0\r\n' +
'Global Const $slideMax = 386\r\n' +
'\r\n' +
'FileInstall("C:\\daocstarter\\img\\GammaImage.jpg", @tempdir & "\\GammaImage.jpg", 1)\r\n' +
'$Main = GUICreate("CALGamma", 1024, 530,-1,-1)\r\n' +
'\r\n' +
'GUISetOnEvent($GUI_EVENT_CLOSE, "_Quit")\r\n' +
'GUISetOnEvent($GUI_EVENT_MINIMIZE, "SpecialEvents")\r\n' +
'GUISetOnEvent($GUI_EVENT_RESTORE, "SpecialEvents")\r\n' +
'\r\n' +
'$Pic1 = GUICtrlCreatePic(@tempdir & "\\GammaImage.jpg", 8, 8, 689, 481, BitOR($SS_NOTIFY,$WS_GROUP ),$WS_EX_DLGMODALFRAME )\r\n' +
'\r\n' +
'GuiCtrlCreateLabel("Red",712,10,41)\r\n' +
'$RedSlider = GUICtrlCreateSlider(712, 28, 41, 461,BitOr($TBS_VERT,$TBS_AUTOTICKS))\r\n' +
'GUICtrlSetLimit(-1,$slideMax,$slideMin)\r\n' +
'GUICtrlSetData(-1,$redStartValue)\r\n' +
'\r\n' +
'GuiCtrlCreateLabel("Green",786,10,41)\r\n' +
'$GreenSlider = GUICtrlCreateSlider(786, 28, 41, 461,BitOr($TBS_VERT,$TBS_AUTOTICKS))\r\n' +
'GUICtrlSetLimit(-1,$slideMax,$slideMin)\r\n' +
'GUICtrlSetData(-1,$greenStartValue)\r\n' +
'\r\n' +
'GuiCtrlCreateLabel("Blue",857,10,41)\r\n' +
'$BlueSlider = GUICtrlCreateSlider(857, 28, 41, 461,BitOr($TBS_VERT,$TBS_AUTOTICKS))\r\n' +
'GUICtrlSetLimit(-1,$slideMax,$slideMin)\r\n' +
'GUICtrlSetData(-1,$blueStartValue)\r\n' +
'\r\n' +
'$lockTick = GuiCtrlCreateCheckBox("Lock Sliders",910,10)\r\n' +
'\r\n' +
'$Normal = GuiCtrlCreateButton("Normal",910,50,90,40)\r\n' +
'GUICtrlSetOnEvent(-1,"_Normalize")\r\n' +
'\r\n' +
'$Reset = GuiCtrlCreateButton("Reset",910,100,90,40)\r\n' +
'GUICtrlSetOnEvent(-1,"_Reset")\r\n' +
'\r\n' +
'$Save = GuiCtrlCreateButton("Save",910,150,90,40)\r\n' +
'GUICtrlSetOnEvent(-1,"_Save")\r\n' +
'\r\n' +
'$Quit = GuiCtrlCreateButton("Quit",910,200,90,40)\r\n' +
'GUICtrlSetOnEvent(-1,"_Quit")\r\n' +
'\r\n' +
'$add2StartUp = GuiCtrlCreateButton("Add to Startup",910,250,90,40)\r\n' +
'GUICtrlSetOnEvent(-1,"_AddStartup")\r\n' +
'\r\n' +
'$RemoveStartUp = GuiCtrlCreateButton("Remove Startup",910,300,90,40)\r\n' +
'GUICtrlSetOnEvent(-1,"_RemoveStartup")\r\n' +
'\r\n' +
'GUICtrlCreateLabel("R",910,355,20)\r\n' +
'GuiCtrlSetFont(-1,14)\r\n' +
'$RedInput = GUICtrlCreateInput($redStartValue,930,350,70,30,$ES_NUMBER + $ES_READONLY)\r\n' +
'GUICtrlSetLimit(-1,3)\r\n' +
'GuiCtrlSetFont(-1,14)\r\n' +
'$Redupdown = GUICtrlCreateUpdown(-1,$UDS_NOTHOUSANDS+$UDS_ARROWKEYS)\r\n' +
'GUICtrlSetLimit ( -1, 386 ,0 )\r\n' +
'\r\n' +
'GUICtrlCreateLabel("G",910,405,20)\r\n' +
'GuiCtrlSetFont(-1,14)\r\n' +
'$GreenInput = GUICtrlCreateInput($GreenStartValue,930,400,70,30,$ES_NUMBER + $ES_READONLY)\r\n' +
'GUICtrlSetLimit(-1,3)\r\n' +
'GuiCtrlSetFont(-1,14)\r\n' +
'$Greenupdown = GUICtrlCreateUpdown(-1,$UDS_NOTHOUSANDS+$UDS_ARROWKEYS)\r\n' +
'GUICtrlSetLimit ( -1, 386 ,0 )\r\n' +
'\r\n' +
'GUICtrlCreateLabel("B",910,455,20)\r\n' +
'GuiCtrlSetFont(-1,14)\r\n' +
'$BlueInput = GUICtrlCreateInput($BlueStartValue,930,450,70,30,$ES_NUMBER + $ES_READONLY)\r\n' +
'GUICtrlSetLimit(-1,3)\r\n' +
'GuiCtrlSetFont(-1,14)\r\n' +
'$Blueupdown = GUICtrlCreateUpdown(-1,$UDS_NOTHOUSANDS+$UDS_ARROWKEYS)\r\n' +
'GUICtrlSetLimit ( -1, 386 ,0 )\r\n' +
'\r\n' +
'GUISetState(@SW_SHOW)\r\n' +
'GUIRegisterMsg($WM_VSCROLL, "WM_HVSCROLL")\r\n' +
'\r\n' +
'While 1\r\n' +
'	sleep (333)\r\n' +
'	$className = _WinAPI_GetClassName(WinGetHandle("[ACTIVE]"))\r\n' +
'	If $className = $DAOC_CLASS Or $className = "AutoIt v3 GUI" Then\r\n' +
'		$DAOC_IN_PRIMO_PIANO = true\r\n' +
'	Else\r\n' +
'		$DAOC_IN_PRIMO_PIANO = false\r\n' +
'	EndIf\r\n' +
'\r\n' +
'	If $DAOC_IN_PRIMO_PIANO Then\r\n' +
'		$ret = DLLCall("gdi32.dll", "int", "SetDeviceGammaRamp", "int", $par1[0], "ptr", DllStructGetPtr($par2))\r\n' +
'	Else\r\n' +
'		_SetGamma($redStartValue, $greenStartValue, $blueStartValue, True)\r\n' +
'	EndIf\r\n' +
'WEnd\r\n' +
'\r\n' +
'Func _AddStartup()\r\n' +
'	If @compiled then\r\n' +
'		Regwrite("HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Run","CALGamma","Reg_SZ",@scriptfullpath & " /h")\r\n' +
'		Msgbox(0 + 262144,"Start-up","CALGamma has been added to the startup list")\r\n' +
'	Else\r\n' +
'		ConsoleWrite("Script is not compiled and can not be added to the startup list" & @crlf)\r\n' +
'	EndIf\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func _RemoveStartup()\r\n' +
'	If RegRead("HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Run","CALGamma") <> "" then\r\n' +
'		RegDelete("HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Run","CALGamma")\r\n' +
'		Msgbox(0 + 262144,"Start-up","CALGamma has been removed from the startup list")\r\n' +
'	Else\r\n' +
'		ConsoleWrite("CALGamma is not in the startup list" & @crlf)\r\n' +
'	EndIf\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func _Save()\r\n' +
'	$newRed = GuiCtrlRead($RedSlider)\r\n' +
'	$newGreen = GuiCtrlRead($GreenSlider)\r\n' +
'	$newBlue = GuiCtrlRead($BlueSlider)\r\n' +
'	RegWrite("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Red","REG_SZ", $newRed)\r\n' +
'	RegWrite("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Green","REG_SZ", $newGreen)\r\n' +
'	RegWrite("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Blue","REG_SZ", $newBlue)\r\n' +
'	Msgbox(0 + 262144,"Saved","Gamma Settings have been saved")\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func _Quit()\r\n' +
'	$newRed = GuiCtrlRead($RedSlider)\r\n' +
'	$newGreen = GuiCtrlRead($GreenSlider)\r\n' +
'	$newBlue = GuiCtrlRead($BlueSlider)\r\n' +
'	$savedRed = RegRead("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Red")\r\n' +
'	$savedGreen = RegRead("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Green")\r\n' +
'	$savedBlue = RegRead("HKEY_LOCAL_MACHINE\\Software\\TIC\\CALGamma","Blue")\r\n' +
'	If $savedRed = "" then $savedred = 128\r\n' +
'	If $savedGreen = "" then $savedGreen = 128\r\n' +
'	If $savedBlue = "" then $savedBlue = 128\r\n' +
'	If $newRed <> $savedRed then\r\n' +
'		;prompt to save\r\n' +
'		$ans = MsgBox(4 + 262144,"Settings Change","Settings have not been saved do you wish to save changes before exiting")\r\n' +
'		If $ans = 6 then\r\n' +
'			_Save()\r\n' +
'		Else\r\n' +
'			_SetGamma($savedRed, $savedGreen, $savedBlue)\r\n' +
'		EndIf\r\n' +
'	ElseIf $newGreen <> $savedGreen then\r\n' +
'		$ans = MsgBox(4 + 262144,"Settings Change","Settings have not been saved do you wish to save changes before exiting")\r\n' +
'		If $ans = 6 then\r\n' +
'			_Save()\r\n' +
'		Else\r\n' +
'			_SetGamma($savedRed, $savedGreen, $savedBlue)\r\n' +
'		EndIf\r\n' +
'	ElseIf $newBlue <> $savedBlue then\r\n' +
'		$ans = MsgBox(4 + 262144,"Settings Change","Settings have not been saved do you wish to save changes before exiting")\r\n' +
'		If $ans = 6 then\r\n' +
'			_Save()\r\n' +
'		Else\r\n' +
'			_SetGamma($savedRed, $savedGreen, $savedBlue)\r\n' +
'		EndIf\r\n' +
'	EndIf\r\n' +
'	FileDelete(@tempdir & "\\GammaImage.jpg")\r\n' +
'	Exit\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func WM_HVSCROLL($hWndGUI, $MsgID, $WParam, $LParam)\r\n' +
'	Switch $LParam\r\n' +
'		Case GUICtrlGetHandle($RedSlider),GUICtrlGetHandle($GreenSlider),GUICtrlGetHandle($BlueSlider)\r\n' +
'			ConsoleWrite("Set new Gamma Slider" & @crlf)\r\n' +
'\r\n' +
'		Case GUICtrlGetHandle($Redupdown),GUICtrlGetHandle($Greenupdown),GUICtrlGetHandle($Blueupdown)\r\n' +
'			ConsoleWrite("Set new Gamma Input" & @crlf)\r\n' +
'\r\n' +
'			GuiCtrlSetdata($RedSlider,GuiCtrlRead($RedInput))\r\n' +
'			GuiCtrlSetdata($GreenSlider,GuiCtrlRead($GreenInput))\r\n' +
'			GuiCtrlSetdata($BlueSlider,GuiCtrlRead($BlueInput))\r\n' +
'	EndSwitch\r\n' +
'\r\n' +
'	If BitAnd(GuiCtrlRead($lockTick),$GUI_CHECKED) then\r\n' +
'		Switch $LParam\r\n' +
'			Case GUICtrlGetHandle($RedSlider),GUICtrlGetHandle($Redupdown)\r\n' +
'				ConsoleWrite("Red Slider" & @crlf)\r\n' +
'				$newRed = GuiCtrlRead($RedSlider)\r\n' +
'				$redDiff = $newRed - $lastRed\r\n' +
'				$newGreen = GuiCtrlRead($GreenSlider) + $redDiff\r\n' +
'				$newBlue = GuiCtrlRead($BlueSlider) + $redDiff\r\n' +
'				GuiCtrlSetData($GreenSlider,$newGreen)\r\n' +
'				GuiCtrlSetData($BlueSlider,$newBlue)\r\n' +
'			Case GUICtrlGetHandle($GreenSlider),GUICtrlGetHandle($Greenupdown)\r\n' +
'				ConsoleWrite("Green Slider" & @crlf)\r\n' +
'				$newGreen = GuiCtrlRead($GreenSlider)\r\n' +
'				$greenDiff = $newGreen - $lastGreen\r\n' +
'				$newRed = GuiCtrlRead($RedSlider) + $greenDiff\r\n' +
'				$newBlue = GuiCtrlRead($BlueSlider) + $greenDiff\r\n' +
'				GuiCtrlSetData($RedSlider,$newRed)\r\n' +
'				GuiCtrlSetData($BlueSlider,$newBlue)\r\n' +
'			Case GUICtrlGetHandle($BlueSlider),GUICtrlGetHandle($Blueupdown)\r\n' +
'				ConsoleWrite("Blue Slider" & @crlf)\r\n' +
'				$newBlue = GuiCtrlRead($BlueSlider)\r\n' +
'				$blueDiff = $newBlue - $lastBlue\r\n' +
'				$newRed = GuiCtrlRead($RedSlider) + $BlueDiff\r\n' +
'				$newGreen = GuiCtrlRead($GreenSlider) + $blueDiff\r\n' +
'				GuiCtrlSetData($RedSlider,$newRed)\r\n' +
'				GuiCtrlSetData($GreenSlider,$newGreen)\r\n' +
'		EndSwitch\r\n' +
'	Else\r\n' +
'		$newRed = GuiCtrlRead($RedSlider)\r\n' +
'		$newGreen = GuiCtrlRead($GreenSlider)\r\n' +
'		$newBlue = GuiCtrlRead($BlueSlider)\r\n' +
'	EndIf\r\n' +
'	GuiCtrlSetData($RedInput,$newRed)\r\n' +
'	GuiCtrlSetData($GreenInput,$newGreen)\r\n' +
'	GuiCtrlSetData($BlueInput,$newBlue)\r\n' +
'	_SetGamma($newRed, $newGreen, $newBlue)\r\n' +
'	$lastRed = $newRed\r\n' +
'	$lastGreen = $newGreen\r\n' +
'	$lastBlue = $newBlue\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func _Reset()\r\n' +
'	GuiCtrlSetData($RedSlider,$redStartValue)\r\n' +
'	GuiCtrlSetData($GreenSlider,$greenStartValue)\r\n' +
'	GuiCtrlSetData($BlueSlider,$blueStartValue)\r\n' +
'	$lastRed = $redStartValue\r\n' +
'	$lastGreen = $greenStartValue\r\n' +
'	$lastBlue = $blueStartValue\r\n' +
'	GuiCtrlSetData($RedInput, $redStartValue)\r\n' +
'	GuiCtrlSetData($GreenInput, $greenStartValue)\r\n' +
'	GuiCtrlSetData($BlueInput, $blueStartValue)\r\n' +
'	_SetGamma($redStartValue, $greenStartValue, $blueStartValue)\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func _Normalize()\r\n' +
'	GuiCtrlSetData($RedSlider,128)\r\n' +
'	GuiCtrlSetData($GreenSlider,128)\r\n' +
'	GuiCtrlSetData($BlueSlider,128)\r\n' +
'	$lastRed = 128\r\n' +
'	$lastGreen = 128\r\n' +
'	$lastBlue = 128\r\n' +
'	GuiCtrlSetData($RedInput,128)\r\n' +
'	GuiCtrlSetData($GreenInput,128)\r\n' +
'	GuiCtrlSetData($BlueInput,128)\r\n' +
'	_SetGamma()\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func _SetGamma($vRed=128, $vGreen=128, $vBlue=128, $OCIO=false)\r\n' +
'	Local $n_ramp,$rVar,$gVar,$bVar,$Ret,$i,$dc\r\n' +
'\r\n' +
'	If $vRed < 0 or $vRed > 386 then\r\n' +
'		SetError(1)\r\n' +
'		Return -1 ;Invalid Red value\r\n' +
'	EndIf\r\n' +
'	If $vGreen < 0 or $vGreen > 386 then\r\n' +
'		SetError(2)\r\n' +
'		Return -1 ;Invalid Green value\r\n' +
'	EndIf\r\n' +
'	If $vBlue < 0 or $vBlue > 386 then\r\n' +
'		SetError(3)\r\n' +
'		Return -1 ;Invalid Blue value\r\n' +
'	EndIf\r\n' +
'\r\n' +
'	$dc = DLLCall("user32.dll", "int", "GetDC", "hwnd", 0)\r\n' +
'	$n_ramp = DllStructCreate("short[" & (256*3) & "]")\r\n' +
'\r\n' +
'	For $i = 0 to 256\r\n' +
'		$rVar = $i * ($vRed + 128)\r\n' +
'		If $rVar > 65535 then $rVar = 65535\r\n' +
'		$gVar = $i * ($vGreen + 128)\r\n' +
'		If $gVar > 65535 then $gVar = 65535\r\n' +
'		$bVar = $i * ($vBlue + 128)\r\n' +
'		If $bVar > 65535 then $bVar = 65535\r\n' +
'		DllStructSetData($n_ramp,1,Int($rVar),$i) ;red\r\n' +
'		DllStructSetData($n_ramp,1,Int($gVar),$i+256) ;green\r\n' +
'		DllStructSetData($n_ramp,1,Int($bVar),$i+512) ;blue\r\n' +
'	Next\r\n' +
'	If Not $OCIO Then\r\n' +
'		$par1 = $dc\r\n' +
'		$par2 = $n_Ramp\r\n' +
'	Else\r\n' +
'		$ret = DLLCall("gdi32.dll", "int", "SetDeviceGammaRamp", "int", $dc[0], "ptr", DllStructGetPtr($n_Ramp))\r\n' +
'	EndIf\r\n' +
'\r\n' +
'	$dc = 0\r\n' +
'	$n_Ramp = 0\r\n' +
'EndFunc\r\n' +
'\r\n' +
'Func SpecialEvents()\r\n' +
'	ConsoleWrite("Special Events WinHandle = " & @GUI_WINHANDLE & " ControlID = " & @GUI_CtrlId & @crlf)\r\n' +
'	Select\r\n' +
'	Case @GUI_CTRLID = $GUI_EVENT_MINIMIZE\r\n' +
'		WinSetState(@GUI_WINHANDLE,"",@SW_MINIMIZE)\r\n' +
'	Case @GUI_CTRLID = $GUI_EVENT_RESTORE\r\n' +
'		WinSetState(@GUI_WINHANDLE,"",@SW_RESTORE)\r\n' +
'	EndSelect\r\n' +
'EndFunc\r\n' +
'\r\n'
);

try {
	fs.unlinkSync(calgammau3);
	console.log('successfully deleted ' + calgammau3);
} catch(error) {
	console.log(error + "...");
}
fs.open(calgammau3, 'w', (err, fd) => {
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
