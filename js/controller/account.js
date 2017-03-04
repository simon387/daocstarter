require('datatables.net')().$('#accountsDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxAccount',
	columnDefs: [
		{
			
		}
	]
});
// Save edited row
$("#edit-account-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editAccount=' + $('#edit-account-id').val(), $(this).serialize(), function(data) {
		var tr = $('a[data-id="row-' + $('#edit-account-id').val() + '"]').parent().parent();
		$('td:eq(1)', tr).html(data.name);
		$('td:eq(2)', tr).html(data.password);
		$('#edit-account-modal').modal('hide');
	}).fail(function() {
		alert('Unable to save data, please try again later.');
	});
});
// Add new row
$("#add-account-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?addAccount', $(this).serialize(), function(data) {
		let tbody = $('#accountsDT').children('tbody');
		let table = tbody.length ? tbody : $('#accountsDT');
		table.append('<tr role="row"><td class="sorting_1">' + data._id +
		'</td><td>' + data.name + '</td><td>' + data.password + '</td><td><a data-id="row-' +
		data._id + '" href="javascript:editAccountRow(\'' + data._id +
		'\');" class="btnX btn-md btn-successX">edit</a>&nbsp;<a href="javascript:removeAccountRow(\'' + data._id + '\');" class="btnX btn-default btn-md btnX-delete" >remove</a></td></tr>');
		$('#accountsDT tbody tr').remove(":contains('No data available in table')");
		$('#add-account-modal').modal('hide');
	}).fail(function() {
		alert('Unable to Add new account');
	});
});
// Edit row
function editAccountRow(id) {
	if ('undefined' != typeof id) {
		$.getJSON(localhost + '?editAccount=' + id, function(obj) {
			$('#edit-account-id').val(obj._id);
			$('#account-name').val(obj.name);
			$('#account-password').val(obj.password);
			$('#edit-account-modal').modal('show')
		}).fail(function() {
			alert('unable to edit account.')
		});
	} else {
		alert('Unknown account id.');
	}
}
// Remove row
function removeAccountRow(id) {
	if ('undefined' != typeof id) {
		$.get(localhost + '?removeAccount=' + id, function() {
			$('a[data-id="row-' + id + '"]').parent().parent().remove();
		}).fail(function() {
			alert('unable to remove row.')
		});
	} else {
		alert('Unknown row id.');
	}
}
