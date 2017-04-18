'use strict';

const {dialog} = require('electron').remote;

// Save edited row
$("#edit-setting-form-file").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editSetting=' + $('#edit-setting-id-file').val(), $(this).serialize(), (data) => {
		settingDataTable.ajax.reload();
		$('#edit-setting-modal-file').modal('hide');
	}).fail(() => {
		alert('Unable to save data, please try again later.');
	});
});

//form nuova per i file id=1
function editSettingRowFile(id) {
	let title = 'Select game.dll';
	let filters = [{name: 'game.dll', extensions: ['dll']}];
	let key = 'path.to.game.dll';
	switch (id) {
		case 1:
			break;
		case 2:
			title = 'Select user.dat';
			filters = [{name: 'user.dat', extensions: ['dat']}];
			key = 'path.to.user.dat';
			break;
		default:
			return;
	}
	dialog.showOpenDialog({title: title, filters: filters, properties: ['openFile', 'noResolveAliases']}, filePaths => {
		if (undefined != filePaths) {
			const plainObject = {'setting-value-file': filePaths[0].replace(/\\/g, "\\\\")};
			$.post(localhost + '?editSetting=' + key, plainObject, data => {
				settingDataTable.ajax.reload();
			}).fail(() => {
				alert('Unable to save data, please try again later.');
			});
		}
	});
}
