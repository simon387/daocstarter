'use strict'

let itemCounter = 0;

const arrFocusUsedAlb = new Array('Body', 'Cold', 'Death Servant', 'Deathsight', 'Earth', 'Fire', 'Matter', 'Mind', 'Painworking', 'Spirit', 'Wind', 'All');
const arrFocusUsedMid = new Array('Bonedancing', 'Darkness', 'Runecarving', 'Summoning', 'Suppression', 'All');
const arrFocusUsedHib = new Array('Arboreal', 'Creeping', 'Enchantments', 'Ethereal Shriek', 'Light', 'Mana', 'Mentalism', 'Phantasmal Wail', 'Spectral Guard', 'Verdant', 'Void', 'All');

const arrSkillsUsedAlb = new Array('Body Destruction', 'Chants', 'Critical Strike', 'Crossbow', 'Crush', 'Death Servant', 'Deathsight', 'Dual Wield', 'Earth','Enhancement', 'Envenom', 'Flexible', 'Fire', 'Healing', 'Ice', 'Instruments', 'Longbow', 'Matter', 'Mind Twisting', 'Painworking', 'Parry', 'Polearm', 'Shield', 'Slash', 'Smite', 'Soulrending', 'Spirit Animation', 'Staff', 'Stealth', 'Thrust', 'Two Handed', 'Wind', 'All: Primary Melee', 'All: Casting');
const arrSkillsUsedHib = new Array('Arboreal Path', 'Blades', 'Blunt', 'Celtic Dual', 'Celtic Spear', 'Critical Strike', 'Creeping Path', 'Dementia', 'Enchantments', 'Envenom', 'Ethereal Shriek', 'Large Weaponry', 'Light', 'Mana', 'Mentalism', 'Music', 'Nature', 'Nurture', 'Parry', 'Phantasmal Wail', 'Piercing', 'Recurve Bow', 'Regrowth', 'Scythe', 'Shield', 'Shadow Mastery', 'Spectral Guard', 'Stealth', 'Vampiiric Embrace', 'Valor', 'Verdant Path', 'Void', 'All: Primary Melee', 'All: Casting');
const arrSkillsUsedMid = new Array('Augmentation', 'Axe', 'Battlesongs', 'Beastcraft', 'Bonedancing', 'Composite Bow', 'Critical Strike', 'Cursing', 'Darkness', 'Envenom', 'Hammer', 'Hand to Hand', 'Hexing', 'Left Axe', 'Mending', 'Pacification', 'Odin\'s Will', 'Parry', 'Runecarving', 'Shield', 'Spear', 'Stealth', 'Stormcalling', 'Subterranean', 'Summoning', 'Suppression', 'Sword', 'Thrown Weapons', 'All: Primary Melee', 'All: Casting');

document.getElementById('spellcraft-button').onclick = () => {
	//TODO
	//ipcRenderer.send('get-spellcrafters');

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
							"<select class='form-control' id='spellcraft-character-dropdown' onchange='reCalc(0, 0)' name='spellcraft-character-dropdown'></select>" +
						"</div>" +
						"<label for='spellcraft-qbar-dropdown' class='col-sm-2 control-label'>qbar</label>" +
						"<div class='col-sm-4'>" +
							"<select class='form-control' id='spellcraft-qbar-dropdown' name='spellcraft-qbar-dropdown'>" +
								printOptionTag('1') +
								printOptionTag('2') +
								printOptionTag('3') +
							"</select>" +
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
	ipcRenderer.send('get-spellcrafters');

	generaPezzo();
	document.getElementById('spellcraft-add-item-button').onclick = () => {
		generaPezzo();
	}

	$('#spellcraft-modal').modal('show');
}

ipcRenderer.on('get-spellcrafters-reply', (event, characters) => {
	filleSCDropdown(characters);
});

const filleSCDropdown = characters => {
	let selectElement = document.getElementById('spellcraft-character-dropdown');
	for (let c = 0; c < characters.length; c++) {
		selectElement.innerHTML += printOptionTag(characters[c].realm, characters[c].name);
	}
}

const generaPezzo = () => {
	if (8 == itemCounter) {
		return '';
	}
	itemCounter++;
	const container = document.getElementById('container-spellcrafter');
	container.insertAdjacentHTML('beforeend', 
		generaGemma(itemCounter, 1) +
		generaGemma(itemCounter, 2) +
		generaGemma(itemCounter, 3) +
		generaGemma(itemCounter, 4) +
		"<div class='form-group'>" +
			"<label class='col-sm-2 control-label'>imbue</label>" +
			"<div class='col-sm-3'>" +
				"<input type='text' class='form-control' id='imbue" + itemCounter +
				"' name='imbue" + itemCounter + "' placeholder='0' readonly>" +
			"</div>" +
		"</div>" +
		"<hr>"
	);
}

const generaGemma = (nItem, nRiga) => {
	return '' +

	"<div class='form-group'>" +
		"<label class='col-sm-2 control-label'>Gem " + nRiga + "</label>" +
		"<div class='col-sm-3'>" +
			"<select class='form-control' id='effect" + nItem + nRiga +
			"' name='effect" + nItem + nRiga + "' onchange='reCalc(" + nItem + "," + nRiga + ")'>" +
				printOptionTag('stat', '+ Stat') +
				printOptionTag('resist', '+ Resists') +
				printOptionTag('hits', '+ Hits') +
				printOptionTag('power', '+ Power') +
				printOptionTag('focus', '+ Focus') +
				printOptionTag('skill', '+ Skill') +
				printOptionTag('unused', 'Unused', true) +
			"</select>" +
		"</div>" +
		"<div class='col-sm-3'>" +
			"<select class='form-control' id='evalue" + nItem + nRiga + "' name='effect" + nItem + nRiga + "'></select>" +
		"</div>" +
		"<div class='col-sm-4'>" +
			"<select class='form-control' id='ebonus" + nItem + nRiga + "' name='effect" + nItem + nRiga + "'></select>" +
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
	if (nItem == 0) {//se 0 0 proviene dalla dropdown char
		return resetAll();
	}
	let realm = getRealm();
	if (undefined === realm) {
		return;
	}
	let effectValue = getEffectValue(nItem, nRiga);
	let evalueElement = document.getElementById('evalue' + nItem + nRiga);
	let ebonusElement = document.getElementById('ebonus' + nItem + nRiga);
	switch (effectValue) {
		case 'stat':
			fillStat(evalueElement, ebonusElement);
			break;
		case 'resist':
			fillResist(evalueElement, ebonusElement);
			break;
		case 'hits':
			fillHits(evalueElement, ebonusElement);
			break;
		case 'power':
			fillPower(evalueElement, ebonusElement);
			break;
		case 'focus':
			fillFocus(evalueElement, ebonusElement, realm);
			break;
		case 'skill':
			fillSkill(evalueElement, ebonusElement, realm);
			break;
	}
}

const fillFocus = (evalueElement, ebonusElement, realm) => {
	evalueElement.innerHTML = '';
	evalueElement.innerHTML += printOptionTag('5', '+ 5') +
		printOptionTag('10', '+ 10') +
		printOptionTag('15', '+ 15') +
		printOptionTag('20', '+ 20') +
		printOptionTag('25', '+ 25') +
		printOptionTag('30', '+ 30') +
		printOptionTag('35', '+ 35') +
		printOptionTag('40', '+ 40') +
		printOptionTag('45', '+ 45') +
		printOptionTag('50', '+ 50');
	ebonusElement.innerHTML = '';
	let arrayFocus = arrFocusUsedAlb;
	switch (realm) {
		case 'Hibernia':
			arrayFocus = arrFocusUsedHib;
			break;
		case 'Midgard':
			arrayFocus = arrFocusUsedMid;
			break;
	}
	let innerHTML = ''
	for (let i = 0; i < arrayFocus.length; i++) {
		innerHTML += printOptionTag(arrayFocus[i]);
	}
	ebonusElement.innerHTML = innerHTML;
}

const fillSkill = (evalueElement, ebonusElement, realm) => {
	evalueElement.innerHTML = '';
	evalueElement.innerHTML += printOptionTag('1', '+ 1') +
		printOptionTag('2', '+ 2') +
		printOptionTag('3', '+ 3') +
		printOptionTag('4', '+ 4') +
		printOptionTag('5', '+ 5') +
		printOptionTag('6', '+ 6') +
		printOptionTag('7', '+ 7') +
		printOptionTag('8', '+ 8');
	ebonusElement.innerHTML = '';
	let arraySkill = arrSkillsUsedAlb;
	switch (realm) {
		case 'Hibernia':
			arraySkill = arrSkillsUsedHib;
			break;
		case 'Midgard':
			arraySkill = arrSkillsUsedMid;
			break;
	}
	let innerHTML = ''
	for (let i = 0; i < arraySkill.length; i++) {
		innerHTML += printOptionTag(arraySkill[i]);
	}
	ebonusElement.innerHTML = innerHTML;
}

const fillPower = (evalueElement, ebonusElement) => {
	evalueElement.innerHTML = '';
	evalueElement.innerHTML += printOptionTag('1', '+ 1') +
		printOptionTag('2', '+ 2') +
		printOptionTag('3', '+ 3') +
		printOptionTag('5', '+ 5') +
		printOptionTag('7', '+ 7') +
		printOptionTag('9', '+ 9') +
		printOptionTag('11', '+ 11') +
		printOptionTag('13', '+ 13') +
		printOptionTag('15', '+ 15') +
		printOptionTag('17', '+ 17');
	ebonusElement.innerHTML = '';
	ebonusElement.innerHTML += printOptionTag('power', 'Power');
}

const fillHits = (evalueElement, ebonusElement) => {
	evalueElement.innerHTML = '';
	evalueElement.innerHTML += printOptionTag('4', '+ 4') +
		printOptionTag('12', '+ 12') +
		printOptionTag('20', '+ 20') +
		printOptionTag('28', '+ 28') +
		printOptionTag('36', '+ 63') +
		printOptionTag('44', '+ 44') +
		printOptionTag('52', '+ 52') +
		printOptionTag('60', '+ 60') +
		printOptionTag('68', '+ 68') +
		printOptionTag('76', '+ 76');
	ebonusElement.innerHTML = '';
	ebonusElement.innerHTML += printOptionTag('hp', 'HP');
}

const fillResist = (evalueElement, ebonusElement) => {
	evalueElement.innerHTML = '';
	evalueElement.innerHTML += printOptionTag('1', '+ 1') +
		printOptionTag('2', '+ 2') +
		printOptionTag('3', '+ 3') +
		printOptionTag('5', '+ 5') +
		printOptionTag('7', '+ 7') +
		printOptionTag('9', '+ 9') +
		printOptionTag('11', '+ 11') +
		printOptionTag('13', '+ 13') +
		printOptionTag('15', '+ 15') +
		printOptionTag('17', '+ 17');
	ebonusElement.innerHTML = '';
	ebonusElement.innerHTML += printOptionTag('body', 'Body') +
		printOptionTag('cold', 'Cold') +
		printOptionTag('heat', 'Heat') +
		printOptionTag('energy', 'Energy') +
		printOptionTag('matter', 'Matter') +
		printOptionTag('spirit', 'Spirit') +
		printOptionTag('thrust', 'Thrust') +
		printOptionTag('crush', 'Crush') +
		printOptionTag('slash', 'Slash');
}

const fillStat = (evalueElement, ebonusElement) => {
	evalueElement.innerHTML = '';
	evalueElement.innerHTML += printOptionTag('1', '+ 1') +
		printOptionTag('4', '+ 4') +
		printOptionTag('7', '+ 7') +
		printOptionTag('10', '+ 10') +
		printOptionTag('13', '+ 13') +
		printOptionTag('16', '+ 16') +
		printOptionTag('19', '+ 19') +
		printOptionTag('22', '+ 22') +
		printOptionTag('25', '+ 25') +
		printOptionTag('28', '+ 28');
	ebonusElement.innerHTML = '';
	ebonusElement.innerHTML += printOptionTag('STR') +
		printOptionTag('DEX') +
		printOptionTag('QUI') +
		printOptionTag('CON') +
		printOptionTag('INT') +
		printOptionTag('PIE') +
		printOptionTag('EMP');
}

const printOptionTag = (value, text = '', selected = '') => {
	let _text = text === '' ? value : text;
	let _selected = selected === '' ? '' : "selected='selected'";
	return '<option value="' + value + '"' + _selected + '>' + _text + '</option>';
}

const getEffectValue = (nItem, nRiga) => {
	let e = document.getElementById('effect' + nItem + nRiga);
	return e.value;
}

const getRealm = () => {
	let e = document.getElementById('spellcraft-character-dropdown');
	let value = undefined;
	try {
		value = e.options[e.selectedIndex].value;
	}
	catch (e) {

	}
	finally {
		return value;
	}
}

const resetAll = () => {
	document.getElementById('container-spellcrafter').innerHTML = '';
	itemCounter = 0;
	generaPezzo();
}
