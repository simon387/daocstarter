const shell = require('node-powershell');
const {dialog} = require('electron');

module.exports = {
	killMutants: function () {
		console.log("killMutants called!");
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

function _tryToKillMutants() {
	//https://nodejs.org/api/child_process.html#child_process_options_detached
	let spawn = require('child_process').spawn;
	const _getprocess = spawn('Get-Process', ['-name', 'game.dll']);
	const _select = spawn('select', ['-expand', 'id']);

	_getprocess.stdout.on('data', (data) => {
		_select.stdin.write(data);
	});

	_getprocess.stderr.on('data', (data) => {
		console.log(`ps stderr: ${data}`);
	});

	_getprocess.on('close', (code) => {
		if (code !== 0) {
			console.log(`getprocess process exited with code ${code}`);
		}
		_select.stdin.end();
	});

	_select.stdout.on('data', (data) => {
		console.log(data.toString());
	});

	_select.stderr.on('data', (data) => {
		console.log(`_select stderr: ${data}`);
	});

	_select.on('close', (code) => {
		if (code !== 0) {
			console.log(`_select process exited with code ${code}`);
		}
	});
}

function tryToKillMutants() {
	dialog.showMessageBox({message:"tryToKillMutants called "});
	let getProcess = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
	dialog.showMessageBox({message:"new shell "});
	getProcess.addCommand('Get-Process -name game.dll | select -expand id')
	.then(function() {
		dialog.showMessageBox({message:"returning invoke.. "});//si rompe qua l'exe
		///converti cosi http://stackoverflow.com/questions/42386995/not-able-to-call-powershell-from-nodejs
		return getProcess.invoke();
	})
	.then(function(output){
		dialog.showMessageBox({message:"splitting "});
		let aPID = output.split('\n');
		if (aPID instanceof Array) {
			dialog.showMessageBox({message:"e un array "});
			let ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
			dialog.showMessageBox({message:"new shell "});
			ps.addCommand('handle\\handle.exe -a -nobanner | findstr DAoCi')
			.then(function() {
				dialog.showMessageBox({message:"invoke() "});
				return ps.invoke();
			})
			.then(function(output2){
				console.log("A" + output2)
				dialog.showMessageBox({message:"a "});
				let aRighe = output2.split('\n');
				let aHex = [];
				if (aRighe instanceof Array) {
					dialog.showMessageBox({message:"is array true "});
					for (let i = 0; i < aRighe.length; i++) {
						let foo = aRighe[i].split(':');
						aHex.push(foo[0]);
					}
					if (aHex instanceof Array) {
						dialog.showMessageBox({message:"calling killhandles "});
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
		dialog.showMessageBox({message:"err"});
		dialog.showMessageBox({message:err});
		getProcess.dispose();
	});
}

function killHandles (aPID, aHex) {
	dialog.showMessageBox({message:"killhjandles called "});
	for (let p = 0; p < aPID.length; p++) {
		aPID[p] = aPID[p].replace(/[\n\r]/g, '');
	}
	for (let h = 0; h < aHex.length; h++) {
		aHex[h] = aHex[h].replace(/\ +/g, '');
	}
	console.log(aPID)
	console.log(aHex)
	dialog.showMessageBox({message:"dio cane ? "});
	dialog.showMessageBox({message:aPID.toString()});
	dialog.showMessageBox({message:aHex.toString()});
	for (p = 0; p < aPID.length; p++) {
		for (h = 0; h < aHex.length; h++) {
			let getProcess = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
			if (aHex[h] != '' && aPID[p] != '' ) {
				dialog.showMessageBox({message:'handle\\handle.exe -c ' + aHex[h] + ' -y -p ' + aPID[p]});
				console.log('handle\\handle.exe -c ' + aHex[h] + ' -y -p ' + aPID[p]);
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
