"use strict";

function refreshAccountModalCombos() {
	refreshComboByFetchAndSelector('?getAllResolutions', '.account-resolution-dropdown', "");
	refreshComboByFetchAndSelector('?getAllServersNames', '.account-servers-dropdown', "");
}
// Save edited row
$("#edit-account-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?editAccount=' + $('#edit-account-id').val(), $(this).serialize(), function(data) {
		var tr = $('a[data-id="row-' + $('#edit-account-id').val() + '"]').parent().parent();
		//var tr = $('a[href="javascript:editAccountRow(' + $('#edit-account-id').val() + ');"]').parent().parent();
		$('td:eq(2)', tr).html(data.name);
		$('td:eq(3)', tr).html(data.password.replace(/./g, '*'));
		$('td:eq(4)', tr).html(data.server);
		$('td:eq(5)', tr).html(data.resolution);
		$('td:eq(6)', tr).html(data.windowed + '');
		$('#edit-account-modal').modal('hide');
	}).fail(function() {
		alert('Unable to save data, please try again later.');
	});
});
// Add new row
$("#add-account-form").on("submit", function(event) {
	event.preventDefault();
	$.post(localhost + '?addAccount', $(this).serialize(), (data) => {
		let tbody = $('#accountsDT').children('tbody');
		let table = tbody.length ? tbody : $('#accountsDT');
		table.append('<tr role="row"><td class="sorting_1">' + data._id + ''
		+ "</td><td><a href=javascript:playAccountRow(\'" + data._id + "\'); class='btnX btn-primary btn-sm sr-button'>play<\/a></td><td>" + ''
		+ data.name + '</td><td>' + data.password.replace(/./g, '*') + '</td>'
		+ '<td>' + data.server + '</td>' + '<td>' + data.resolution + '</td>' + '<td>' + data.windowed + '</td>'
		+ '<td><a data-id="row-'
		+ data._id + '" href="javascript:editAccountRow(\'' + data._id + '\');" class="btnX btn-md btn-successX">edit</a>&nbsp;<a href="javascript:removeAccountRow(\''
		+ data._id + '\');" class="btnX btn-default btn-md btnX-delete" >X</a></td></tr>');
		$('#accountsDT tbody tr').remove(":contains('No data available in table')");
		$('#add-account-modal').modal('hide');
	}).fail(() => {
		alert('Unable to Add new account');
	});
});
// Edit row
function editAccountRow(id) {
	if (undefined != typeof id) {
		$.getJSON(localhost + '?editAccount=' + id, (obj) => {
			$('#edit-account-id').val(obj._id);
			$('#account-name').val(obj.name);
			$('#account-password').val(obj.password);
			refreshComboByFetchAndSelector('?getAllServersNames', '.account-servers-dropdown', obj.server);
			refreshComboByFetchAndSelector('?getAllResolutions', '.account-resolution-dropdown', obj.resolution);
			$("#edit-account-windowed").prop("checked", obj.windowed);
			$("#edit-account-title").val(obj.title);
			$('#edit-account-modal').modal('show')
		}).fail(() => {
			alert('unable to edit account.')
		});
	} else {
		alert('Unknown account id.');
	}
}
// Remove row
function removeAccountRow(id) {
	if (undefined != typeof id) {
		$.get(localhost + '?removeAccount=' + id, () => {
			$('a[data-id="row-' + id + '"]').parent().parent().remove();
		}).fail(() => {
			alert('unable to remove row.')
		});
	} else {
		alert('Unknown row id.');
	}
}

function playAccountRow(id) {
	if (undefined != typeof id) {
		fetch(localhost + '?playAccount=' + id)
		.then(response => {
			//return response.json();
		})
		.then(() => {
		});
	}
}
