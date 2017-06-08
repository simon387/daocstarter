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
		//el.innerHTML = '<option value="' + 0 + '" selected=true>' + ' ' + '</option>';
		array.map(item => {
			el.innerHTML += '<option value="' + item.name + '">' + item.name + '</option>';
		});
	});
});

let numeroTeamRow = 0;
const populateMainDiv = () => {
	numeroTeamRow = 0;
	document.getElementById('team-add-container').innerHTML = '';
	document.getElementById('team-add-container').insertAdjacentHTML('beforeend', getTeamRow(numeroTeamRow)); 
}

document.getElementById('add-team-add').onclick = () => {
	if (numeroTeamRow >= 7) {
		return;
	}
	document.getElementById('team-add-container').insertAdjacentHTML('beforeend', getTeamRow(++numeroTeamRow));
	//populateTeamChars();
	refreshComboByFetchAndSelector('?getAllResolutions', '#add-team-resolution' + numeroTeamRow, '');

	document.querySelectorAll('#add-team-character' + numeroTeamRow).forEach(el => {
		//el.innerHTML = '<option value="' + 0 + '" selected=true>' + ' ' + '</option>';
		characterArray.map(item => {
			el.innerHTML += '<option value="' + item.name + '">' + item.name + '</option>';
		});
	});
}

document.getElementById('edit-team-add').onclick = () => {
	if (numeroTeamRow >= 7) {
		return;
	}
	document.getElementById('team-edit-container').insertAdjacentHTML('beforeend', getTeamRow(++numeroTeamRow, 'edit'));
	//populateTeamChars();
	refreshComboByFetchAndSelector('?getAllResolutions', '#edit-team-resolution' + numeroTeamRow, '');

	

	document.querySelectorAll('#edit-team-character' + numeroTeamRow).forEach(el => {
		characterArray.map(item => {
			el.innerHTML += '<option value="' + item.name + '">' + item.name + '</option>';
		});
	});
}

document.getElementById('add-team-remove').onclick = () => {
	if (numeroTeamRow > 0) {
		document.getElementById('addGeneratedTeamRow' + numeroTeamRow--).outerHTML = '';
	}
}

document.getElementById('edit-team-remove').onclick = () => {
	if (numeroTeamRow > 0) {
		if (document.getElementById('editGeneratedTeamRow' + numeroTeamRow) == null) {
			numeroTeamRow--;
		}
		document.getElementById('editGeneratedTeamRow' + numeroTeamRow--).outerHTML = '';
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

// Edit selected row
function editTeamRow(id) {
	ipcRenderer.send('editTeam', id + '');

	populateTeamChars();

}
ipcRenderer.on('editTeam-reply', (event, team, id) => {
	document.getElementById('edit-team-form').value = team._id;
	document.getElementById('edit-team-name').value = team.name;
	document.getElementById('team-edit-container').innerHTML = '';
	numeroTeamRow = 0;

	for (let i = 0; i <= 7; i++) {
		if (team['res' + i] != undefined ) {
			numeroTeamRow++;
			document.getElementById('team-edit-container').insertAdjacentHTML('beforeend', getTeamRow(i, 'edit'));
			refreshComboByFetchAndSelector('?getAllCharacterNames', '#edit-team-character' + i, team['char' + i]);
			refreshComboByFetchAndSelector('?getAllResolutions', '#edit-team-resolution' + i, team['res' + i]);
			$('#edit-team-windowed' + i).prop('checked', team['windowed' + i] === undefined ? false: team['windowed' + i]);
			document.getElementById('edit-team-deelay' + i).value = team['deelay' + i];
			$('#edit-team-borderless' + i).prop('checked', team['borderless' + i] === undefined ? false : team['borderless' + i]);
			document.getElementById('edit-team-width' + i).value = team['width' + i];
			document.getElementById('edit-team-height' + i).value = team['height' + i];
			document.getElementById('edit-team-position-x' + i).value = team['positionx' + i];
			document.getElementById('edit-team-position-y' + i).value = team['positiony' + i];
		}
	}
	$('#edit-team-modal').modal('show');
});

// Save edited row
$('#edit-team-modal').on('submit', event => {
	event.preventDefault();
	let team = new Object();
	team.team0 = [];
	team.team1 = [];
	team.team2 = [];
	team.team3 = [];
	team.team4 = [];
	team.team5 = [];
	team.team6 = [];
	team.team7 = [];
	for (let i = 0; i <= 7; i++) {
		if (document.getElementById('edit-team-resolution' + i) != undefined) {
			team['team' + i].push(document.getElementById('edit-team-character' + i).value);
			team['team' + i].push(document.getElementById('edit-team-resolution' + i).value);
			team['team' + i].push(document.getElementById('edit-team-windowed' + i).checked);
			team['team' + i].push(document.getElementById('edit-team-deelay' + i).value);
			team['team' + i].push(document.getElementById('edit-team-borderless' + i).checked);
			team['team' + i].push(document.getElementById('edit-team-width' + i).value);
			team['team' + i].push(document.getElementById('edit-team-height' + i).value);
			team['team' + i].push(document.getElementById('edit-team-position-x' + i).value);
			team['team' + i].push(document.getElementById('edit-team-position-y' + i).value);
		}
	}
	ipcRenderer.send('saveTeam',
		document.getElementById('edit-team-form').value,
		document.getElementById('edit-team-name').value,
		team
	);
});
ipcRenderer.on('saveTeam-reply', event => {
	teamDataTable.ajax.reload();
	$('#edit-team-modal').modal('hide');
});

const getTeamRow = (n, action = 'add'/*, team = undefined*/) => {
	return '' +
	"<div id='" + action + "GeneratedTeamRow" + n + "'><hr><div class='form-group'>" +
	"<label for='" + action + "-team-character" + n + "' class='col-sm-2 control-label'>Character " + n + "</label>" +
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
	"<input type='number' value='1000' min='1000' max='60000' class='form-control team-deelay' id='" + action + "-team-deelay" + n + "' name='team-deelay" + n + "' required>" +
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
