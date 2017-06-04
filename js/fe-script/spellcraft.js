'use strict'

$('spellcraft-form').on('submit', function(event) {
	event.preventDefault();
	ipcRenderer.send('open-spellcraft-form', $(this).serialize());
});