module.exports = {
	getAllResolutions: function() {
		if (require('os').platform() != 'win32') {
			return;
		}
		let shell = require('node-powershell');
		let ps = new shell({executionPolicy: 'Bypass', debugMsg: false, noProfile: true});
		ps.addCommand('Get-WMIObject -query "SELECT * FROM CIM_VideoControllerResolution" | Select Caption')
			.then(function() {
				return ps.invoke();
			})
			.then(function(output){
				let str = output.replace(/[\n\r]/g, '').replace(/ +/g, '');
				let regexp = /\d+x\d+x\d/g;
				let match, matches = [];
				while ((match = regexp.exec(str)) != null) {
					matches.push(match[0].slice(0, -2));
				}
				ps.dispose();
				return matches;
			})
			.catch(function(err){
				ps.dispose();
			});
	}
}
