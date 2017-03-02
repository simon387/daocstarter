require('datatables.net')().$('#settingsDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxSetting'
});
// Save edited row
$("#edit-setting-form-file").on("submit", function(event) {
	event.preventDefault();

	console.log("ben?");
	console.log(localhost + '?editSetting=' + $('#edit-setting-id-file').val());
	$.post(localhost + '?editSetting=' + $('#edit-setting-id-file').val(), $(this).serialize(), function(data) {
		var tr = $('a[data-id="row-' + $('#edit-setting-id-file').val() + '"]').parent().parent();
		console.log("tr");
		console.log(tr);
		console.log("data");
		console.log(data);
		$('td:eq(1)', tr).html(data.key);
		$('td:eq(2)', tr).html(data.value);
		$('#edit-setting-modal-file').modal('hide');
	}).fail(function() {
		alert('Unable to save data, please try again later.');
	});
});
// Edit row file
function editSettingRowFile(id) {
	if ('undefined' != typeof id) {
		//console.log(id);
		$.getJSON(localhost + '?editSetting=' + id, function(obj) {
			console.log(obj);
			$('#edit-setting-id-file').val(obj._id);
			//$('#setting-value-file').val(obj.value);
			$('#edit-setting-modal-file').modal('show')
		}).fail(function() {
			alert('Unable to edit setting.')
		});
	} else {
		alert('Unknown setting id.');
	}
}
