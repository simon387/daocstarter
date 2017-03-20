#NoTrayIcon
#include <Misc.au3>
#include <array.au3>
_Singleton(@ScriptName)
Global Const $VERSION = "1.0.0"
Global Const $DIST_ZIP_PATH = @AppDataDir & "\daocstarter\" & $VERSION; & "\daocstarter-win32-x64"
Global Const $WORKINGDIR = $DIST_ZIP_PATH & "\dist\daocstarter-win32-x64"
Global Const $EXE = $WORKINGDIR & "\daocstarter.exe"
Global Const $TMP_ZIP_PATH = @TempDir & "\dist.zip"
;~ DirRemove($DIST_ZIP_PATH, 1)

If Not FileExists($EXE) Then
	FileInstall(".\dist.zip", $TMP_ZIP_PATH, 1)
	_Zip_UnzipAll($TMP_ZIP_PATH, $DIST_ZIP_PATH & '\', 1);progress bar
EndIf
ShellExecute($EXE, "", $WORKINGDIR)

Func _Zip_UnzipAll($hZipFile, $hDestPath, $flag = 1)
	If _Zip_DllChk() <> 0 Then Return SetError(_Zip_DllChk(), 0, 0);no dll
	If Not FileExists($hZipFile) Then Return SetError(2, 0, 0) ;no zip file
	If Not FileExists($hDestPath) Then DirCreate($hDestPath)
	Local $aArray[1], $oApp = ObjCreate("Shell.Application")
	$oApp.Namespace($hDestPath).CopyHere($oApp.Namespace($hZipFile).Items)
	For $item In $oApp.Namespace($hZipFile).Items
		_ArrayAdd($aArray, $item)
	Next
	While 1
		If $flag = 1 then _Hide()
		If FileExists($hDestPath & "\" & $aArray[UBound($aArray) - 1]) Then Return SetError(0, 0, 1)
		Sleep(500)
	WEnd
EndFunc

Func _Zip_DllChk()
	If Not FileExists(@SystemDir & "\zipfldr.dll") Then Return 2
	If Not RegRead("HKEY_CLASSES_ROOT\CLSID\{E88DCCE0-B7B3-11d1-A9F0-00AA0060FA31}", "") Then Return 3
	Return 0
EndFunc

Func _Hide()
	If ControlGetHandle("[CLASS:#32770]", "", "[CLASS:SysAnimate32; INSTANCE:1]") <> "" And WinGetState("[CLASS:#32770]") <> @SW_HIDE	Then ;The Window Exists
		$hWnd = WinGetHandle("[CLASS:#32770]")
		WinSetState($hWnd, "", @SW_HIDE)
	EndIf
EndFunc
