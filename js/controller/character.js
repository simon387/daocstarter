"use strict";

const refreshComboByFetchAndSelector = (query, selector, sel = '') => {
	fetch(localhost + query)
	.then(response => {
		return response.json();
	})
	.then(array => {
		document.querySelectorAll(selector).forEach(el => {
			el.innerHTML = '';
			array.map(item => {
				if (sel != '' && item==sel) {
					el.innerHTML += '<option value="' + item + '" selected=true>' + item + '</option>';
				} else {
					el.innerHTML += '<option value="' + item + '">' + item + '</option>';
				}
			});
		});
	});
}

function refreshModalCombos() {
	refreshComboByFetchAndSelector('?getAllAccountsNames', '.character-account-dropdown', "");
	refreshComboByFetchAndSelector('?getAllServersNames', '.character-servers-dropdown', "");
	refreshComboByFetchAndSelector('?getAllClassesNames', '.character-classes-dropdown', "");
	refreshComboByFetchAndSelector('?getAllResolutions', '.character-resolution-dropdown', "");
}
// Add new row
$("#add-character-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?addCharacter', $(this).serialize(), function(data) {
		let tbody = $('#charactersDT').children('tbody');
		let table = tbody.length ? tbody : $('#charactersDT');
		table.append('<tr role="row"><td class="sorting_1">' + data._id +
		'</td><td>' +
		"<a href=javascript:playCharacterRow(\'" + data._id + "\'); class='btnX btn-primary btn-sm sr-button'>play<\/a> " +
		"<a href=javascript:killCharacterRow(\'" + data._id + "\'); class='btnX btn-primary btn-sm btnX-delete'>qtd<\/a>" +
		'</td><td>' + data.name + '</td><td>' + data.lastlogin + '</td><td>' + data.account + '</td><td>' + data.server +
		'</td><td>' + data.classe + '</td><td>' + data.resolution + '</td><td>' + data.windowed +
		'</td><td><a data-id="row-' + data._id + '" href="javascript:editCharacterRow(\'' + data._id +
		'\');" class="btnX btn-md btn-successX">edit</a>&nbsp;<a href="javascript:removeCharacterRow(\''
		+ data._id + '\');" class="btnX btn-default btn-md btnX-delete">X</a></td></tr>');
		$('#charactersDT tbody tr').remove(":contains('No data available in table')");
		$(renderFavourites);
		$('#add-character-modal').modal('hide');
	}).fail(function() {
		alert('Unable to Add new character');
	});
});
// Remove row
function removeCharacterRow(id) {
	if (undefined != typeof id) {
		$.get(localhost + '?removeCharacter=' + id, function() {
			$('a[data-id="row-' + id + '"]').parent().parent().remove();
			$(renderFavourites);
		}).fail(function() {
			alert('unable to remove row.')
		});
	} else {
		alert('Unknown row id.');
	}
}
// Edit row
function editCharacterRow(id) {
	
	if (undefined != typeof id) {
		$.getJSON(localhost + '?editCharacter=' + id, function(obj) {
			$('#edit-character-id').val(obj._id);
			$('#edit-character-name').val(obj.name);
			refreshComboByFetchAndSelector('?getAllAccountsNames', '.character-account-dropdown', obj.account);
			refreshComboByFetchAndSelector('?getAllServersNames', '.character-servers-dropdown', obj.server);
			refreshComboByFetchAndSelector('?getAllClassesNames', '.character-classes-dropdown', obj.classe);
			refreshComboByFetchAndSelector('?getAllResolutions', '.character-resolution-dropdown', obj.resolution);
			/*$.get(localhost + '?getAllResolutions', function(array){
				$('#edit-character-resolution').empty();
				for (let i = 0; i < array.length; i++) {
					$('#edit-character-resolution').append($("<option>" + array[i] + "</option>"));
				}
				$('#edit-character-resolution').val(obj.resolution);
			});*/
			$("#edit-character-windowed").prop("checked", obj.windowed);
			$("#edit-character-favourite").prop("checked", obj.favourite);
			$("#edit-character-title").val(obj.title);
			$('#edit-character-modal').modal('show');
		}).fail(function() {
			alert('unable to edit character.')
		});
	} else {
		alert('Unknown character id.');
	}

	
}
// Save edited row
$("#edit-character-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editCharacter=' + $('#edit-character-id').val(), $(this).serialize(), function(data) {
		var tr = $('a[data-id="row-' + $('#edit-character-id').val() + '"]').parent().parent();
		$('td:eq(2)', tr).html(data.name);
		$('td:eq(3)', tr).html(data.lastlogin);
		$('td:eq(4)', tr).html(data.account);
		$('td:eq(5)', tr).html(data.server);
		$('td:eq(6)', tr).html(data.classe);
		$('td:eq(7)', tr).html(data.resolution);
		$('td:eq(8)', tr).html(data.windowed + "");
		$('#edit-character-modal').modal('hide');
		$(renderFavourites);
	}).fail(function() {
		alert('Unable to save data, please try again later.');
	});
});
// playCharacter
function playCharacterRow(id, fromFavourite = false) {
	playCharHelper(id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			if (id != checkedboxArray[i].id) {
				playCharHelper(checkedboxArray[i].id);
			}
		}
	}
}

function playCharHelper(id) {
	if (undefined != typeof id) {
		$.get(localhost + '?playCharacter=' + id, function(timestamp) {
			let lastLoginCell = $('a[data-id="row-' + id + '"]').parent().parent().children()[3];
			if (undefined != lastLoginCell && timestamp != "") {
				lastLoginCell.innerHTML = timestamp;
			}
		}).fail(function() {
			alert('unable to play row.')
		});
	} else {
		alert('Unknown row id.');
	}
}

function killCharacterRow(id, fromFavourite = false) {
	killCharacterHelper(id);
	if (fromFavourite) {
		let checkedboxArray = $('.fav-checkbox:checked');
		for (let i = 0; i < checkedboxArray.length; i++) {
			if (id != checkedboxArray[i].id) {
				killCharacterHelper(checkedboxArray[i].id);
			}
		}
	}
}

function killCharacterHelper(id) {
	if (undefined != typeof id) {
		$.get(localhost + '?killCharacter=' + id, function() {
		}).fail(function() {
			alert('unable to kill character.')
		});
	} else {
		alert('Unknown row id.');
	}
}
