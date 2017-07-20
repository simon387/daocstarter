'use strict';

let localhost;
window.jQuery = window.$ = require('jquery');

const {ipcRenderer, remote} = require('electron');
const {dialog} = require('electron').remote;
const datatable = require('datatables.net');

const playCSS = "class='btnX btn-primary btn-sm sr-button'";
const cancCSS = "class='sr-button btnX btn-primary btn-md btnX-delete'";

let characterDataTable;
let accountDataTable;
let settingDataTable;
let teamDataTable;
ipcRenderer.send('asynchronous-get-port', 'arg');
ipcRenderer.send('asynchronous-get-character-per-page');
ipcRenderer.send('asynchronous-get-team-per-page');
ipcRenderer.send('asynchronous-get-account-per-page');
ipcRenderer.send('asynchronous-get-setting-per-page');

ipcRenderer.on('asynchronous-reply-get-port', (event, port) => {
	localhost = 'http://localhost:' + port;

	ipcRenderer.on('asynchronous-reply-get-character-per-page', (event, _length) => {
		characterDataTable = datatable().$('#charactersDT').DataTable({
			'aProcessing': false,
			'aServerSide': false,
			'ajax': localhost + '?ajaxCharacter',
			columnDefs: [
				{'width': '1%', 'targets': 0}
			],
			'iDisplayLength': _length,
			'initComplete': () => {
				let element = document.querySelector('div#charactersDT_length label select');
				element.addEventListener('change', e => {
					ipcRenderer.send('asynchronous-set-items-per-page',
					'character.items.per.page',
					element.options[element.selectedIndex].value);
				}, false);
			}
		});
	});

	ipcRenderer.on('asynchronous-reply-get-team-per-page', (event, _length) => {
		teamDataTable = datatable().$('#teamsDT').DataTable({
			'aProcessing': false,
			'aServerSide': false,
			'ajax': localhost + '?ajaxTeam',
			columnDefs: [
				{'width': '1%', 'targets': 0}
			],
			'iDisplayLength': _length,
			'initComplete': () => {
				let element = document.querySelector('div#teamsDT_length label select');
				element.addEventListener('change', e => {
					ipcRenderer.send('asynchronous-set-items-per-page',
					'team.items.per.page',
					element.options[element.selectedIndex].value);
				}, false);
			}
		});
	});

	ipcRenderer.on('asynchronous-reply-get-account-per-page', (event, _length) => {
		accountDataTable = datatable().$('#accountsDT').DataTable({
			'aProcessing': false,
			'aServerSide': false,
			'ajax': localhost + '?ajaxAccount',
			columnDefs: [
				{'width': '1%', 'targets': 0}
			],
			'iDisplayLength': _length,
			'initComplete': () => {
				let element = document.querySelector('div#accountsDT_length label select');
				element.addEventListener('change', e => {
					ipcRenderer.send('asynchronous-set-items-per-page',
					'account.items.per.page',
					element.options[element.selectedIndex].value);
				}, false);
			}
		});
	});

	ipcRenderer.on('asynchronous-reply-get-setting-per-page', (event, _length) => {
		settingDataTable = datatable().$('#settingsDT').DataTable({
			'aProcessing': false,
			'aServerSide': false,
			'ajax': localhost + '?ajaxSetting',
			'iDisplayLength': _length,
			'initComplete': () => {
				let element = document.querySelector('div#settingsDT_length label select');
				element.addEventListener('change', e => {
					ipcRenderer.send('asynchronous-set-items-per-page',
					'character.items.per.page',
					element.options[element.selectedIndex].value);
				}, false);
			}
		});
	});
})

//fa aprire le classi open-in-browser fuori dal main process
const shell = require('electron').shell;
$('.open-in-browser').click((event) => {
	event.preventDefault();
	shell.openExternal(event.target.href);
});

const playButton = (entity, id) => {
	return '<a href=javascript:play' + entity + "Row(\'" + id +
	"\',true); " + playCSS + '>play<\/a>';
}

const qtdButton = (entity, id) => {
	return '<a href=javascript:kill' + entity + "Row(\'" + id +
	"\',true); " + cancCSS + '>qtd<\/a>';
}

const renderFavourites = () => {
	ipcRenderer.send('getAllFavouriteCharacters', '');
};
ipcRenderer.on('getAllFavouriteCharacters-reply', (event, favourites) => {
	$('.draggable').remove();
	favourites.forEach(item => {
		if (undefined === item.x) {
			item.x = 40;
			item.y = 220;
		}
		$("<div id='" + item._id + "' class='draggable ui-widget-content' " +
		"style='left:" + item.x + 'px; top:' + item.y + "px;'>" +
		"<table class='table-draggable'>" +
		'<tr>' +
			'<td>' + item.name + '</td>' +
			'<td>' + "<img height='32' width='32' src='../img/" + item.classe + ".jpg'>" + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td class="fav-details">' + item.classe + ' [' + item.account + '] of ' + item.server + '</td>' +
			'<td>' + "<input type='checkbox' id='" + item._id + "' class='fav-checkbox' value='false'>" + '</td>' + 
		'</tr>' +
		'<tr>' +
			'<td>' + playButton('Character', item._id) + '</td>' +
			'<td>' + qtdButton('Character', item._id) + '</td>' +
		'</tr>' +
		'</table></div>').appendTo('#mini-char-container');
	});
	$(() => {
		$(".draggable").draggable({
			stop: (o) => {
				ipcRenderer.send('saveFavouriteCoordinate',
				o.target.id,
				o.target.offsetLeft,
				o.target.offsetTop);
			},
			containment: "#mini-char-container"//cursor: "move", cursorAt: { top: 56, left: 56 }
		});
	});
});

const refreshComboByFetchAndSelector = (query, selector, sel = '') => {
	fetch(localhost + query)
	.then(response => {
		return response.json();
	})
	.then(array => {
		document.querySelectorAll(selector).forEach(el => {
			el.innerHTML = '';
			array.map(item => {
				if (sel != '' && item == sel) {
					el.innerHTML += '<option value="' + item + '" selected=true>' + item + '</option>';
				} else {
					el.innerHTML += '<option value="' + item + '">' + item + '</option>';
				}
			});
		});
	});
}

$(renderFavourites);
