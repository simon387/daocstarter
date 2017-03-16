#NoTrayIcon
#include "Zip.au3"
_Singleton(@ScriptName)



Global Const $VERSION = "1.0.0"
Global Const $PATH = @AppDataDir & "\daocstarter\" & $VERSION; & "\daocstarter-win32-x64"
If FileExists($PATH) Then
	giaInstallato()
Else
	DirCreate($PATH)
	$Zip = _Zip_Create($PATH & "\zip.zip")
	FileInstall(".\ffmpeg.exe",  @TempDir & "\ffmpeg.exe",  0)
	_Zip_AddFolder($Zip, @ScriptDir & "\dist\daocstarter-win32-x64", 4)
EndIf



;~ If Not(DirCreate($PATH)) Then Exit
;~ If Not()
;~ ShellExecute($PATH)

;~

;~ https://www.autoitscript.com/autoit3/docs/functions/ShellExecute.htm

Func giaInstallato()
	ConsoleWrite("Installation already done" & @CRLF)
	Exit
EndFunc

;~ Global Const $VBRSION_FILE = "version"
;~ Func getVersion()
;~ 	Local Const $handle = FileOpen($VBRSION_FILE, 0)
;~ 	Local Const $version = FileReadLine($handle, 1)
;~ 	FileClose($handle)
;~ 	return $version
;~ EndFunc

Func _Singleton($sOccurenceName, $iFlag = 0)
	Local Const $ERROR_ALREADY_EXISTS = 183
	Local Const $SECURITY_DESCRIPTOR_REVISION = 1
	Local $tSecurityAttributes = 0
	If BitAND($iFlag, 2) Then
		Local $tSecurityDescriptor = DllStructCreate("byte;byte;word;ptr[4]")
		Local $aRet = DllCall("advapi32.dll", "bool", "InitializeSecurityDescriptor", _
				"struct*", $tSecurityDescriptor, "dword", $SECURITY_DESCRIPTOR_REVISION)
		If @error Then Return SetError(@error, @extended, 0)
		If $aRet[0] Then
			$aRet = DllCall("advapi32.dll", "bool", "SetSecurityDescriptorDacl", _
					"struct*", $tSecurityDescriptor, "bool", 1, "ptr", 0, "bool", 0)
			If @error Then Return SetError(@error, @extended, 0)
			If $aRet[0] Then
				$tSecurityAttributes = DllStructCreate($tagSECURITY_ATTRIBUTES)
				DllStructSetData($tSecurityAttributes, 1, DllStructGetSize($tSecurityAttributes))
				DllStructSetData($tSecurityAttributes, 2, DllStructGetPtr($tSecurityDescriptor))
				DllStructSetData($tSecurityAttributes, 3, 0)
			EndIf
		EndIf
	EndIf
	Local $aHandle = DllCall("kernel32.dll", "handle", "CreateMutexW", "struct*", $tSecurityAttributes, "bool", 1, "wstr", $sOccurenceName)
	If @error Then Return SetError(@error, @extended, 0)
	Local $aLastError = DllCall("kernel32.dll", "dword", "GetLastError")
	If @error Then Return SetError(@error, @extended, 0)
	If $aLastError[0] = $ERROR_ALREADY_EXISTS Then
		If BitAND($iFlag, 1) Then
			DllCall("kernel32.dll", "bool", "CloseHandle", "handle", $aHandle[0])
			If @error Then Return SetError(@error, @extended, 0)
			Return SetError($aLastError[0], $aLastError[0], 0)
		Else
			Exit -1
		EndIf
	EndIf
	Return $aHandle[0]
EndFunc
