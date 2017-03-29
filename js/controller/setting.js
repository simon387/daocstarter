"use strict";

// Save edited row
$("#edit-setting-form-file").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editSetting=' + $('#edit-setting-id-file').val(), $(this).serialize(), function(data) {
		var tr = $('a[href="javascript:editSettingRowFile(' + $('#edit-setting-id-file').val() + ');"]').parent().parent();
		$('td:eq(2)', tr).html(data.value);
		$('#edit-setting-modal-file').modal('hide');
	}).fail(function() {
		console.log("Unable to save data, please try again later.");
		alert('Unable to save data, please try again later.');
	});
});
// Edit row file
function _editSettingRowFile(id) {
	//se id > 1 va bene!!
	if ('undefined' != typeof id) {
		$.getJSON(localhost + '?editSetting=' + id, function(obj) {
			$('#edit-setting-id-file').val(obj._id);
			//$('#setting-value-file').val(obj.value);  !!!!!!!  rimuovi00 se è file selector
			$('#edit-setting-modal-file').modal('show')
		}).fail(function() {
			alert('Unable to edit setting.')
		});
	} else {
		alert('Unknown setting id.');
	}
}

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
	dialog.showOpenDialog({title:title, filters:filters, properties:['openFile', 'noResolveAliases']}, function(filePaths) {
		if (undefined != filePaths) {
			let plainObject = {'setting-value-file':filePaths[0].replace(/\\/g, "\\\\")};
			$.post(localhost + '?editSetting=1', plainObject, function(data) {
				var tr = $('a[href="javascript:editSettingRowFile(1);"]').parent().parent();
				$('td:eq(2)', tr).html(filePaths[0]);
			}).fail(function() {
				console.log("Unable to save data, please try again later.");
				alert('Unable to save data, please try again later.');
			});
		}
	});
}
