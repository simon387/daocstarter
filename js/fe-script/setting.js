'use strict';

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

//edit selected row
function editSettingRowNumero(id) {
	ipcRenderer.send('editSettingNumber', id + '');
}
ipcRenderer.on('editSettingNumber-reply', (event, setting, id) => {
	document.getElementById('edit-setting-id-number').value = id;
	document.getElementById('setting-value-number').value = setting.value;
	$('#edit-setting-modal-number').modal('show');
});

function editSettingRowStringa(id) {
	ipcRenderer.send('editSettingStringa', id + '');
}
ipcRenderer.on('editSettingStringa-reply', (event, setting, id) => {
	document.getElementById('edit-setting-id-stringa').value = id;
	document.getElementById('setting-value-stringa').value = setting.value;
	$('#edit-setting-modal-stringa').modal('show');
});

// Save edited row
$('#edit-setting-modal-number').on('submit', event => {
	event.preventDefault();
	ipcRenderer.send('saveSettingNumber',
	document.getElementById('edit-setting-id-number').value,
	document.getElementById('setting-value-number').value
	);
});
ipcRenderer.on('saveSettingNumber-reply', event => {
	settingDataTable.ajax.reload();
	$('#edit-setting-modal-number').modal('hide');
});

$('#edit-setting-modal-stringa').on('submit', event => {
	event.preventDefault();
	ipcRenderer.send('saveSettingStringa',
	document.getElementById('edit-setting-id-stringa').value,
	document.getElementById('setting-value-stringa').value
	);
});
ipcRenderer.on('saveSettingStringa-reply', event => {
	settingDataTable.ajax.reload();
	$('#edit-setting-modal-stringa').modal('hide');
});

// playCharacter
function playTeamRow(id, fromFavourite = false) {
	/*
	let set = new Set();
	set.add(id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			set.add( checkedboxArray[i].id);
		}
	}*/
	ipcRenderer.send('playTeamRow', id);
}


function killTeamRow(id, fromFavourite = false) {
	/*
	ipcRenderer.send('killCharacter', id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			if (id != checkedboxArray[i].id) {
				ipcRenderer.send('killCharacter', checkedboxArray[i].id);
			}
		}
	}
	*/
	ipcRenderer.send('killTeamRow', id);
}
