'use strict'

document.getElementById('spellcraft-button').onclick = () => {
	//TODO
	ipcRenderer.send('spellcraft-tool-start');

	//.spellcrafter-container

	//$('#spellcraft-modal').modal('show');
	
}
/*
$('spellcraft-form').on('submit', function(event) {
	event.preventDefault();
	ipcRenderer.send('open-spellcraft-form', $(this).serialize());
});*/
