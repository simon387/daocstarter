require('datatables.net')().$('#charactersDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxCharacter'
});

function addNewCharacterClicked() {
	$.get(localhost + '?getAllAccountsNames', function(array) {
		$('#add-character-accounts').empty();
		for (let i = 0; i < array.length; i++) {
			$('#add-character-accounts').append($("<option>" + array[i] + "</option>"));
		}
	}).fail(function() {
		alert('fail on addNewCharacterClicked()');
	});
	$('#add-character-servers').empty();
	$.get(localhost + '?getAllServersNames', function(array){
		for (let i = 0; i < array.length; i++) {
			$('#add-character-servers').append($("<option>" + array[i] + "</option>"));
		}
	});
	$('#add-character-classes').empty();
	$.get(localhost + '?getAllClassesNames', function(array){
		for (let i = 0; i < array.length; i++) {
			$('#add-character-classes').append($("<option>" + array[i] + "</option>"));
		}
	});
	$('#add-character-resolution').empty();
	$.get(localhost + '?getAllResolutions', function(array){
		for (let i = 0; i < array.length; i++) {
			$('#add-character-resolution').append($("<option>" + array[i] + "</option>"));
		}
	});
}

$("#add-character-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?addCharacter', $(this).serialize(), function(data) {
		let tbody = $('#charactersDT').children('tbody');
		let table = tbody.length ? tbody : $('#charactersDT');
		table.append('<tr role="row"><td class="sorting_1">' + data[0]._id +
		'</td><td>' + data[0].name + '</td><td>' + data[0].lastlogin + '</td><td>' + data[0].account + '</td><td>' + data[0].server +
		'</td><td>' + data[0].class + '</td><td>' + data[0].resolution + '</td><td>' + data[0].windowed +
		'</td><td><a data-id="row-' + data[0]._id + '" href="javascript:editCharacterRow(' + data[0]._id +
		');" class="btnX btn-md btn-successX">edit</a>&nbsp;<a href="javascript:removeCharacterRow('
		+ data[0]._id + ');" class="btnX btn-default btn-md btnX-delete">remove</a></td></tr>');
		$('#charactersDT tbody tr').remove(":contains('No data available in table')");
		$('#add-character-modal').modal('hide');
	}).fail(function() {
		alert('Unable to Add new character');
	});
});

