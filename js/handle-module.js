module.exports = {
	test: function () {
		console.log("test?");
		if (require('os').platform() != 'win32') {
			return;
		}

		var exec = require('child_process').exec; 
		exec('NET SESSION', function(err,so,se) {
			let admin = se.length === 0 ? true : false;
			if (admin) {
				//TODO
			} else {
				console.log("non sei admin!");
				//dialog.showErrorBox("error", "you are not running AS ADMIN! you can run only 2 clients at the same time! Run as Admin to avoid this message");
			}
		});

		/*let spawn = require('child_process').spawn;
		let prc = spawn("handle\\handle.exe > tmp", ["-a"], {
			//cwd:path.dirname(), 
			setsid:false,
			detached:true,
		});*/

		let shell = require('node-powershell');
		let ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
		ps.addCommand('handle\\handle.exe -a -nobanner > tmp')
		.then(function() {
			return ps.invoke();
		})
		.then(function(output){
			console.log("ha finito la scrittura? leggiamo");
			//ha finito la scrittura? leggiamo
			var fs = require('fs');
			var stream = fs.createReadStream("tmpf");
			var found = false;
			stream.on('data',function(d){
				if(!found) found=!!(''+d).match("daoci")
			});
			stream.on('error',function(err){
				console.log(err);
				console.log(found);
			});
			stream.on('close',function(err){
				console.log(err);
				console.log(found);
			});




			//console.log(output)
			/*let str = output.replace(/[\n\r]/g, '').replace(/ +/g, '');
			let regexp = /\d+x\d+x\d/g;
			let match, matches = [];
			while ((match = regexp.exec(str)) != null) {
				matches.push(match[0].slice(0, -2));
			}*/
			ps.dispose();
			//response.send(matches);
		})
		.catch(function(err){
			ps.dispose();
		});

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
