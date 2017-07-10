'use strict'

let itemCounter = 0;
var arrSkills = new Array(1, 2, 3, 4, 5, 6, 7, 8/*, 9, 10*/);
var arrSkillsUsedAlb = new Array('Body Destruction', 'Chants', 'Critical Strike', 'Crossbow', 'Crush', 'Death Servant', 'Deathsight', 'Dual Wield', 'Earth', 'Enhancement', 'Envenom', 'Flexible', 'Fire', 'Healing', 'Ice', 'Instruments', 'Longbow', 'Matter', 'Mind Twisting', 'Painworking', 'Parry', 'Polearm', 'Shield', 'Slash', 'Smite', 'Soulrending', 'Spirit Animation', 'Staff', 'Stealth', 'Thrust', 'Two Handed', 'Wind', 'All: Primary Melee', 'All: Casting');
var arrSkillsAlbName = new Array('heated evocation sigil', 'earthen fervor sigil', 'heated battle jewel', 'vapor war sigil', 'fiery war sigil', 'ashen fervor sigil', 'vacuous fervor sigil', 'icy war sigil', 'earthen evocation sigil', 'airy fervor sigil', 'dusty battle jewel', 'molten magma war sigil', 'fiery evocation sigil', 'watery fervor sigil', 'icy evocation sigil', 'vapor fervor sigil', 'airy war sigil', 'dusty evocation sigil', 'watery evocation sigil', 'salt encrusted fervor sigil', 'vapor battle jewel', 'earthen war sigil', 'fiery battle jewel', 'watery war sigil', 'fiery fervor sigil', 'steaming fervor sigil', 'vapor evocation sigil', 'earthen battle jewel', 'airy battle jewel', 'dusty war sigil', 'heated war sigil', 'airy evocation sigil', 'finesse war sigil', 'finesse fervor sigil');
var arrSkillsAlbMat1 = new Array('Ground Cave Crystal', 'Ground Blessed Undead Bone', 'Bloodied Battlefield Dirt', 'Ground Caer Stone', 'Ground Blessed Undead Bone', 'Ground Blessed Undead Bone', 'Ground Blessed Undead Bone', 'Ground Caer Stone', 'Ground Cave Crystal', 'Ground Blessed Undead Bone', 'Bloodied Battlefield Dirt', 'Ground Caer Stone', 'Ground Cave Crystal', 'Ground Blessed Undead Bone', 'Ground Cave Crystal', 'Ground Blessed Undead Bone', 'Ground Caer Stone', 'Ground Cave Crystal', 'Ground Cave Crystal', 'Ground Blessed Undead Bone', 'Bloodied Battlefield Dirt', 'Ground Caer Stone', 'Bloodied Battlefield Dirt', 'Ground Caer Stone', 'Ground Blessed Undead Bone', 'Ground Blessed Undead Bone', 'Ground Cave Crystal', 'Bloodied Battlefield Dirt', 'Bloodied Battlefield Dirt', 'Ground Caer Stone', 'Ground Caer Stone', 'Ground Cave Crystal', 'Ground Caer Stone', 'Ground Blessed Undead Bone');
var arrSkillsAlbMat2 = new Array('Heat From an Unearthly Pyre', 'Treant Blood', 'Heat From an Unearthly Pyre', 'Swamp Fog', 'Draconic Fire', 'Undead Ash and Holy Water', 'Swamp Fog', 'Frost From a Wasteland', 'Treant Blood', 'Air Elemental Essence', 'Undead Ash and Holy Water', 'Leviathan Blood', 'Draconic Fire', 'Leviathan Blood', 'Frost From a Wasteland', 'Swamp Fog', 'Air Elemental Essence', 'Undead Ash and Holy Water', 'Leviathan Blood', 'Undead Ash and Holy Water', 'Swamp Fog', 'Treant Blood', 'Draconic Fire', 'Leviathan Blood', 'Draconic Fire', 'Heat From an Unearthly Pyre', 'Swamp Fog', 'Treant Blood', 'Air Elemental Essence', 'Undead Ash and Holy Water', 'Heat From an Unearthly Pyre', 'Air Elemental Essence', 'Draconic Fire', 'Draconic Fire');
var arrSkillsUsedMid = new Array('Augmentation', 'Axe', 'Battlesongs', 'Beastcraft', 'Bonedancing', 'Composite Bow', 'Critical Strike', 'Cursing', 'Darkness', 'Envenom', 'Hammer', 'Hand to Hand', 'Hexing', 'Left Axe', 'Mending', 'Pacification', 'Odin\'s Will', 'Parry', 'Runecarving', 'Shield', 'Spear', 'Stealth', 'Stormcalling', 'Subterranean', 'Summoning', 'Suppression', 'Sword', 'Thrown Weapons', 'All: Primary Melee', 'All: Casting');
var arrSkillsMidName = new Array('airy chaos rune', 'earthen war rune', 'airy primal rune', 'earthen primal rune', 'ashen primal rune', 'airy war rune', 'heated battle jewel', 'blighted primal rune', 'icy chaos rune', 'dusty battle jewel', 'fiery war rune', 'lightning charged war rune', 'unholy primal rune', 'icy war rune', 'watery chaos rune', 'earthen chaos rune', 'valiant primal rune', 'vapor battle jewel', 'heated chaos rune', 'fiery battle jewel', 'heated war rune', 'airy battle jewel', 'fiery primal rune', 'fiery chaos rune', 'vapor chaos rune', 'dusty chaos rune', 'watery war rune', 'vapor war rune', 'finesse war rune', 'finesse primal rune');
var arrSkillsMidMat1 = new Array('Soot From Niflheim', 'Ground Giant Bone', 'Ground Vendo Bone', 'Ground Vendo Bone', 'Soot from Niflheim', 'Ground Giant Bone', 'Bloodied Battlefield Dirt', 'Soot From Niflheim', 'Ground Vendo Bone', 'Bloodied Battlefield Dirt', 'Ground Giant Bone', 'Ground Giant Bone', 'Ground Vendo Bone', 'Ground Giant Bone', 'Soot From Niflheim', 'Soot From Niflheim', 'Ground Vendo Bone', 'Bloodied Battlefield Dirt', 'Soot From Niflheim', 'Bloodied Battlefield Dirt', 'Ground Giant Bone', 'Bloodied Battlefield Dirt', 'Ground Vendo Bone', 'Soot From Niflheim', 'Soot From Niflheim', 'Soot From Niflheim', 'Ground Giant Bone', 'Ground Giant Bone', 'Ground Giant Bone', 'Ground Vendo Bone');
var arrSkillsMidMat2 = new Array('Air Elemental Essence', 'Treant Blood', 'Air Elemental Essence', 'Treant Blood', 'Undead Ash and Holy Water', 'Air Elemental Essence', 'Heat From an Unearthly Pyre', 'Treant Blood', 'Frost From a Wasteland', 'Undead Ash and Holy Water', 'Draconic Fire', 'Leviathan Blood', 'Frost From a Wasteland', 'Air Elemental Essence', 'Leviathan Blood', 'Treant Blood', 'Swamp Fog', 'Swamp Fog', 'Heat From an Unearthly Pyre', 'Draconic Fire', 'Heat From an Unearthly Pyre', 'Air Elemental Essence', 'Draconic Fire', 'Draconic Fire', 'Swamp Fog', 'Undead Ash and Holy Water', 'Leviathan Blood', 'Swamp Fog', 'Draconic Fire', 'Draconic Fire');
var arrSkillsUsedHib = new Array('Arboreal Path', 'Blades', 'Blunt', 'Celtic Dual', 'Celtic Spear', 'Critical Strike', 'Creeping Path', 'Dementia', 'Enchantments', 'Envenom', 'Ethereal Shriek', 'Large Weaponry', 'Light', 'Mana', 'Mentalism', 'Music', 'Nature', 'Nurture', 'Parry', 'Phantasmal Wail', 'Piercing', 'Recurve Bow', 'Regrowth', 'Scythe', 'Shield', 'Shadow Mastery', 'Spectral Guard', 'Stealth', 'Vampiiric Embrace', 'Valor', 'Verdant Path', 'Void', 'All: Primary Melee', 'All: Casting');
var arrSkillsHibName = new Array('steaming nature spell stone', 'water war spell stone', 'fiery war spell stone', 'icy war spell stone', 'earthen war spell stone', 'heated battle jewel', 'oozing nature spell stone', 'aberrant arcane spell stone', 'vapor arcane spell stone', 'dusty battle jewel', 'ethereal arcane spell stone', 'heated war spell stone', 'fiery arcane spell stone', 'watery arcane spell stone', 'earthen arcane spell stone', 'airy nature spell stone', 'earthen nature spell stone', 'fiery nature spell stone', 'vapor battle jewel', 'phantasmal arcane spell stone', 'dusty war spell stone', 'airy war spell stone', 'watery nature spell stone', 'light war spell stone', 'fiery battle jewel', 'shadowy arcane spell stone', 'spectral arcane spell stone', 'airy battle jewel', 'embracing arcane spell stone', 'airy arcane spell stone', 'mineral encrusted nature spell stone', 'icy arcane spell stone', 'finesse war spell stone', 'finesse nature spell stone');
var arrSkillsHibMat1 = new Array('Fairy Dust', 'Unseelie Dust', 'Unseelie Dust', 'Unseelie Dust', 'Unseelie Dust', 'Bloodied Battlefield Dirt', 'Fairy Dust', 'Otherworldly Dust', 'Otherworldly Dust', 'Bloodied Battlefield Dirt', 'Otherworldly Dust', 'Unseelie Dust', 'Otherworldly Dust', 'Otherworldly Dust', 'Otherworldly Dust', 'Fairy Dust', 'Fairy Dust', 'Fairy Dust', 'Bloodied Battlefield Dirt', 'Otherworldly Dust', 'Unseelie Dust', 'Unseelie Dust', 'Fairy Dust', 'Unseelie Dust', 'Bloodied Battlefield Dirt', 'Otherworldly Dust', 'Otherworldly Dust', 'Bloodied Battlefield Dirt', 'Otherworldly Dust', 'Otherworldly Dust', 'Fairy Dust', 'Otherworldly Dust', 'Unseelie Dust', 'Fairy Dust');
var arrSkillsHibMat2 = new Array('Swamp Fog', 'Leviathan Blood', 'Draconic Fire', 'Frost From a Wasteland', 'Treant Blood', 'Heat From an Unearthly Pyre', 'Swamp Fog', 'Treant Blood', 'Swamp Fog', 'Undead Ash and Holy Water', 'Leviathan Blood', 'Heat From an Unearthly Pyre', 'Draconic Fire', 'Leviathan Blood', 'Treant Blood', 'Air Elemental Essence', 'Treant Blood', 'Draconic Fire', 'Swamp Fog', 'Draconic Fire', 'Undead Ash and Holy Water', 'Air Elemental Essence', 'Leviathan Blood', 'Sun Light', 'Draconic Fire', 'Swamp Fog', 'Air Elemental Essence', 'Air Elemental Essence', 'Frost From a Wasteland', 'Air Elemental Essence', 'Heat From an Unearthly Pyre', 'Frost From a Wasteland', 'Draconic Fire', 'Draconic Fire');
var arrFocus = new Array(5, 10, 15, 20, 25, 30, 35, 40, 45, 50);
var arrFocusUsedHib = new Array('Arboreal', 'Creeping', 'Enchantments', 'Ethereal Shriek', 'Light', 'Mana', 'Mentalism', 'Phantasmal Wail', 'Spectral Guard', 'Verdant', 'Void', 'All');
var arrFocusHibName = new Array('steaming focus stone', 'oozing focus stone', 'vapor focus stone', 'ethereal focus stone', 'fiery focus stone', 'watery focus stone', 'earthen focus stone', 'phantasmal focus stone', 'spectral arcane focus stone', 'mineral encrusted focus stone', 'icy focus stone', 'brilliant focus stone');
var arrFocusHibMat1 = new Array('Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales');
var arrFocusHibMat2 = new Array('Swamp Fog', 'Treant Blood', 'Swamp Fog', 'Swamp Fog', 'Draconic Fire', 'Leviathan Blood', 'Treant Blood', 'Leviathan Blood', 'Draconic Fire', 'Heat From an Unearthly Pyre', 'Frost From a Wasteland', 'Draconic Fire', 'Draconic Fire');
var arrFocusUsedMid = new Array('Bonedancing', 'Darkness', 'Runecarving', 'Summoning', 'Suppression', 'All');
var arrFocusMidName = new Array('ashen focus rune', 'icy focus rune', 'heated focus rune', 'vapor focus rune', 'dusty focus rune', 'brilliant focus rune');
var arrFocusMidMat1 = new Array('Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales');
var arrFocusMidMat2 = new Array('Undead Ash and Holy Water', 'Frost From a Wasteland', 'Heat From an Unearthly Pyre', 'Swamp Fog', 'Undead Ash and Holy Water', 'Draconic Fire');
var arrFocusUsedAlb = new Array('Earth', 'Cold', 'Fire', 'Wind', 'Body', 'Matter', 'Spirit', 'Mind');
var arrFocusUsedAlb = new Array('Body', 'Cold', 'Death Servant', 'Deathsight', 'Earth', 'Fire', 'Matter', 'Mind', 'Painworking', 'Spirit', 'Wind', 'All');
var arrFocusAlbName = new Array('heated focus sigil', 'icy focus sigil', 'ashen focus sigil', 'vacuous focus sigil', 'earthen focus sigil', 'fiery focus sigil', 'dusty focus sigil', 'watery focus sigil', 'salt encrusted focus sigil', 'vapor focus sigil', 'airy focus sigil', 'brilliant focus sigil');
var arrFocusAlbMat1 = new Array('Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales');
var arrFocusAlbMat2 = new Array('Heat From an Unearthly Pyre', 'Frost From a Wasteland', 'Undead Ash and Holy Water', 'Swamp Fog', 'Treant Blood', 'Draconic Fire', 'Undead Ash and Holy Water', 'Leviathan Blood', 'Mystic Energy', 'Swamp Fog', 'Air Elemental Essence', 'Draconic Fire');
var arrPower = new Array(1, 2, 3, 5, 7, 9, 11, 13, 15, 17);
var arrHits = new Array(4, 12, 20, 28, 36, 44, 52, 60, 68, 76);
var arrResist = new Array(1, 2, 3, 5, 7, 9, 11, 13, 15, 17);
var arrResistUsed = new Array('Body', 'Cold', 'Heat', 'Energy', 'Matter', 'Spirit', 'Thrust', 'Crush', 'Slash');
var arrResistName = new Array('dusty shielding jewel', 'icy shielding jewel', 'heated shielding jewel', 'light shielding jewel', 'earthen shielding jewel', 'vapor shielding jewel', 'airy shielding jewel', 'fiery shielding jewel', 'watery shielding jewel');
var arrResistMat1 = new Array('Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales', 'Ground Draconic Scales');
var arrResistMat2 = new Array('Undead Ash and Holy Water', 'Frost From a Wasteland', 'Heat from an Unearthly Pyre', 'Sun Light', 'Treant Blood', 'Swamp Fog', 'Air Elemental Essence', 'Draconic Fire', 'Leviathan Blood');
var arrStats = new Array(1, 3, 5, 7, 9, 11, 13, 15, 17, 19);
var arrStatsFE = new Array(1, 4, 7, 10, 13, 16, 19, 22, 25, 28);
var arrStatsUsed = new Array('STR', 'DEX', 'QUI', 'CON', 'INT', 'PIE', 'EMP', 'CHA');
var arrStatsName = new Array('fiery essence jewel', 'vapor essence jewel', 'airy essence jewel', 'earthen essence jewel', 'dusty essence jewel', 'watery essence jewel', 'heated essence jewel', 'icy essence jewel');
var arrStatsMat1 = new Array('Essence of Life', 'Essence of Life', 'Essence of Life', 'Essence of Life', 'Essence of Life', 'Essence of Life', 'Essence of Life', 'Essence of Life');
var arrStatsMat2 = new Array('Draconic Fire', 'Swamp Fog', 'Air Elemental Essence', 'Treant Blood', 'Undead Ash and Holy Water', 'Leviathan Blood', 'Heat From an Unearthly Pyre', 'Frost From a Wasteland');
var arrGemStrength = new Array('Raw', 'Uncut', 'Rough', 'Flawed', 'Imperfect', 'Polished', 'Faceted', 'Precious', 'Flawless', 'Perfect');
var arrGemStrGem = new Array('Lo', 'Um', 'On', 'Ee', 'Pal', 'Mon', 'Ros', 'Zo', 'Kath', 'Ra');
var arrGemStrMat1a = new Array('1', '5', '9', '13', '17', '21', '25', '29', '33', '37');
var arrGemStrMat1b = new Array('1', '6', '11', '16', '21', '26', '31', '36', '41', '46');
var arrGemStrMat2 = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

document.getElementById('spellcraft-button').onclick = () => {
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
							"<select class='form-control' id='spellcraft-character-dropdown' name='spellcraft-character-dropdown' onchange='reCalc(0, 0)'></select>" +
						"</div>" +
						"<label for='spellcraft-qbar-dropdown' class='col-sm-2 control-label'>qbar</label>" +
						"<div class='col-sm-4'>" +
							"<select class='form-control' id='spellcraft-qbar-dropdown' name='spellcraft-qbar-dropdown'>" +
								printOptionTag(1) +
								printOptionTag(2) +
								printOptionTag(3) +
							"</select>" +
						"</div>" +
					"</div>" +
					"<div id='container-spellcrafter'>" +
					"</div>" +
				"</div>" +
				"<div class='modal-footer'>" +
					"<button type='button' class='btnX btn-default' id='spellcraft-add-item-button'>Add Item</button>\n" +
					"<button type='button' class='btnX btn-default' data-dismiss='modal'>Close</button>\n" +
					"<button type='submit' class='btnX btn-primary btn-sm'>Set</button>" +
				"</div>" +
			"</form>" +
		"</div>" +
	"</div>";

	$('#spellcraft-form').on('submit', function(event) {
		event.preventDefault();
		let asd = $(this).serialize()
		console.log(asd)
		//let element = document.getElementById('spellcraft-character-dropdown');
		//let qbarValue = element.options[element.selectedIndex].value;

		ipcRenderer.send('spellcraft-form-submit-event',
		42,
		//document.getElementById('setting-value-number').value
		);
	});

	ipcRenderer.on('spellcraft-form-submit-event-reply', event => {
		$('#spellcraft-modal').modal('hide');
	});
	
	ipcRenderer.send('get-spellcrafters');

	generaPezzo();
	document.getElementById('spellcraft-add-item-button').onclick = () => {
		generaPezzo();
	}

	$('#spellcraft-modal').modal('show');
}

ipcRenderer.on('get-spellcrafters-reply', (event, characters) => {
	let selectElement = document.getElementById('spellcraft-character-dropdown');
	for (let c = 0; c < characters.length; c++) {
		selectElement.innerHTML += printOptionTag(characters[c].realm, characters[c].name);
	}
});

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
				"' placeholder='0' readonly>" +
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
			"' onchange='reCalc(" + nItem + "," + nRiga + ",true)'>" +
				printOptionTag(0, '+ Stat') +
				printOptionTag(1, '+ Resists') +
				printOptionTag(2, '+ Hits') +
				printOptionTag(3, '+ Power') +
				printOptionTag(4, '+ Focus') +
				printOptionTag(5, '+ Skill') +
				printOptionTag(6, 'Unused', true) +
			"</select>" +
		"</div>" +
		"<div class='col-sm-3'>" +
			"<select class='form-control' onchange='reCalc(" + nItem + "," + nRiga + ")' id='evalue" +
			nItem + nRiga + "'></select>" +
		"</div>" +
		"<div class='col-sm-4'>" +
			"<select class='form-control' onchange='reCalc(" + nItem + "," + nRiga + ")' id='ebonus" + nItem + nRiga + "' ></select>" +
		"</div>" +
	"</div>";
}

const reCalc = (nItem, nRiga, refillFieldsFlag = false) => {
	if (0 == nItem) {//se 0 0 proviene dalla dropdown char
		return resetAll();
	}
	let realm = getDropDownValue('spellcraft-character-dropdown');
	if (-1 === realm) {
		return;
	}
	let effectValue = getEffectValue(nItem, nRiga);
	let evalueElement = document.getElementById('evalue' + nItem + nRiga);
	let ebonusElement = document.getElementById('ebonus' + nItem + nRiga);
	if (refillFieldsFlag) {
		refillFields(effectValue, evalueElement, ebonusElement, realm);
	}

	let finalImbueResult = reCalcHelper(
		getDropDownValue('effect'+ nItem + 1),
		getDropDownValue('evalue'+ nItem + 1),
		getDropDownValue('ebonus'+ nItem + 1),
		getDropDownValue('effect'+ nItem + 2),
		getDropDownValue('evalue'+ nItem + 2),
		getDropDownValue('ebonus'+ nItem + 2),
		getDropDownValue('effect'+ nItem + 3),
		getDropDownValue('evalue'+ nItem + 3),
		getDropDownValue('ebonus'+ nItem + 3),
		getDropDownValue('effect'+ nItem + 4),
		getDropDownValue('evalue'+ nItem + 4),
		getDropDownValue('ebonus'+ nItem + 4), realm);

	document.getElementById('imbue' + nItem).value = Math.floor(finalImbueResult);
}

const getDropDownValue = (id) => {
	let element = document.getElementById(id);
	let value = -1;
	try {
		value = element.options[element.selectedIndex].value;
	}
	catch(e) {}
	finally {
		return value;
	}
}

const refillFields = (effectValue, evalueElement, ebonusElement, realm) => {
	switch (effectValue) {
		case "0": fillStat(evalueElement, ebonusElement); break;//'stat'
		case "1": fillResist(evalueElement, ebonusElement); break;//'resist'
		case "2": fillHits(evalueElement, ebonusElement); break;//'hits'
		case "3": fillPower(evalueElement, ebonusElement); break;//'power'
		case "4": fillFocus(evalueElement, ebonusElement, realm); break;//'focus'
		case "5": fillSkill(evalueElement, ebonusElement, realm); break;//'skill'
		case "6": resetLine(evalueElement, ebonusElement); break;//unused
	}
}

const resetLine = (evalueElement, ebonusElement) => {
	evalueElement.innerHTML = '';
	ebonusElement.innerHTML = '';
}

const fillFocus = (evalueElement, ebonusElement, realm) => {
	let innerHTML = '';
	evalueElement.innerHTML = '';
	for (let i = 0; i < arrFocus.length; i++) {
		innerHTML += printOptionTag(i, '+ ' + arrFocus[i]);
	}
	evalueElement.innerHTML = innerHTML;
	innerHTML = '';
	ebonusElement.innerHTML = '';
	let arrayFocus = arrFocusUsedAlb;
	switch (realm) {
		case "1": arrayFocus = arrFocusUsedHib; break;//'Hibernia'
		case "2": arrayFocus = arrFocusUsedMid; break;//'Midgard'
	}
	for (let i = 0; i < arrayFocus.length; i++) {
		innerHTML += printOptionTag(i, arrayFocus[i]);
	}
	ebonusElement.innerHTML = innerHTML;
}

const fillSkill = (evalueElement, ebonusElement, realm) => {
	let innerHTML = '';
	evalueElement.innerHTML = '';
	for (let i = 0; i < arrSkills.length; i++) {
		innerHTML += printOptionTag(i, '+ ' + arrSkills[i]);
	}
	evalueElement.innerHTML = innerHTML;
	innerHTML = ''
	ebonusElement.innerHTML = '';
	let arraySkill = arrSkillsUsedAlb;
	switch (realm) {
		case "1": arraySkill = arrSkillsUsedHib; break;//'Hibernia'
		case "2": arraySkill = arrSkillsUsedMid; break;//'Midgard'
	}
	for (let i = 0; i < arraySkill.length; i++) {
		innerHTML += printOptionTag(i, arraySkill[i]);
	}
	ebonusElement.innerHTML = innerHTML;
}

const fillPower = (evalueElement, ebonusElement) => {
	let innerHTML = '';
	evalueElement.innerHTML = '';
	for (let i = 0; i < arrResist.length; i++) {
		innerHTML += printOptionTag(i, '+ ' + arrResist[i]);
	}
	evalueElement.innerHTML = innerHTML;
	ebonusElement.innerHTML = '';
	ebonusElement.innerHTML += printOptionTag(0, 'Power');
}

const fillHits = (evalueElement, ebonusElement) => {
	let innerHTML = '';
	evalueElement.innerHTML = '';
	for (let i = 0; i < arrHits.length; i++) {
		innerHTML += printOptionTag(i, '+ ' + arrHits[i]);
	}
	evalueElement.innerHTML = innerHTML;
	ebonusElement.innerHTML = '';
	ebonusElement.innerHTML += printOptionTag(0, 'HP');
}

const fillResist = (evalueElement, ebonusElement) => {
	let innerHTML = '';
	evalueElement.innerHTML = '';
	for (let i = 0; i < arrResist.length; i++) {
		innerHTML += printOptionTag(i, '+ ' + arrResist[i]);
	}
	evalueElement.innerHTML = innerHTML;
	innerHTML = '';
	ebonusElement.innerHTML = '';
	for (let i = 0; i < arrResistUsed.length; i++) {
		innerHTML += printOptionTag(i, arrResistUsed[i]);
	}
	ebonusElement.innerHTML = innerHTML;
}

const fillStat = (evalueElement, ebonusElement) => {//
	let innerHTML = '';
	evalueElement.innerHTML = '';
	for (let i = 0; i < arrStatsFE.length; i++) {
		innerHTML += printOptionTag(i, '+ ' + arrStatsFE[i]);
	}
	evalueElement.innerHTML = innerHTML;
	innerHTML = '';
	ebonusElement.innerHTML = '';
	for (let i = 0; i < arrStatsUsed.length; i++) {
		innerHTML += printOptionTag(i, arrStatsUsed[i]);
	}
	ebonusElement.innerHTML = innerHTML;
}

const printOptionTag = (value, text = '', selected = '') => {
	let _text = text === '' ? value : text;
	let _selected = selected === '' ? '' : " selected='selected'";
	if (isNumber(value)) {
		return `<option value=${value}` + _selected + '>' + _text + '</option>';
	}
	else {
		return '<option value="' + value + '"' + _selected + '>' + _text + '</option>';
	}
}

const getEffectValue = (nItem, nRiga) => {
	let element = document.getElementById('effect' + nItem + nRiga);
	return element.value;
}

const resetAll = () => {
	document.getElementById('container-spellcrafter').innerHTML = '';
	itemCounter = 0;
	generaPezzo();
}

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

const reCalcHelper = (
	DAOCSTARTER_G1_EFFECT, DAOCSTARTER_G1_AMOUNT, DAOCSTARTER_G1_TERZA,
	DAOCSTARTER_G2_EFFECT, DAOCSTARTER_G2_AMOUNT, DAOCSTARTER_G2_TERZA,
	DAOCSTARTER_G3_EFFECT, DAOCSTARTER_G3_AMOUNT, DAOCSTARTER_G3_TERZA,
	DAOCSTARTER_G4_EFFECT, DAOCSTARTER_G4_AMOUNT, DAOCSTARTER_G4_TERZA, DAOCSTARTER_REAME) => {
	var t1 = "";
	var itemStrength1 = 0;
	var itemStrength2 = 0;
	var itemStrength3 = 0;
	var itemStrength4 = 0;
	var BONUSAMOUNT = 0;
	var BONUSULTIMACELLA = 0;
	var strOutput = '';
	var strOutput2 = '';
	var BONUS0123456UNUSED = DAOCSTARTER_G1_EFFECT;

	const replace1 = () => {
		BONUSAMOUNT = a[0];
		BONUSULTIMACELLA = a[1];
		strOutput = a[2];
		strOutput2 = a[3];
	}

	let a =	getRecipesAndIngredients(BONUS0123456UNUSED, BONUSAMOUNT, DAOCSTARTER_G1_AMOUNT, BONUSULTIMACELLA, 
	DAOCSTARTER_G1_TERZA, DAOCSTARTER_REAME, strOutput, strOutput2, true);
	replace1();

	a = getItemStrength(BONUS0123456UNUSED, itemStrength1, BONUSAMOUNT);
	BONUS0123456UNUSED = a[0];
	itemStrength1 = a[1];
	BONUS0123456UNUSED = DAOCSTARTER_G2_EFFECT;

	a = getRecipesAndIngredients(BONUS0123456UNUSED, BONUSAMOUNT, DAOCSTARTER_G2_AMOUNT, BONUSULTIMACELLA, DAOCSTARTER_G2_TERZA, DAOCSTARTER_REAME, strOutput, strOutput2, false);
	replace1();

	a = getItemStrength(BONUS0123456UNUSED, itemStrength2, BONUSAMOUNT);
	BONUS0123456UNUSED = a[0];
	itemStrength2 = a[1];
	BONUS0123456UNUSED = DAOCSTARTER_G3_EFFECT;

	a = getRecipesAndIngredients(BONUS0123456UNUSED, BONUSAMOUNT, DAOCSTARTER_G3_AMOUNT, BONUSULTIMACELLA, DAOCSTARTER_G3_TERZA, DAOCSTARTER_REAME, strOutput, strOutput2, false);
	replace1();

	a = getItemStrength(BONUS0123456UNUSED, itemStrength3, BONUSAMOUNT);
	BONUS0123456UNUSED = a[0];
	itemStrength3 = a[1];
	BONUS0123456UNUSED = DAOCSTARTER_G4_EFFECT;

	a = getRecipesAndIngredients(BONUS0123456UNUSED, BONUSAMOUNT, DAOCSTARTER_G4_AMOUNT, BONUSULTIMACELLA, DAOCSTARTER_G4_TERZA, DAOCSTARTER_REAME, strOutput, strOutput2, false);
	replace1();

	a = getItemStrength(BONUS0123456UNUSED, itemStrength4, BONUSAMOUNT);
	BONUS0123456UNUSED = a[0];
	itemStrength4 = a[1];

	if (DAOCSTARTER_G1_EFFECT == 4) { itemStrength1 = 1; }
	if (DAOCSTARTER_G2_EFFECT == 4) { itemStrength2 = 1; }
	if (DAOCSTARTER_G3_EFFECT == 4) { itemStrength3 = 1; }
	if (DAOCSTARTER_G4_EFFECT == 4) { itemStrength4 = 1; }

	if ((itemStrength4 >= itemStrength2) && (itemStrength4 >= itemStrength3) && (itemStrength4 >= itemStrength1)) { itemStrength4 = itemStrength4 * 2; }
	if ((itemStrength3 >= itemStrength2) && (itemStrength3 >= itemStrength1) && (itemStrength3 >= itemStrength4)) { itemStrength3 = itemStrength3 * 2; }
	if ((itemStrength2 >= itemStrength1) && (itemStrength2 >= itemStrength3) && (itemStrength2 >= itemStrength4)) { itemStrength2 = itemStrength2 * 2; }
	if ((itemStrength1 >= itemStrength2) && (itemStrength1 >= itemStrength3) && (itemStrength1 >= itemStrength4)) { itemStrength1 = itemStrength1 * 2; }

	let itemStrength = itemStrength1 + itemStrength2 + itemStrength3 + itemStrength4;

	if (itemStrength > 0) { var i9 = Math.floor(itemStrength / 2); }
	if (itemStrength < 1) { var i9 = 0; }

	t1 += doOutputLine(DAOCSTARTER_G1_EFFECT, DAOCSTARTER_G1_AMOUNT, DAOCSTARTER_G1_TERZA, DAOCSTARTER_REAME);
	t1 += doOutputLine(DAOCSTARTER_G2_EFFECT, DAOCSTARTER_G2_AMOUNT, DAOCSTARTER_G2_TERZA, DAOCSTARTER_REAME);
	t1 += doOutputLine(DAOCSTARTER_G3_EFFECT, DAOCSTARTER_G3_AMOUNT, DAOCSTARTER_G3_TERZA, DAOCSTARTER_REAME);
	t1 += doOutputLine(DAOCSTARTER_G4_EFFECT, DAOCSTARTER_G4_AMOUNT, DAOCSTARTER_G4_TERZA, DAOCSTARTER_REAME);
	console.log(t1);//value
	console.log(strOutput);//recipe
	console.log(strOutput2);//ingredients
	return i9;
}

const doOutputLine = function (element1, element2, element3, realm) {
	var tr = '';
	switch (element1) {
		case "0":
			tr += '- ';
			switch (element3) {
				case "0": tr += 'Strength: '; break;
				case "1": tr += 'Dexterity: '; break;
				case "2": tr += 'Quickness: '; break;
				case "3": tr += 'Constitution: '; break;
				case "4": tr += 'Intelligence: '; break;
				case "5": tr += 'Piety: '; break;
				case "6": tr += 'Empathy: '; break;
				case "7": tr += 'Charisma: '; break;
			}
			tr += Math.floor(arrStats[element2] * 1.5) + '\n'; break;
		case "1": tr = '- ' + arrResistUsed[element3] + ': ' + arrResist[element2] + '%\n'; break;
		case "2": tr = '- ' + 'Hits: ' + arrHits[element2] + '\n'; break;
		case "3": tr = '- ' + 'Power: ' + arrPower[element2] + '\n'; break;
		case "4":
			switch (realm) {
				case "0": tr = '- ' + arrFocusUsedAlb[element3] + ': ' + arrFocus[element2] + ' lvls\n'; break;
				case "1": tr = '- ' + arrFocusUsedHib[element3] + ': ' + arrFocus[element2] + ' lvls\n'; break;
				case "2": tr = '- ' + arrFocusUsedMid[element3] + ': ' + arrFocus[element2] + ' lvls\n'; break;
			}
			break;
		case "5":
			switch (realm) {
				case "0": tr = '- ' + arrSkillsUsedAlb[element3] + ': ' + arrSkills[element2] + '\n'; break;
				case "1": tr = '- ' + arrSkillsUsedHib[element3] + ': ' + arrSkills[element2] + '\n'; break;
				case "2": tr = '- ' + arrSkillsUsedMid[element3] + ': ' + arrSkills[element2] + '\n'; break;
			}
			break;
	}
	return tr;
}

const getItemStrength = (BONUS0123456UNUSED, itemStrength, BONUSAMOUNT) => {
	if (BONUS0123456UNUSED == 3) {
		BONUS0123456UNUSED = 1;
	}
	switch (BONUS0123456UNUSED) {
		case "0": itemStrength = (BONUSAMOUNT * 2) + 1; break;
		case "1":
		case 1:
			if (BONUSAMOUNT == 0) { itemStrength = 1; }
			if (BONUSAMOUNT == 1) { itemStrength = 2; }
			if (BONUSAMOUNT == 2) { itemStrength = 4; }
			if (BONUSAMOUNT == 3) { itemStrength = 8; }
			if (BONUSAMOUNT == 4) { itemStrength = 12; }
			if (BONUSAMOUNT == 5) { itemStrength = 16; }
			if (BONUSAMOUNT == 6) { itemStrength = 20; }
			if (BONUSAMOUNT == 7) { itemStrength = 24; }
			if (BONUSAMOUNT == 8) { itemStrength = 28; }
			if (BONUSAMOUNT == 9) { itemStrength = 32; }
			break;
		case "2":
			itemStrength = (BONUSAMOUNT * 2);
			if (itemStrength > 0) { itemStrength = itemStrength + 1; }
			if (itemStrength == 0) { itemStrength = 1; }
			break;
		case "5":
			itemStrength = BONUSAMOUNT * 5;
			if (itemStrength == 0) { itemStrength = 1; }
			break;
	}
	return new Array(BONUS0123456UNUSED, itemStrength);
}

const getRecipesAndIngredients = (_BONUS0123456UNUSED, _BONUSAMOUNT, _DAOCSTARTER_X1_AMOUNT, _BONUSULTIMACELLA, 
	_DAOCSTARTER_X1_TERZA, _DAOCSTARTER_REAME, _strOutput, _strOutput2, flag) => {
	var intNumAlbSkillsUsed = 34;
	var intNumMidSkillsUsed = 30;
	var intNumHibSkillsUsed = 34;
	var intFocusUsedAlb = 12;
	var intFocusUsedHib = 12;
	var intFocusUsedMid = 6;
	if (_BONUS0123456UNUSED < 6) {
		_BONUSAMOUNT = _DAOCSTARTER_X1_AMOUNT;
		_BONUSULTIMACELLA = _DAOCSTARTER_X1_TERZA;
		switch (_BONUS0123456UNUSED) {
			case "0":
				_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrStatsName[_BONUSULTIMACELLA] + '\n';
				_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrStatsMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrStatsMat2[_BONUSULTIMACELLA] + '\n';
				break;
			case "1":
				_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrResistName[_BONUSULTIMACELLA] + '\n';
				_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrResistMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrResistMat2[_BONUSULTIMACELLA] + '\n';
				break;
			case "2":
				_strOutput += arrGemStrength[_BONUSAMOUNT] + ' blood essence jewel\n';
				_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' Essence of Life / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Giants Blood\n';
				break;
			case "3":
				_strOutput += arrGemStrength[_BONUSAMOUNT] + ' mystic essence jewel\n';
				_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' Essence of Life / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Essence \n';
				break;
			case "4":
				switch (_DAOCSTARTER_REAME) {
					case "0":
						_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrFocusAlbName[_BONUSULTIMACELLA] + '\n';
						if (flag) {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrFocusAlbMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrFocusAlbMat2[_BONUSULTIMACELLA];
							if (_BONUSULTIMACELLA == intFocusUsedAlb - 1) { _strOutput2 += ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Energy' + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Treant Blood'; }
							_strOutput2 += '\n';
						}else {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrFocusAlbMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrFocusAlbMat2[_BONUSULTIMACELLA] + '\n';
						}
						break;
					case "1":
						_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrFocusHibName[_BONUSULTIMACELLA] + '\n';
						if (flag) {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrFocusHibMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrFocusHibMat2[_BONUSULTIMACELLA];
							if (_BONUSULTIMACELLA == intFocusUsedHib - 1) { _strOutput2 += ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Energy' + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Treant Blood'; }
							_strOutput2 += '\n';
						}else {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrFocusHibMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrFocusHibMat2[_BONUSULTIMACELLA] + '\n';
						}
						break;
					case "2":
						_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrFocusMidName[_BONUSULTIMACELLA] + '\n';
						if (flag) {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrFocusMidMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrFocusMidMat2[_BONUSULTIMACELLA];
							if (_BONUSULTIMACELLA == intFocusUsedMid - 1) { _strOutput2 += ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Energy' + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Treant Blood'; }
							_strOutput2 += '\n';
						}else {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1b[_BONUSAMOUNT] + ' ' + arrFocusMidMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrFocusMidMat2[_BONUSULTIMACELLA] + '\n';
						}
						break;
				}
				break;
			case "5":
				switch (_DAOCSTARTER_REAME) {
					case "0":
						_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrSkillsAlbName[_BONUSULTIMACELLA] + '\n';
						if (flag) {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrSkillsAlbMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrSkillsAlbMat2[_BONUSULTIMACELLA];
							if (_BONUSULTIMACELLA >= intNumAlbSkillsUsed - 2) { _strOutput2 += ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Energy' + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Treant Blood'; }
							_strOutput2 += '\n';
						}else {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrSkillsAlbMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrSkillsAlbMat2[_BONUSULTIMACELLA] + '\n';
						}
						break;
					case "1":
						_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrSkillsHibName[_BONUSULTIMACELLA] + '\n';
						if (flag) {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrSkillsHibMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrSkillsHibMat2[_BONUSULTIMACELLA];
							if (_BONUSULTIMACELLA >= intNumHibSkillsUsed - 2) { _strOutput2 += ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Energy' + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Treant Blood'; }
							_strOutput2 += '\n';
						}else {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrSkillsHibMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrSkillsHibMat2[_BONUSULTIMACELLA] + '\n';
						}
						break;
					case "2":
						_strOutput += arrGemStrength[_BONUSAMOUNT] + ' ' + arrSkillsMidName[_BONUSULTIMACELLA] + '\n';
						if (flag) {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrSkillsMidMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrSkillsMidMat2[_BONUSULTIMACELLA];
							if (_BONUSULTIMACELLA >= intNumMidSkillsUsed - 2) { _strOutput2 += ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Mystic Energy' + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' Treant Blood'; }
							_strOutput2 += '\n';
						}else {
							_strOutput2 += '1 ' + arrGemStrGem[_BONUSAMOUNT] + ' / ' + arrGemStrMat1a[_BONUSAMOUNT] + ' ' + arrSkillsMidMat1[_BONUSULTIMACELLA] + ' / ' + arrGemStrMat2[_BONUSAMOUNT] + ' ' + arrSkillsMidMat2[_BONUSULTIMACELLA] + '\n';
						}
						break;
				}
				break;
		}
	}
	return new Array(_BONUSAMOUNT, _BONUSULTIMACELLA, _strOutput, _strOutput2);
}
