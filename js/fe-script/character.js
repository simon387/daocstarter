'use strict';

function refreshModalCombos() {
	refreshComboByFetchAndSelector('?getAllAccountsNames', '.character-account-dropdown', "");
	refreshComboByFetchAndSelector('?getAllServersNames', '.character-servers-dropdown', "");
	refreshComboByFetchAndSelector('?getAllClassesNames', '.character-classes-dropdown', "");
	refreshComboByFetchAndSelector('?getAllResolutions', '.character-resolution-dropdown', "");
}
// Add new row
$('#add-character-form').on('submit', function(event) {
	event.preventDefault();
	$.post(localhost + '?addCharacter', $(this).serialize(), character => {
		characterDataTable.ajax.reload();
		$(renderFavourites);
		$('#add-character-modal').modal('hide');
	}).fail(() => {
		alert('Unable to Add new character');
	});
});
// Remove row
function removeCharacterRow(id) {
	if (undefined != typeof id) {
		$.get(localhost + '?removeCharacter=' + id, () => {
			characterDataTable.ajax.reload();
			$(renderFavourites);
		}).fail(() => {
			alert('unable to remove row.')
		});
	} else {
		alert('Unknown row id.');
	}
}
// Edit row
function editCharacterRow(id) {
	if (undefined != typeof id) {
		$.getJSON(localhost + '?editCharacter=' + id, (obj) => {
			$('#edit-character-id').val(obj._id);
			$('#edit-character-name').val(obj.name);
			refreshComboByFetchAndSelector('?getAllAccountsNames', '.character-account-dropdown', obj.account);
			refreshComboByFetchAndSelector('?getAllServersNames', '.character-servers-dropdown', obj.server);
			refreshComboByFetchAndSelector('?getAllClassesNames', '.character-classes-dropdown', obj.classe);
			refreshComboByFetchAndSelector('?getAllResolutions', '.character-resolution-dropdown', obj.resolution);
			$("#edit-character-windowed").prop("checked", obj.windowed);
			$("#edit-character-favourite").prop("checked", obj.favourite);
			$("#edit-character-title").val(obj.title);
			$('#edit-character-modal').modal('show');
		}).fail(() => {
			alert('unable to edit character.')
		});
	} else {
		alert('Unknown character id.');
	}
}
// Save edited row
$("#edit-character-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editCharacter=' + $('#edit-character-id').val(), $(this).serialize(), (data) => {
		characterDataTable.ajax.reload();
		$('#edit-character-modal').modal('hide');
		$(renderFavourites);
	}).fail(() => {
		alert('Unable to save data, please try again later.');
	});
});
// playCharacter
function playCharacterRow(id, fromFavourite = false) {
	ipcRenderer.on('playCharacter-reply', event => {
		characterDataTable.ajax.reload();
	});
	ipcRenderer.send('playCharacter', id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			if (id != checkedboxArray[i].id) {
				ipcRenderer.send('playCharacter', checkedboxArray[i].id);
			}
		}//TODO FAI UNA SOLA CHIAMATA A PLAYCHARACTER PASSANDO GLI ID DEI CHAR
		//FAI UN FOR NEL IPC-MODULE FILTRANDO VIA GLI ACCOUNT UGUALI
	}
}

function killCharacterRow(id, fromFavourite = false) {
	ipcRenderer.send('killCharacter', id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			if (id != checkedboxArray[i].id) {
				ipcRenderer.send('killCharacter', checkedboxArray[i].id);
			}
		}
	}
}
