"use strict";

module.exports = {
	getAllResolutions: function(response) {
		if (require('os').platform() != 'win32') {
			//console.log("Per ora il modulo vga-module funziona solo su windows");
			return response.send(["4096×2160"]);
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
			let match;
			let matches = new Set();
			while ((match = regexp.exec(str)) != null) {
				matches.add(match[0].slice(0, -2));
			}
			ps.dispose();
			response.send(Array.from(matches));
		})
		.catch(function(err){
			ps.dispose();
		});
	}
};
