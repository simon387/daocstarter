const shell = require('node-powershell');
const {dialog} = require('electron');

module.exports = {
	killMutants: function () {
	
		if (require('os').platform() != 'win32') {
			return;
		}

		var exec = require('child_process').exec; 
		exec('NET SESSION', function(err,so,se) {
			let admin = se.length === 0 ? true : false;
			if (admin) {
				tryToKillMutants();
			} else {
				dialog.showMessageBox({message:"non sei admin!"});
				tryToKillMutants();
			}
		});
	}
}

function tryToKillMutants() {
	let getProcess = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
	getProcess.addCommand('Get-Process -name game.dll | select -expand id')
	.then(function() {
		return getProcess.invoke();
	})
	.then(function(output){
		let aPID = output.split('\n')
		if (aPID instanceof Array) {
			let ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
			ps.addCommand('handle\\handle.exe -a -nobanner | findstr DAoCi')
			.then(function() {
				return ps.invoke();
			})
			.then(function(output2){
				console.log("A" + output2)
				let aRighe = output2.split('\n')
				let aHex = [];
				if (aRighe instanceof Array) {
					for (let i = 0; i < aRighe.length; i++) {
						let foo = aRighe[i].split(':');
						aHex.push(foo[0]);
					}
					if (aHex instanceof Array) {
						killHandles (aPID, aHex);
					}
				}
				ps.dispose();
			})
			.catch(function(err){
				ps.dispose();
			});
		}
		getProcess.dispose();
	})
	.catch(function(err){
		getProcess.dispose();
	});
}

function killHandles (aPID, aHex) {
	console.log(aPID)
	console.log(aHex)
	for (p = 0; p < aPID.length; p++) {
		for (h = 0; h < aHex.length; h++) {
			let getProcess = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
			if (aHex[h] != '' && aPID[p] != '' ) {
				dialog.showMessageBox({message:'handle\\handle.exe -c ' + aHex[h] + ' -y -p ' + aPID[p]});
				getProcess.addCommand('handle\\handle.exe -c ' + aHex[h] + ' -y -p ' + aPID[p])
				.then(function() {
					return getProcess.invoke();
				})
				.then(function(output){
					getProcess.dispose();
				})
				.catch(function(err){
					getProcess.dispose();
				});
			}
		}
	}
}

/* traduciti questo da autoit !
If IsAdmin() <> 1 Then GUICtrlSetData($Label_, "No admin priv. !")
FileInstall("C:\Users\Simone\Google Drive\dev\AUTOIT\DAoC_Starter\handle.exe", @TempDir & "\handle.exe");FileInstall("C:\ZZZ\AUTOIT\DAoC_Starter\Eula.txt", $path & "\Eula.txt")
Local $array = ProcessList("game.dll"), $file, $hex
If IsArray($array) == 1 Then
	FileDelete(@TempDir & "\tmp")
	For $i = 1 To $array[0][0]
		RunWait(@ComSpec & ' /c "' & @TempDir & '\handle" -a -p ' & $array[$i][1] & ' >> tmp', @TempDir, @SW_HIDE)
		Local $file = FileOpen(@TempDir & "\tmp", 0)
		If $file = -1 Then Return
		While 1
			$line = FileReadLine($file)
			If @error = -1 Then ExitLoop
			If StringInStr($line, "BaseNamedObjects\DAoC") <> 0 Then;mutex delle #istanze e dell'IP_reame
				$line = StringStripWS($line, 8)
				$hex = StringSplit($line, ":")
				ShellExecuteWait(@TempDir & "\handle.exe", "-c " & $hex[1] & " -y -p " & $array[$i][1], @TempDir, Default, @SW_HIDE)
			EndIf
		WEnd
		FileClose($file)
		FileDelete(@TempDir & "\tmp")
	Next
EndIf
*/
