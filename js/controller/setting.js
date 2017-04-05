"use strict";

// Save edited row
$("#edit-setting-form-file").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editSetting=' + $('#edit-setting-id-file').val(), $(this).serialize(), (data) => {
		const tr = $('a[href="javascript:editSettingRowFile(' + $('#edit-setting-id-file').val() + ');"]').parent().parent();
		$('td:eq(2)', tr).html(data.value);
		$('#edit-setting-modal-file').modal('hide');
	}).fail(() => {
		alert('Unable to save data, please try again later.');
	});
});

//form nuova per i file id=1
function editSettingRowFile(id) {
	const {dialog} = require('electron').remote;
	let title = "Select game.dll";
	let filters = [{name:"game.dll", extensions:['dll']}];
	switch (id) {
		case 1:
			break;
		case 2:
			title = "Select user.dat";
			filters = [{name:"user.dat", extensions:['dat']}];
			break;
		default:
			return;
	}
	dialog.showOpenDialog({title:title, filters:filters, properties:['openFile', 'noResolveAliases']}, (filePaths) => {
		if (undefined != filePaths) {
			const plainObject = {'setting-value-file':filePaths[0].replace(/\\/g, "\\\\")};
			$.post(localhost + '?editSetting=' + id, plainObject, (data) => {
				const tr = $('a[href="javascript:editSettingRowFile(' + id + ');"]').parent().parent();
				$('td:eq(2)', tr).html(filePaths[0]);
			}).fail(() => {
				alert('Unable to save data, please try again later.');
			});
		}
	});
}
