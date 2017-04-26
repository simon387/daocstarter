'use strict';

function refreshTeamModalCombos() {
	refreshComboByFetchAndSelector('?getAllResolutions', '.team-resolution-dropdown', '');
	refreshComboByFetchAndSelector('?getAllServersNames', '.team-servers-dropdown', '');
	populateTeamChars()
}

document.querySelectorAll('.team-deelay').forEach(el => {
	el.value = 2000;
});

//'.team-characters-dropdown'

const populateTeamChars = () => {
	ipcRenderer.send('get-all-chars');
}

ipcRenderer.on('get-all-chars-reply', (event, array) => {
	document.querySelectorAll('.team-characters-dropdown').forEach(el => {
		el.innerHTML = '<option value="' + 0 + '" selected=true>' + '' + '</option>';
		array.map(item => {
			el.innerHTML += '<option value="' + item.name + '">' + item.name + '</option>';
		});
	});
});

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
