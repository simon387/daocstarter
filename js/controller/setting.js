require('datatables.net')().$('#settingsDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxSetting'
});
// Save edited row
$("#edit-setting-form-file").on("submit", function(event) {
	event.preventDefault();

	console.log("this del setting?");
	console.log(this);
	//console.log(localhost + '?editSetting=' + $('#edit-setting-id-file').val());

	console.log("asd " + $('#edit-setting-id-file').val());
	$.post(localhost + '?editSetting=' + $('#edit-setting-id-file').val(), $(this).serialize(), function(data) {
		//!!bug!!!! sicuro edita la prima row di una qualsiasi dt
		//correggilo anche negrli altri 2 controller!!
		//correggilo anche negrli altri 2 controller!!
		//correggilo anche negrli altri 2 controller!!
		//correggilo anche negrli altri 2 controller!!
		//var tr = $('a[data-id="row-' + $('#edit-setting-id-file').val() + '"]').parent().parent();

		var tr = $('a[href="javascript:editSettingRowFile(' + $('#edit-setting-id-file').val() + ');"]').parent().parent();
		/*console.log("tr");
		console.log(tr);
		console.log("data");
		console.log(data);*/
		//i = $('#edit-setting-id-file').val();
		//i++;
		//console.log("data._id=" + data._id)
		console.log("data.value=" + data.value)
		//$('td:eq(0)', tr).html(i);
		//$('#edit-setting-id-file').val(i);

		//aggiornare ad i gli altri riferimenti


		//$('td:eq(1)', tr).html(data.key);
		$('td:eq(2)', tr).html(data.value);

		//TODO : manca aggiornare solo quei due
		//tr.children().last().children().attr("data-id", "row-" + i);
		//tr.children().last().children().attr("href", "javascript:editSettingRowFile(" + i + ");");


		//$($('a[href="javascript:editSettingRowFile(' + $('#edit-setting-id-file').val() + ');"]')).attr("href", "javascript:editSettingRowFile(" + i + ")" );

		$('#edit-setting-modal-file').modal('hide');
	}).fail(function() {
		console.log("Unable to save data, please try again later.");
		//alert('Unable to save data, please try again later.');
	});
});
// Edit row file
function editSettingRowFile(id) {
	if ('undefined' != typeof id) {
		$.getJSON(localhost + '?editSetting=' + id, function(obj) {
			// !!!!!!!  rimuovi00
			//
			$('#edit-setting-id-file').val(obj._id);
			$('#setting-value-file').val(obj.value);
			//
			$('#edit-setting-modal-file').modal('show')
		}).fail(function() {
			alert('Unable to edit setting.')
		});
	} else {
		alert('Unknown setting id.');
	}
}
