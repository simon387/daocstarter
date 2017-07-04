'use strict'

let itemCounter = 0;

document.getElementById('spellcraft-button').onclick = () => {
	//TODO
	//ipcRenderer.send('spellcraft-tool-start');

	//.spellcrafter-container

	itemCounter = 0;

	const modal = document.getElementById('spellcraft-modal');
	modal.innerHTML = 
	"<div class='modal-dialog' role='document'>" +
		"<div class='modal-content'>" +
			"<form class='form-horizontal' id='spellcraft-form'>" +
				"<div class='modal-header'>" +
					"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
					"<h4 class='modal-title' id='spellcraft-label'>Spellcraft Tool</h4>" +
				"</div>" +
				"<div class='modal-body'>" +
					"<div class='form-group'>" +
						"<label for='spellcraft-character-dropdown' class='col-sm-2 control-label'>Spellcrafter</label>" +
						"<div class='col-sm-4'>" +
							"<select class='form-control' id='spellcraft-character-dropdown' name='spellcraft-character-dropdown'></select>" +
						"</div>" +
						//"<>" +
					"</div>" +
					"<div id='container-spellcrafter'>" +
						
					"</div>" +
				"</div>" +
				"<div class='modal-footer'>" +
					"<button type='button' class='btnX btn-default' id='spellcraft-add-item-button'>Add Item</button>\n" +
					"<button type='button' class='btnX btn-default' data-dismiss='modal'>Close</button>" +
					"<!--button type='submit' class='btnX btn-primary btn-sm'>Import</button-->" +
				"</div>" +
			"</form>" +
		"</div>" +
	"</div>"
	;

	generaPezzo();
	document.getElementById('spellcraft-add-item-button').onclick = () => {
		generaPezzo();
	}

	$('#spellcraft-modal').modal('show');
}


const generaPezzo = () => {
	itemCounter++;
	const container = document.getElementById('container-spellcrafter');
	container.insertAdjacentHTML('beforeend', 
		generaGemma(itemCounter, 1) +
		generaGemma(itemCounter, 2) +
		generaGemma(itemCounter, 3) +
		generaGemma(itemCounter, 4) +
		"<hr>"
	);
}

const generaGemma = (nItem, nRiga) => {
	return '' +

	"<div class='form-group'>" +
		"<label class='col-sm-2 control-label'>Gem " + nRiga + "</label>" +
		"<div class='col-sm-4'>" +
			"<select class='form-control' name='effect" + nRiga + "' onchange='reCalc(" + nItem + "," + nRiga + ")'>" +
				"<option>+ Stat</option>" +
				"<option>+ Resists</option>" +
				"<option>+ Hits</option>" +
				"<option>+ Power</option>" +
				"<option>+ Focus</option>" +
				"<option>+ Skill</option>" +
				"<option selected='selected'>Unused</option>" +
			"</select>" +
		"</div>" +
		"<div class='col-sm-2'>" +
			"<select class='form-control' name='evalue" + nRiga + "' onchange='reCalc(" + nItem + "," +nRiga + ")'></select>" +
		"</div>" +
		"<div class='col-sm-4'>" +
			"<select class='form-control' name='ebonus" + nRiga + "' onchange='reCalc(" + nItem + "," +nRiga + ")'></select>" +
		"</div>" +
	"</div>";
}
/*
$('spellcraft-form').on('submit', function(event) {
	event.preventDefault();
	ipcRenderer.send('open-spellcraft-form', $(this).serialize());
});*/

/*
ipcRenderer.on('spellcraft-tool-start-reply', event => {
	//il backend ha finito e riempito la form, ora la puoi far mostrare
	$('#spellcraft-modal').modal('show');
});
*/

const reCalc = (nItem, nRiga) => {
	console.log(nItem, nRiga);
}
