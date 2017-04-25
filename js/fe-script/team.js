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
	ipcRender.send('get-all-chars');
}

ipcRender.on('get-all-chars-reply', (event, array) => {

});