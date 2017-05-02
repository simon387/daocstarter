'use strict';

function refreshTeamModalCombos() {
	refreshComboByFetchAndSelector('?getAllResolutions', '.team-resolution-dropdown', '');
	//refreshComboByFetchAndSelector('?getAllServersNames', '.team-servers-dropdown', '');
	populateTeamChars();
	populateMainDiv();
}

document.querySelectorAll('.team-deelay').forEach(el => {
	el.value = 2000;
});

const populateTeamChars = () => {
	ipcRenderer.send('get-all-chars');
}

let characterArray;
ipcRenderer.on('get-all-chars-reply', (event, array) => {
	characterArray = array;
	document.querySelectorAll('.team-character-dropdown').forEach(el => {
		el.innerHTML = '<option value="' + 0 + '" selected=true>' + ' ' + '</option>';
		array.map(item => {
			el.innerHTML += '<option value="' + item.name + '">' + item.name + '</option>';
		});
	});
});

let numeroTeamRow = 0;
const populateMainDiv = () => {
	numeroTeamRow = 0;
	document.getElementById('team-container').innerHTML = '';
	document.getElementById('team-container').insertAdjacentHTML('beforeend', getTeamRow(numeroTeamRow)); 
}

document.getElementById('add-team-add').onclick = () => {
	if (numeroTeamRow >= 7) {
		return;
	}
	document.getElementById('team-container').insertAdjacentHTML('beforeend', getTeamRow(++numeroTeamRow));
	//populateTeamChars();
	refreshComboByFetchAndSelector('?getAllResolutions', '#add-team-resolution' + numeroTeamRow, '');

	document.querySelectorAll('#add-team-character' + numeroTeamRow).forEach(el => {
		el.innerHTML = '<option value="' + 0 + '" selected=true>' + ' ' + '</option>';
		characterArray.map(item => {
			el.innerHTML += '<option value="' + item.name + '">' + item.name + '</option>';
		});
	});
}

document.getElementById('add-team-remove').onclick = () => {
	if (numeroTeamRow > 0) {
		document.getElementById('generatedTeamRow' + numeroTeamRow--).outerHTML = '';
	}

}

// Add new row
document.getElementById("add-team-form").onsubmit = function(event) {
	event.preventDefault();
	$.post(localhost + '?addTeam', $(this).serialize(), team => {
		teamDataTable.ajax.reload();
		$('#add-team-modal').modal('hide');
	}).fail(() => {
		alert('Unable to Add new team');
	});
};

// Remove row
function removeTeamRow(id) {
	ipcRenderer.send('remove-team', id);
}

ipcRenderer.on('remove-team-reply', event => {
	teamDataTable.ajax.reload();
});

// Save edited row
/*$('#').on('submit', event => {

	console.log(this);
	event.preventDefault();
	ipcRenderer.send(' '//, 
	//document.getElementById('edit-setting-id-number').value,
	//document.getElementById('setting-value-number').value
	);
});
ipcRenderer.on('-reply', event => {
	teamDataTable.ajax.reload();
	$('#').modal('hide');
});
*/

const getTeamRow = (n, action = 'add') => {
	return '' +
	"<div id='generatedTeamRow" + n + "'><hr><div class='form-group'>" +
	"<label for='" + action + "-team-character'" + n + " class='col-sm-2 control-label'>Character " + n + "</label>" +
	"<div class='col-sm-2'>" +
	"<select class='form-control team-character-dropdown' id='" + action + "-team-character" + n + "' name='team-character" + n + "'></select>" +
	"</div>" +
	"<label for='" + action + "-team-resolution" + n + "' class='col-sm-1 control-label'>Resolution</label>" +
	"<div class='col-sm-2'>" +
	"<select class='form-control team-resolution-dropdown' id='" + action + "-team-resolution" + n + "' name='team-resolution" + n + "'></select>" +
	"</div>" +
	"<label for='" + action + "-team-windowed" + n + "' class='col-sm-1 control-label'>Windowed</label>" +
	"<div class='col-sm-1'>" +
	"<input type='checkbox' class='form-control' id='" + action + "-team-windowed" + n + "' name='team-windowed" + n + "'>" +
	"</div>" +
	"<label for='" + action + "-team-borderless" + n + "' class='col-sm-1 control-label'>Borderless</label>" +
	"<div class='col-sm-1'>" +
	"<input type='checkbox' class='form-control' id='" + action + "-team-borderless" + n + "' name='team-borderless" + n + "'>" +
	"</div></div>" +
	"<div class='form-group'>" +
	"<label for='" + action + "-team-deelay" + n + "' class='col-sm-3 control-label'>Deelay</label>" +
	"<div class='col-sm-1'>" +
	"<input type='number' min='0' max='10000' class='form-control team-deelay' id='" + action + "-team-deelay" + n + "' name='team-deelay" + n + "' required>" +
	"</div>" +
	"<label for='" + action + "-team-width" + n + "' class='col-sm-1 control-label'>Width</label>" +
	"<div class='col-sm-1'>" +
	"<input type='number' min='800' max='10000' class='form-control' id='" + action + "-team-width" + n + "' name='team-width" + n + "'>" +
	"</div>" +
	"<label for='" + action + "-team-height" + n + "' class='col-sm-1 control-label'>Height</label>" +
	"<div class='col-sm-1'>" +
	"<input type='number' min='600' max='10000' class='form-control' id='" + action + "-team-height" + n + "' name='team-height" + n + "'>" +
	"</div>" +
	"<label for='" + action + "-team-position-x" + n + "' class='col-sm-1 control-label'>X POS</label>" +
	"<div class='col-sm-1'>" +
	"<input type='number' min='0' max='10000' class='form-control' id='" + action + "-team-position-x" + n + "' name='team-position-x" + n + "'>" +
	"</div>" +
	"<label for='" + action + "-team-position-y" + n + "' class='col-sm-1 control-label'>Y POS</label>" +
	"<div class='col-sm-1'>" +
	"<input type='number' min='0' max='10000' class='form-control' id='" + action + "-team-position-y" + n + "' name='team-position-y" + n + "'>" +
	"</div></div></div>"
}
