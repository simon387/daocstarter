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
