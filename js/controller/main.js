"use strict";

let localhost;
window.jQuery = window.$ = require('jquery');
const {ipcRenderer} = require('electron');
ipcRenderer.send('asynchronous-get-port', 'arg');
const datatable = require('datatables.net');

ipcRenderer.on('asynchronous-reply-get-port', (event, port) => {
	localhost = "http://localhost:" + port;

	datatable().$('#charactersDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxCharacter',
		columnDefs: [
			{"width": "1%", "targets": 0 }
		]
	});

	datatable().$('#accountsDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxAccount',
		columnDefs: [
			{"width": "1%", "targets": 0 }
		]
	});

	datatable().$('#settingsDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxSetting'
	});
})

//fa aprire le classi open-in-browser fuori dal main process
const shell = require('electron').shell;
$('.open-in-browser').click((event) => {
	event.preventDefault();
	shell.openExternal(event.target.href);
});

let renderFavourites = function() {
	$.get(localhost + '?getAllFavouriteCharacters', function(favourites) {
		$('.draggable').remove();
		favourites.forEach(function (item) {
			if (item.x === undefined) {
				item.x = 40;
				item.y = 440;
			}
			$("<div id='" + item._id + "' class='draggable ui-widget-content"
			+ '' + "' style='left:" + item.x + "px; top:" + item.y + "px;'>"
			+ "<table class='table-draggable'>"
			+ "<tr><td>" + item.name + "</td><td><input type='checkbox' id='" + item._id + "' class='fav-checkbox' value='false'></td></tr>"
			+ "<tr>"
			+ "<td><a href=javascript:playCharacterRow(\'" + item._id + "\',true); class='btnX btn-primary btn-sm sr-button'>play<\/a></td>"
			+ "<td><a href=javascript:killCharacterRow(\'" + item._id + "\',true); class='btnX btn-primary btn-sm btnX-delete'>qtd<\/a></td>"
			+ "</tr></table></div>")
			.appendTo("#mini-char-container");
		});
		$(function() {
			$(".draggable").draggable({
				stop: function(o) {
					$.get(localhost + '?saveFavouriteCoordinate=' + o.target.id
					+'&left=' + o.target.offsetLeft
					+'&top=' + o.target.offsetTop , function () {
						//console.log("ok");
					});
				},
				containment: "#mini-char-container"//,
				//cursor: "move", cursorAt: { top: 56, left: 56 }
			});
		});
	});
};

$(renderFavourites);
