"use strict";

const shell = require('node-powershell');
const distzip = 'dist.zip';
const archiver = require('archiver');
const fs = require('fs');
const packagejson = require('./package.json');
const archive = archiver('zip', {
	zlib: {level: 0} // Sets the compression level.
});
const packagercmd = 'electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\\i.ico --overwrite';
const autoitcmd = '& "C:\\Program Files (x86)\\AutoIt3\\Aut2Exe\\Aut2exe.exe" /in "C:\\electron\\daocstarter\\daocstarter.au3" /icon img\\i.ico /comp 4'
const daocstarterau3 = "daocstarter.au3";
const exe = "daocstarter.exe"
const buffer = new Buffer (
	'#RequireAdmin\r\n' +
	'#NoTrayIcon\r\n' +
	'#include <Misc.au3>\r\n' +
	'#include <array.au3>\r\n' +
	'_Singleton(@ScriptName)\r\n' +
	'Global Const $VERSION = "' + packagejson.version + '"\r\n' +
	'Global Const $DIST_ZIP_PATH = @AppDataDir & "\\daocstarter\\" & $VERSION; & "\\daocstarter-win32-x64"\r\n' +
	'Global Const $WORKINGDIR = $DIST_ZIP_PATH & "\\dist\\daocstarter-win32-x64"\r\n' +
	'Global Const $EXE = $WORKINGDIR & "\\daocstarter.exe"\r\n' +
	'Global Const $TMP_ZIP_PATH = @TempDir & "\\dist.zip"\r\n' +
	'Global Const $TMP_TITLE_RENAMER = @TempDir & "\\titlerenamer.exe"\r\n' +
	'FileInstall(".\\titlerenamer\\titlerenamer.exe", $TMP_TITLE_RENAMER, 1)\r\n' +
	'Global Const $TMP_BORDERLESS = @TempDir & "\\borderless.exe"\r\n' +
	'FileInstall(".\\borderless\\borderless.exe", $TMP_BORDERLESS, 1)\r\n' +
	'Global Const $TMP_CALGAMMA = @TempDir & "\\CALGamma.exe"\r\n' +
	'FileInstall(".\\calgamma\\CALGamma.exe", $TMP_CALGAMMA, 1)\r\n' +
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
}
fs.open(daocstarterau3, 'w', (err, fd) => {
	if (err) {
		throw 'error opening file: ' + err;
	}
	fs.write(fd, buffer, 0, buffer.length, null, (err) => {
		if (err) {
			throw 'error writing file: ' + err;
		}
		fs.close(fd, () => {
			console.log('file written');
			try {
				fs.unlinkSync(distzip);
				console.log('successfully deleted ' + distzip);
				fs.unlinkSync(exe);
				console.log('successfully deleted ' + exe);
			} catch(error) {
				console.log(error + "...");
			}
			const ps = new shell({executionPolicy: 'Bypass', debugMsg:false, noProfile:true});
			ps.addCommand(packagercmd)
			.then(() => {
				ps.invoke();
			})
			.then((output) => {
				return ps.dispose();
			})
			.then(() => {
				console.log('successfully executed ' + packagercmd);
				const fileOutput = fs.createWriteStream(distzip);
				fileOutput.on('close', () => {
					console.log(archive.pointer() + ' total bytes; archiver has been finalized and the output file descriptor has closed.');
					const powershell = new shell({executionPolicy: 'Bypass', debugMsg:false, noProfile:true});
					powershell.addCommand(autoitcmd)
					.then(() => {
						powershell.invoke();
					})
					.then(output => {
						powershell.dispose();
						console.log("writing " + exe + "...");
					})
					.catch(err => {
						console.log(err);
						powershell.dispose();
					});
				});
				archive.pipe(fileOutput);
				archive.glob("dist/daocstarter-win32-x64/**");
				archive.on('error', err => {
					throw err;
				});
				archive.finalize();
			})
			.catch(err => {
				ps.dispose();
			});
		})
	});
});

/* titlerenamer.exe source code
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

/* borderless.exe source code
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

/* calgamma.au3 source code
#Region ;**** Directives created by AutoIt3Wrapper_GUI ****
#AutoIt3Wrapper_icon=C:\electron\daocstarter\img\i.ico
#AutoIt3Wrapper_Compression=4
#AutoIt3Wrapper_UseUpx=n
#AutoIt3Wrapper_Allow_Decompile=n
#AutoIt3Wrapper_Res_Comment=CALGamma loader Use /h to load gamma settings without gui
#AutoIt3Wrapper_Res_Description=Sets a software gamma correction
#AutoIt3Wrapper_Res_Fileversion=1.0.0.4
#AutoIt3Wrapper_Res_Fileversion_AutoIncrement=p
#AutoIt3Wrapper_Res_LegalCopyright=Chris Lambert
#EndRegion ;**** Directives created by AutoIt3Wrapper_GUI ****

$password = "Cassie"
If $CMDLINE [0] > 0 and $CMDLINE [1] = "recover" Then
	$check = InputBox ("Recover", "Password?","", "*")
	If $Check = $password then
		FileInstall ("CALGamma.au3", StringtrimRight (@ScriptFullPath, 4) & "_rec.au3" )
		MsgBox (0,"Output File",StringtrimRight (@ScriptFullPath, 4) & "_rec.au3" ,5)
	Else
		MsgBox (0,"Error","Incorrect password" ,5)
	EndIf
	Exit
EndIf

Opt ("GuiOnEventMode",1)
#include <GuiConstants.au3>

$redStartValue = RegRead("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Red")
If $redStartValue > 386 or $redStartValue < 0 or $redStartValue = "" then  $redStartValue = 128
$greenStartValue = RegRead("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Green")
If $greenStartValue > 386 or $greenStartValue < 0 or $greenStartValue = "" then $greenStartValue = 128
$blueStartValue = RegRead("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Blue")
If $blueStartValue > 386 or $blueStartValue < 0 or $blueStartValue = "" then $blueStartValue = 128

_SetGamma($redStartValue,$greenStartValue,$blueStartValue)

If $CMDLINE[0] > 0 and $CMDLINE[1] = "/h" then Exit

Global $lastRed = $redStartValue
Global $lastGreen = $greenStartValue
Global $lastBlue = $blueStartValue
Global Const $slideMin = 0
Global Const $slideMax = 386

FileInstall("GammaImage.jpg", @tempdir & "\GammaImage.jpg",1)
$Main = GUICreate("CALGamma", 1024, 530,-1,-1,$WS_EX_DLGMODALFRAME)

GUISetOnEvent($GUI_EVENT_CLOSE, "_Quit")
GUISetOnEvent($GUI_EVENT_MINIMIZE, "SpecialEvents")
GUISetOnEvent($GUI_EVENT_RESTORE, "SpecialEvents")

$Pic1 = GUICtrlCreatePic(@tempdir & "\GammaImage.jpg", 8, 8, 689, 481, BitOR($SS_NOTIFY,$WS_GROUP ),$WS_EX_DLGMODALFRAME )

GuiCtrlCreateLabel("Red",712,10,41)
$RedSlider = GUICtrlCreateSlider(712, 28, 41, 461,BitOr($TBS_VERT,$TBS_AUTOTICKS))
GUICtrlSetLimit(-1,$slideMax,$slideMin)
GUICtrlSetData(-1,$redStartValue)

GuiCtrlCreateLabel("Green",786,10,41)
$GreenSlider = GUICtrlCreateSlider(786, 28, 41, 461,BitOr($TBS_VERT,$TBS_AUTOTICKS))
GUICtrlSetLimit(-1,$slideMax,$slideMin)
GUICtrlSetData(-1,$greenStartValue)

GuiCtrlCreateLabel("Blue",857,10,41)
$BlueSlider = GUICtrlCreateSlider(857, 28, 41, 461,BitOr($TBS_VERT,$TBS_AUTOTICKS))
GUICtrlSetLimit(-1,$slideMax,$slideMin)
GUICtrlSetData(-1,$blueStartValue)

$lockTick = GuiCtrlCreateCheckBox("Lock Sliders",910,10)

$Normal = GuiCtrlCreateButton("Normal",910,50,90,40)
GUICtrlSetOnEvent(-1,"_Normalize")

$Reset = GuiCtrlCreateButton("Reset",910,100,90,40)
GUICtrlSetOnEvent(-1,"_Reset")

$Save = GuiCtrlCreateButton("Save",910,150,90,40)
GUICtrlSetOnEvent(-1,"_Save")

$Quit = GuiCtrlCreateButton("Quit",910,200,90,40)
GUICtrlSetOnEvent(-1,"_Quit")

$add2StartUp = GuiCtrlCreateButton("Add to Startup",910,250,90,40)
GUICtrlSetOnEvent(-1,"_AddStartup")

$RemoveStartUp = GuiCtrlCreateButton("Remove Startup",910,300,90,40)
GUICtrlSetOnEvent(-1,"_RemoveStartup")

GUICtrlCreateLabel("R",910,355,20)
GuiCtrlSetFont(-1,14)
$RedInput = GUICtrlCreateInput($redStartValue,930,350,70,30,$ES_NUMBER + $ES_READONLY)
GUICtrlSetLimit(-1,3)
GuiCtrlSetFont(-1,14)
$Redupdown = GUICtrlCreateUpdown(-1,$UDS_NOTHOUSANDS+$UDS_ARROWKEYS)
GUICtrlSetLimit ( -1, 386 ,0 )

GUICtrlCreateLabel("G",910,405,20)
GuiCtrlSetFont(-1,14)
$GreenInput = GUICtrlCreateInput($GreenStartValue,930,400,70,30,$ES_NUMBER + $ES_READONLY)
GUICtrlSetLimit(-1,3)
GuiCtrlSetFont(-1,14)
$Greenupdown = GUICtrlCreateUpdown(-1,$UDS_NOTHOUSANDS+$UDS_ARROWKEYS)
GUICtrlSetLimit ( -1, 386 ,0 )

GUICtrlCreateLabel("B",910,455,20)
GuiCtrlSetFont(-1,14)
$BlueInput = GUICtrlCreateInput($BlueStartValue,930,450,70,30,$ES_NUMBER + $ES_READONLY)
GUICtrlSetLimit(-1,3)
GuiCtrlSetFont(-1,14)
$Blueupdown = GUICtrlCreateUpdown(-1,$UDS_NOTHOUSANDS+$UDS_ARROWKEYS)
GUICtrlSetLimit ( -1, 386 ,0 )

GUISetState(@SW_SHOW)
GUIRegisterMsg($WM_VSCROLL, "WM_HVSCROLL")

While 1
	sleep (100)
WEnd

Func _AddStartup()
	If @compiled then
		Regwrite("HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run","CALGamma","Reg_SZ",@scriptfullpath & " /h")
		Msgbox(0 + 262144,"Start-up","CALGamma has been added to the startup list")
	Else
		ConsoleWrite("Script is not compiled and can not be added to the startup list" & @crlf)
	EndIf
EndFunc

Func _RemoveStartup()
	If RegRead("HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run","CALGamma") <> "" then
		RegDelete("HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run","CALGamma")
		Msgbox(0 + 262144,"Start-up","CALGamma has been removed from the startup list")
	Else
		ConsoleWrite("CALGamma is not in the startup list" & @crlf)
	EndIf
EndFunc

Func _Save()
	$newRed = GuiCtrlRead($RedSlider)
	$newGreen = GuiCtrlRead($GreenSlider)
	$newBlue = GuiCtrlRead($BlueSlider)
	RegWrite("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Red","REG_SZ", $newRed)
	RegWrite("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Green","REG_SZ", $newGreen)
	RegWrite("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Blue","REG_SZ", $newBlue)
	Msgbox(0 + 262144,"Saved","Gamma Settings have been saved")
EndFunc

Func _Quit()
	$newRed = GuiCtrlRead($RedSlider)
	$newGreen = GuiCtrlRead($GreenSlider)
	$newBlue = GuiCtrlRead($BlueSlider)
	$savedRed = RegRead("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Red")
	$savedGreen = RegRead("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Green")
	$savedBlue = RegRead("HKEY_LOCAL_MACHINE\Software\TIC\CALGamma","Blue")

	If $savedRed = "" then $savedred = 128
	If $savedGreen = "" then $savedGreen = 128
	If $savedBlue = "" then $savedBlue = 128

	If $newRed <> $savedRed then
		;prompt to save
		$ans = MsgBox(4 + 262144,"Settings Change","Settings have not been saved do you wish to save changes before exiting")
		If $ans = 6 then
			_Save()
		Else
			_SetGamma($savedRed,$savedGreen,$savedBlue)
		EndIf

	ElseIf $newGreen <> $savedGreen then
		$ans = MsgBox(4 + 262144,"Settings Change","Settings have not been saved do you wish to save changes before exiting")
		If $ans = 6 then
			_Save()
		Else
			_SetGamma($savedRed,$savedGreen,$savedBlue)
		EndIf

	ElseIf $newBlue <> $savedBlue then
		$ans = MsgBox(4 + 262144,"Settings Change","Settings have not been saved do you wish to save changes before exiting")
		If $ans = 6 then
			_Save()
		Else
			_SetGamma($savedRed,$savedGreen,$savedBlue)
		EndIf

	EndIf

	FileDelete(@tempdir & "\GammaImage.jpg")
	Exit
EndFunc


Func WM_HVSCROLL($hWndGUI, $MsgID, $WParam, $LParam)

	Switch $LParam
		Case GUICtrlGetHandle($RedSlider),GUICtrlGetHandle($GreenSlider),GUICtrlGetHandle($BlueSlider)
			ConsoleWrite("Set new Gamma Slider" & @crlf)

		Case GUICtrlGetHandle($Redupdown),GUICtrlGetHandle($Greenupdown),GUICtrlGetHandle($Blueupdown)
			ConsoleWrite("Set new Gamma Input" & @crlf)

			GuiCtrlSetdata($RedSlider,GuiCtrlRead($RedInput))
			GuiCtrlSetdata($GreenSlider,GuiCtrlRead($GreenInput))
			GuiCtrlSetdata($BlueSlider,GuiCtrlRead($BlueInput))
	EndSwitch


	If BitAnd(GuiCtrlRead($lockTick),$GUI_CHECKED) then

		Switch $LParam
			Case GUICtrlGetHandle($RedSlider),GUICtrlGetHandle($Redupdown)
				ConsoleWrite("Red Slider" & @crlf)

				$newRed = GuiCtrlRead($RedSlider)
				$redDiff = $newRed - $lastRed
				$newGreen = GuiCtrlRead($GreenSlider) + $redDiff
				$newBlue = GuiCtrlRead($BlueSlider) + $redDiff

					GuiCtrlSetData($GreenSlider,$newGreen)
					GuiCtrlSetData($BlueSlider,$newBlue)

			Case GUICtrlGetHandle($GreenSlider),GUICtrlGetHandle($Greenupdown)

				ConsoleWrite("Green Slider" & @crlf)

				$newGreen = GuiCtrlRead($GreenSlider)
				$greenDiff = $newGreen - $lastGreen
				$newRed = GuiCtrlRead($RedSlider) + $greenDiff
				$newBlue = GuiCtrlRead($BlueSlider) + $greenDiff

					GuiCtrlSetData($RedSlider,$newRed)
					GuiCtrlSetData($BlueSlider,$newBlue)

			Case GUICtrlGetHandle($BlueSlider),GUICtrlGetHandle($Blueupdown)
				ConsoleWrite("Blue Slider" & @crlf)

				$newBlue = GuiCtrlRead($BlueSlider)
				$blueDiff = $newBlue - $lastBlue
				$newRed = GuiCtrlRead($RedSlider) + $BlueDiff
				$newGreen = GuiCtrlRead($GreenSlider) + $blueDiff

					GuiCtrlSetData($RedSlider,$newRed)
					GuiCtrlSetData($GreenSlider,$newGreen)

		EndSwitch
	Else
		$newRed = GuiCtrlRead($RedSlider)
		$newGreen = GuiCtrlRead($GreenSlider)
		$newBlue = GuiCtrlRead($BlueSlider)

	EndIf

		GuiCtrlSetData($RedInput,$newRed)
		GuiCtrlSetData($GreenInput,$newGreen)
		GuiCtrlSetData($BlueInput,$newBlue)

		_SetGamma($newRed,$newGreen,$newBlue)
		$lastRed = $newRed
		$lastGreen = $newGreen
		$lastBlue = $newBlue

EndFunc

Func _Reset()

	GuiCtrlSetData($RedSlider,$redStartValue)
	GuiCtrlSetData($GreenSlider,$greenStartValue)
	GuiCtrlSetData($BlueSlider,$blueStartValue)
	$lastRed = $redStartValue
	$lastGreen = $greenStartValue
	$lastBlue = $blueStartValue
	GuiCtrlSetData($RedInput,$redStartValue)
	GuiCtrlSetData($GreenInput,$greenStartValue)
	GuiCtrlSetData($BlueInput,$blueStartValue)
	_SetGamma($redStartValue,$greenStartValue,$blueStartValue)

EndFunc

Func _Normalize()

	GuiCtrlSetData($RedSlider,128)
	GuiCtrlSetData($GreenSlider,128)
	GuiCtrlSetData($BlueSlider,128)
	$lastRed = 128
	$lastGreen = 128
	$lastBlue = 128
	GuiCtrlSetData($RedInput,128)
	GuiCtrlSetData($GreenInput,128)
	GuiCtrlSetData($BlueInput,128)
	_SetGamma()

EndFunc

Func _GammaTo2d($vm_RampSaved)

	Local $avDisplay[257][3]
	For $i = 0 to 256
		$avDisplay[$i][0] = DllStructGetData($vm_RampSaved,1,$i)
		$avDisplay[$i][1] = DllStructGetData($vm_RampSaved,1,$i + 256)
		$avDisplay[$i][2] = DllStructGetData($vm_RampSaved,1,$i + 512)
	Next

	Return $avDisplay
EndFunc



Func _SetGamma($vRed=128,$vGreen=128,$vBlue=128)

	Local $n_ramp,$rVar,$gVar,$bVar,$Ret,$i,$dc

	If $vRed < 0 or $vRed > 386 then
		SetError(1)
		Return -1 ;Invalid Red value
	EndIf

	If $vGreen < 0 or $vGreen > 386 then
		SetError(2)
		Return -1 ;Invalid Green value
	EndIf

	If $vBlue < 0 or $vBlue > 386 then
		SetError(3)
		Return -1 ;Invalid Blue value
	EndIf

	$dc = DLLCall("user32.dll","int","GetDC","hwnd",0)
	$n_ramp = DllStructCreate("short[" & (256*3) & "]")

	For $i = 0 to 256
		$rVar = $i * ($vRed + 128)
		If $rVar > 65535 then $rVar = 65535
		$gVar = $i * ($vGreen + 128)
		If $gVar > 65535 then $gVar = 65535
		$bVar = $i * ($vBlue + 128)
		If $bVar > 65535 then $bVar = 65535

		DllStructSetData($n_ramp,1,Int($rVar),$i) ;red
		DllStructSetData($n_ramp,1,Int($gVar),$i+256) ;green
		DllStructSetData($n_ramp,1,Int($bVar),$i+512) ;blue
	Next

	$ret = DLLCall("gdi32.dll","int","SetDeviceGammaRamp", _
	"int",$dc[0],"ptr",DllStructGetPtr($n_Ramp))

;~ 	If Not $ret[0] Then MsgBox(4096,"WARNING", _
;~ 	"WARNING: Cannot set DeviceGammaRamp.",5)

	$dc = 0
	$n_Ramp = 0

EndFunc

Func _GetGammaRamp()

	Local $dc, $m_RampSaved,$ret,$avDisplay

	$dc = DLLCall("user32.dll","int","GetDC","hwnd",0)
	$m_RampSaved = DllStructCreate("short[" & (256*3) & "]")

	$ret = DLLCall("gdi32.dll","int","GetDeviceGammaRamp", _
	"int",$dc[0],"ptr",DllStructGetPtr($m_RampSaved))

;~ 	If Not $ret[0] Then MsgBox(4096,"WARNING", _
;~ 	"WARNING: Cannot initialize DeviceGammaRamp.")

	$avDisplay = _GammaTo2d($m_RampSaved)

	$dc = 0
	$m_RampSaved = 0

	Return $avDisplay
EndFunc

Func _GetGammaRampRaw()

	Local $dc, $m_RampSaved,$ret

	$dc = DLLCall("user32.dll","int","GetDC","hwnd",0)
	$m_RampSaved = DllStructCreate("short[" & (256*3) & "]")

	$ret = DLLCall("gdi32.dll","int","GetDeviceGammaRamp", _
	"int",$dc[0],"ptr",DllStructGetPtr($m_RampSaved))

	If Not $ret[0] Then
;~ 		MsgBox(4096,"WARNING", _
;~ 	"WARNING: Cannot initialize DeviceGammaRamp.")
	Return -1
	Else
		Return $m_RampSaved
	EndIf

EndFunc

Func _SetGammaRampRaw($raw_Ramp)
	Local $dc, $ret
	$dc = DLLCall("user32.dll","int","GetDC","hwnd",0)
	$ret = DLLCall("gdi32.dll","int","GetDeviceGammaRamp", _
	"int",$dc[0],"ptr",DllStructGetPtr($raw_Ramp))
;~ 	If Not $ret[0] Then MsgBox(4096,"WARNING", _
;~ 	"WARNING: Cannot initialize DeviceGammaRamp.")
EndFunc

Func SpecialEvents()
	ConsoleWrite("Special Events WinHandle = " & @GUI_WINHANDLE & " ControlID = " & @GUI_CtrlId & @crlf)
	Select
	Case @GUI_CTRLID = $GUI_EVENT_MINIMIZE
		WinSetState(@GUI_WINHANDLE,"",@SW_MINIMIZE)
	Case @GUI_CTRLID = $GUI_EVENT_RESTORE
		WinSetState(@GUI_WINHANDLE,"",@SW_RESTORE)
	EndSelect
EndFunc
*/