'use strict'

document.getElementById('spellcraft-button').onclick = () => {
	$('#spellcraft-modal').modal('show');
	//TODO
}

$('spellcraft-form').on('submit', function(event) {
	event.preventDefault();
	ipcRenderer.send('open-spellcraft-form', $(this).serialize());
});