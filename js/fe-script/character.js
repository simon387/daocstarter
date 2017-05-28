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
		let elem = document.getElementById('advanced-div-char-add');
		if (!elem.classList.contains('nonmostrare')) {
			elem.classList.add('nonmostrare');
		}
	}).fail(() => {
		alert('Unable to Add new character');
	});
});
// Remove row
function removeCharacterRow(id) {
	$.get(localhost + '?removeCharacter=' + id, () => {
		characterDataTable.ajax.reload();
		$(renderFavourites);
	}).fail(() => {
		alert('Unable to remove row.');
	});
}
// Edit row
function editCharacterRow(id) {
	$.getJSON(localhost + '?editCharacter=' + id, (obj) => {
		$('#edit-character-id').val(obj._id);
		$('#edit-character-name').val(obj.name);
		refreshComboByFetchAndSelector('?getAllAccountsNames', '.character-account-dropdown', obj.account);
		refreshComboByFetchAndSelector('?getAllServersNames', '.character-servers-dropdown', obj.server);
		refreshComboByFetchAndSelector('?getAllClassesNames', '.character-classes-dropdown', obj.classe);
		refreshComboByFetchAndSelector('?getAllResolutions', '.character-resolution-dropdown', obj.resolution);
		$('#edit-character-windowed').prop('checked', obj.windowed === undefined ? false: obj.windowed);
		$('#edit-character-favourite').prop('checked', obj.favourite === undefined ? false: obj.favourite);
		$('#edit-character-title').val(obj.title);
		$('#edit-character-fullscreen_windowed').prop('checked', obj.fullscreen_windowed === undefined ? false: obj.fullscreen_windowed);
		$('#edit-character-forwardbreaksrunlock').prop('checked', obj.forward_breaks_runlock === undefined ? false: obj.forward_breaks_runlock);
		$('#edit-character-borderless').prop('checked', obj.borderless === undefined ? false: obj.borderless);
		$('#edit-character-width').val(obj.width);
		$('#edit-character-height').val(obj.height);
		$('#edit-character-position-x').val(obj.positionX);
		$('#edit-character-position-y').val(obj.positionY);
		$('#edit-character-modal').modal('show');
	}).fail(() => {
		alert('Unable to edit character.');
	});
}
// Save edited row
$("#edit-character-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editCharacter=' + $('#edit-character-id').val(), $(this).serialize(), (data) => {
		characterDataTable.ajax.reload();
		$('#edit-character-modal').modal('hide');
		let elem = document.getElementById('advanced-div-char-edit');
		if (!elem.classList.contains('nonmostrare')) {
			elem.classList.add('nonmostrare');
		}
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
	let set = new Set();
	set.add(id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			set.add( checkedboxArray[i].id);
		}
	}
	ipcRenderer.send('playCharacter', Array.from(set));
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

document.getElementById('import-from-appdata-button').onclick = () => {
	ipcRenderer.send('importFromAppData');
}

ipcRenderer.on('importFromAppData-reply', (event, chars, accounts) => {
	if (chars.length > 0) {
		$('#import-from-appdata-modal').modal('show');
		document.getElementById('import-appdata-container').innerHTML = '';
		chars.forEach(char => {
			document.getElementById('import-appdata-container').insertAdjacentHTML('beforeend', renderImportedChar(char, accounts));
		});
	}
});

//name resolution account
const renderImportedChar = (char, accounts) => {
	let accountOptions = '';
	accounts.forEach(account => {
		accountOptions += "<option value='" + account.name + "'>" + account.name + "</option>";
	});
	return '' +
	"<div class='form-group' id='renderImportedChar" + char.name + "'>" +
		"<div class='col-sm-4'>" +
			"<input type='text' name='charName' class='form-control' readonly value='" + char.name + "'>" +
		"</div>" +
		"<div class='col-sm-3'>" +
			"<input type='text' name='charServer' class='form-control' readonly value='" + char.server + "'>" +
		"</div>" +
		"<div class='col-sm-4'>" + 
			"<select name='charAccount' class='form-control'>" +
				accountOptions +
			"</select>" +
		"</div>" +
		"<div class='col-sm-1'>" +
			 '<a href=javascript:' + "nonImportare('" + char.name + "'); " + cancCSS + '>x<\/a>' +
		"</div>" +
	"</div>";
}

const nonImportare = (charName) => {
	let elem = document.getElementById('renderImportedChar' + charName);
	elem.parentNode.removeChild(elem);
}

// Save imported chars
$('#import-from-appdata-form').on('submit', function(event) {
	event.preventDefault();

	
	$.post(localhost + '?importFromAppData', $(this).serialize(), (data) => {

		characterDataTable.ajax.reload();
		$('#import-from-appdata-modal').modal('hide');


	}).fail(() => {
		alert('Unable to save data, please try again later.');
	});
});