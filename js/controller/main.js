window.jQuery = window.$ = require('jquery'); 
let localhost = "http://localhost:3000";

var dt = require( 'datatables.net' )();
dt.$('#accountsDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajax'
});

// Save edited row
$("#edit-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?edit=' + $('#edit-id').val(), $(this).serialize(), function(data) {
		var obj = $.parseJSON(data);
		var tr = $('a[data-id="row-' + $('#edit-id').val() + '"]').parent().parent();
		$('td:eq(1)', tr).html(obj.name);
		$('td:eq(2)', tr).html(obj.email);
		$('#edit-modal').modal('hide');
	}).fail(function() { alert('Unable to save data, please try again later.'); });
});
// Add new row
$("#add-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?add', $(this).serialize(), function(data) {
		$('#accountsDT tbody tr:last').after('<tr role="row"><td class="sorting_1">' + data[0]._id + '</td><td>' +data[0].name + '</td><td>' + data[0].password + '</td><td><a data-id="row-' + data[0]._id + '" href="javascript:editRow(' + data[0]._id + ');" class="btn btn-default btn-sm">edit</a>&nbsp;<a href="javascript:removeRow(' + data[0]._id + ');" class="btn btn-default btn-sm">remove</a></td></tr>');
		$('#add-modal').modal('hide');
	}).fail(function() { alert('Unable to Add new row'); });
});
// Edit row
function editRow(id) {
	if ( 'undefined' != typeof id ) {
		$.getJSON(localhost + '?edit=' + id, function(obj) {
			$('#edit-id').val(obj.id);
			$('#account-name').val(obj.name);
			$('#account-password').val(obj.password);
			$('#edit-modal').modal('show')
		}).fail(function() { alert('unable to edit account.') });
	} else alert('Unknown account id.');
}
// Remove row
function removeRow(id) {
	if ( 'undefined' != typeof id ) {
		$.get(localhost + '?remove=' + id, function() {
			$('a[data-id="row-' + id + '"]').parent().parent().remove();
		}).fail(function() { alert('unable to remove row.') });
	} else alert('Unknown row id.');
}
