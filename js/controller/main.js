"use strict";
let localhost;
window.jQuery = window.$ = require('jquery');
const {ipcRenderer} = require('electron');
ipcRenderer.send('asynchronous-get-port', 'arg');
const datatable = require('datatables.net');

ipcRenderer.on('asynchronous-reply-get-port', (event, port) => {
	localhost = "http://localhost:" + port;

	datatable().$('#charactersDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxCharacter'
	});

	datatable().$('#settingsDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxSetting'
	});

	datatable().$('#accountsDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxAccount',
		columnDefs: [
			{
				
			}
		]
	});
})

//fa aprire le classi open-in-browser fuori dal main process
const shell = require('electron').shell;
$('.open-in-browser').click((event) => {
	event.preventDefault();
	shell.openExternal(event.target.href);
});
