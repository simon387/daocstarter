#NoTrayIcon;assicurarsi che la quarta riga del package.json sia nel formato=  "version": "x.x.x",
#include <Misc.au3>
#include <array.au3>
_Singleton(@ScriptName)
Global Const $VERSION = "1.0.1";StringReplace(StringReplace(FileReadLine("package.json", 4), '  "version": "', ""), '",', '')
Global Const $DIST_ZIP_PATH = @AppDataDir & "\daocstarter\" & $VERSION; & "\daocstarter-win32-x64"
Global Const $WORKINGDIR = $DIST_ZIP_PATH & "\dist\daocstarter-win32-x64"
Global Const $EXE = $WORKINGDIR & "\daocstarter.exe"
Global Const $TMP_ZIP_PATH = @TempDir & "\dist.zip"
;~ DirRemove($DIST_ZIP_PATH, 1)

If Not FileExists($EXE) Then
	FileInstall(".\dist.zip", $TMP_ZIP_PATH, 1);1=overwrite
	_Zip_UnzipAll($TMP_ZIP_PATH, $DIST_ZIP_PATH & '\')
EndIf
ShellExecute($EXE, "", $WORKINGDIR)

Func _Zip_UnzipAll($hZipFile, $hDestPath)
	If Not FileExists($hDestPath) Then DirCreate($hDestPath)
	Local $aArray[1], $oApp = ObjCreate("Shell.Application")
	$oApp.Namespace($hDestPath).CopyHere($oApp.Namespace($hZipFile).Items)
	For $item In $oApp.Namespace($hZipFile).Items
		_ArrayAdd($aArray, $item)
	Next
	While 1
		If ControlGetHandle("[CLASS:#32770]", "", "[CLASS:SysAnimate32; INSTANCE:1]") <> "" And WinGetState("[CLASS:#32770]") <> @SW_HIDE Then WinSetState(WinGetHandle("[CLASS:#32770]"), "", @SW_HIDE)
		If FileExists($hDestPath & "\" & $aArray[UBound($aArray) - 1]) Then Return SetError(0, 0, 1)
		Sleep(500)
	WEnd
EndFunc
