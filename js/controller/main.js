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
		"ajax":localhost + '?ajaxCharacter'
	});

	datatable().$('#settingsDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxSetting'
	});

	datatable().$('#accountsDT').DataTable({
		"aProcessing":false,
		"aServerSide":false,
		"ajax":localhost + '?ajaxAccount',
		columnDefs: [
			{
				
			}
		]
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
			console.log(item);
			if (item.x === undefined) {
				item.x = 40;
			}
			if (item.y === undefined) {
				item.y = 440;
			}
			$("<div id='" + item._id + "' class='draggable ui-widget-content draggable"
			+ '' + "' style='left:" + item.x + "px; top:" + item.y + "px;'>"
			+ "<table class='table-draggable'>"
			+ "<tr><td>" + item.name + "</td><td><input type='checkbox' class='' id='" + item._id + "' value='false'></td></tr>"
			+ "<tr>"
			+ "<td><a href=javascript:playCharacterRow(\'" + item._id + "\'); class='btnX btn-primary btn-sm sr-button'>play<\/a></td>"
			+ "<td><a href=javascript:killCharacterRow(\'" + item._id + "\'); class='btnX btn-primary btn-sm btnX-delete'>qtd<\/a></td>"
			+ "</tr></table></div>")
			.appendTo("#mini-char-container");
		}); 
		$(function() {
			$(".draggable").draggable({
				stop: function() {
				//updateCounterStatus( $stop_counter, counts[ 2 ] );
				}
			});
		});
	});
};

$(renderFavourites);


