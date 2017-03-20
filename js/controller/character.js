function refreshModalCombos() {
	$.get(localhost + '?getAllAccountsNames', function(array) {
		$('#add-character-accounts').empty();
		$('#edit-character-accounts').empty();
		for (let i = 0; i < array.length; i++) {
			$('#add-character-accounts').append($("<option>" + array[i] + "</option>"));
			$('#edit-character-accounts').append($("<option>" + array[i] + "</option>"));
		}
	});
	$.get(localhost + '?getAllServersNames', function(array){
		$('#add-character-servers').empty();
		$('#edit-character-servers').empty();
		for (let i = 0; i < array.length; i++) {
			$('#add-character-servers').append($("<option>" + array[i] + "</option>"));
			$('#edit-character-servers').append($("<option>" + array[i] + "</option>"));
		}
	});
	$.get(localhost + '?getAllClassesNames', function(array){
		$('#add-character-classes').empty();
		$('#edit-character-classes').empty();
		for (let i = 0; i < array.length; i++) {
			$('#add-character-classes').append($("<option>" + array[i] + "</option>"));
			$('#edit-character-classes').append($("<option>" + array[i] + "</option>"));
		}
	});
	$.get(localhost + '?getAllResolutions', function(array){
		$('#add-character-resolution').empty();
		//$('#edit-character-resolution').empty();
		for (let i = 0; i < array.length; i++) {
			$('#add-character-resolution').append($("<option>" + array[i] + "</option>"));
			//$('#edit-character-resolution').append($("<option>" + array[i] + "</option>"));
		}
	});
}
// Add new row
$("#add-character-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?addCharacter', $(this).serialize(), function(data) {
		let tbody = $('#charactersDT').children('tbody');
		let table = tbody.length ? tbody : $('#charactersDT');
		table.append('<tr role="row"><td class="sorting_1">' + data._id +
		'</td><td>' +  
			"<a href=javascript:playCharacterRow(\'" + data._id + "\'); class='btnX btn-primary btn-sm sr-button'>play<\/a>"
			+
		'</td><td>' + data.name + '</td><td>' + data.lastlogin + '</td><td>' + data.account + '</td><td>' + data.server +
		'</td><td>' + data.class + '</td><td>' + data.resolution + '</td><td>' + data.windowed +
		'</td><td><a data-id="row-' + data._id + '" href="javascript:editCharacterRow(\'' + data._id +
		'\');" class="btnX btn-md btn-successX">edit</a>&nbsp;<a href="javascript:removeCharacterRow(\''
		+ data._id + '\');" class="btnX btn-default btn-md btnX-delete">delete</a></td></tr>');
		$('#charactersDT tbody tr').remove(":contains('No data available in table')");
		$('#add-character-modal').modal('hide');
	}).fail(function() {
		alert('Unable to Add new character');
	});
});
// Remove row
function removeCharacterRow(id) {
	if ('undefined' != typeof id) {
		$.get(localhost + '?removeCharacter=' + id, function() {
			$('a[data-id="row-' + id + '"]').parent().parent().remove();
		}).fail(function() {
			alert('unable to remove row.')
		});
	} else {
		alert('Unknown row id.');
	}
}
// Edit row
function editCharacterRow(id) {
	refreshModalCombos();
	if ('undefined' != typeof id) {
		$.getJSON(localhost + '?editCharacter=' + id, function(obj) {
			$('#edit-character-id').val(obj._id);
			$('#edit-character-name').val(obj.name);
			$("#edit-character-accounts").val(obj.account);
			$("#edit-character-servers").val(obj.server);
			$("#edit-character-classes").val(obj.class);
			$.get(localhost + '?getAllResolutions', function(array){
				$('#edit-character-resolution').empty();
				for (let i = 0; i < array.length; i++) {
					if (array[i] === obj.resolution) {
						$('#edit-character-resolution').append($("<option selected>" + array[i] + "</option>"));
					}
					$('#edit-character-resolution').append($("<option>" + array[i] + "</option>"));
				}
			});
			$("#edit-character-windowed").prop( "checked", obj.windowed );
			$('#edit-character-modal').modal('show')
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
		$('td:eq(6)', tr).html(data.class);
		$('td:eq(7)', tr).html(data.resolution);
		$('td:eq(8)', tr).html(data.windowed + "");
		$('#edit-character-modal').modal('hide');
	}).fail(function() {
		alert('Unable to save data, please try again later.');
	});
});
//play
function playCharacterRow(id) {
	console.log("click");
	if ('undefined' != typeof id) {
		$.get(localhost + '?playCharacter=' + id, function() {
			//$('a[data-id="row-' + id + '"]').parent().parent().remove();
		}).fail(function() {
			console.log('unable to play row.')
		});
	} else {
		console.log('Unknown row id.');
	}
}