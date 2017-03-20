module.exports = {
	updateCheck: function () {
		//getta www.simonecelia.it/daocstarter/version.html
		//vedi se è da aggiornare
		//casomai pop up https://github.com/simon387/daocstarter/releases

		var request = require('request');
		request({'url':'http://www.simonecelia.it','path':'/daocstarter/version.html',//'url':'http://www.google.it',
				'proxy':'http://proxy.reply.it'}, function (error, response, body) {
					console.log(error)
					console.log(body)
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		});


/*
		let http = require('http');

		let options = {
			host: 'www.simonecelia.it',
			path: '/daocstarter/version.html'
		}
		let request = http.request(options, function (res) {
			let data = '';
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				console.log(data);

			});
		});
		request.on('error', function (e) {
			console.log(e.message);
			console.log("try behind proxy:")

			let options2 = {
				host: "proxy.reply.it",
				port: 8080,
				path: "www.simonecelia.it/daocstarter/version.html",
				headers: {
					Host: "www.simonecelia.it"
				}
			};
			console.log(";(")
			let request = http.request(options2, function (res) {
				console.log(";(")
				let data = '';
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					console.log(data);

				});
			});
			request.on('error', function (e) {console.log(e.message);});

		});
		request.end();


		*/
	}
}