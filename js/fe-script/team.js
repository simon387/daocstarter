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
		el.innerHTML = '<option value="' + 0 + '" selected=true>' + ' ' + '</option>';
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
}
ipcRenderer.on('editTeam-reply', (event, team, id) => {
	document.getElementById('edit-team-form').value = team._id;
	document.getElementById('edit-team-name').value = team.name;
//	console.log(team)
	document.getElementById('team-edit-container').innerHTML = '';
	if (team.res0 != undefined) {
		document.getElementById('team-edit-container').insertAdjacentHTML('beforeend', getTeamRow(0, 'edit', team));
		//char7: teamChar7,      team-character0
//miss
		//res7: post['team-resolution7'],
//miss
		//windowed7: windowed7,
		//document.getElementById('team-windowed0').value = team.windowed0 === null ? ;

		$('#edit-team-windowed0').prop('checked', team.windowed0 === undefined ? false: team.windowed0);
		//deelay7: post['team-deelay7'],
		document.getElementById('edit-team-deelay0').value = team.deelay0;
		//borderless7 :borderless7,        team-borderless0
		//document.getElementById('team-borderless0').value = team.borderless0;
		$('#edit-team-borderless0').prop('checked', team.borderless0 === undefined ? false : team.borderless0);
		//width0: post['team-width0'],
		document.getElementById('edit-team-width0').value = team.width0;
		//height0: post['team-height0'],
		document.getElementById('edit-team-height0').value = team.height0;
		//positionx0: post['team-position-x0'],
		document.getElementById('edit-team-position-x0').value = team.positionx0;
		//positiony0: post['team-position-y0'],
		document.getElementById('edit-team-position-y0').value = team.positiony0;
	}
	//document.getElementById('setting-value-number').value = setting.value;
	
	$('#edit-team-modal').modal('show');
});

// Save edited row
$('#edit-team-modal').on('submit',  event => {
	event.preventDefault();
console.log("document.getElementById('edit-team-windowed0').checked", document.getElementById('edit-team-windowed0').checked);

	ipcRenderer.send('saveTeam',
	document.getElementById('edit-team-form').value,
	[document.getElementById('edit-team-name').value,
	//miss
	//miss
	
	document.getElementById('edit-team-windowed0').checked,
	document.getElementById('edit-team-deelay0').value,
	document.getElementById('edit-team-borderless0').checked,
	document.getElementById('edit-team-width0').value,
	document.getElementById('edit-team-height0').value,
	document.getElementById('edit-team-position-x0').value,
	document.getElementById('edit-team-position-y0').value]

	);
}); 
ipcRenderer.on('saveTeam-reply', event => {
	teamDataTable.ajax.reload();
	$('#edit-team-modal').modal('hide');
});

const getTeamRow = (n, action = 'add', team = undefined) => {
	return '' +
	"<div id=" + action + "'GeneratedTeamRow" + n + "'><hr><div class='form-group'>" +
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
/*
	if (undefined != team) { 
	$('#edit-team-windowed0').prop('checked', team.windowed0 === undefined ? false: team.windowed0);
		//deelay7: post['team-deelay7'],
		document.getElementById('edit-team-deelay0').value = team.deelay0;
		//borderless7 :borderless7,        team-borderless0
		//document.getElementById('team-borderless0').value = team.borderless0;
		$('#edit-team-borderless0').prop('checked', team.borderless0 === undefined ? false : team.borderless0);
		//width0: post['team-width0'],
		document.getElementById('edit-team-width0').value = team.width0;
		//height0: post['team-height0'],
		document.getElementById('edit-team-height0').value = team.height0;
		//positionx0: post['team-position-x0'],
		document.getElementById('edit-team-position-x0').value = team.positionx0;
		//positiony0: post['team-position-y0'],
		document.getElementById('edit-team-position-y0').value = team.positiony0;
	}*/
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