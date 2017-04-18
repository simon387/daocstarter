'use strict';

function refreshAccountModalCombos() {
	refreshComboByFetchAndSelector('?getAllResolutions', '.account-resolution-dropdown', '');
	refreshComboByFetchAndSelector('?getAllServersNames', '.account-servers-dropdown', '');
}
// Save edited row
$('#edit-account-form').on('submit', function(event) {
	event.preventDefault();
	$.post(localhost + '?editAccount=' + $('#edit-account-id').val(), $(this).serialize(), function(data) {
		accountDataTable.ajax.reload();
		$('#edit-account-modal').modal('hide');
	}).fail(() => {
		alert('Unable to save data, please try again later.');
	});
});
// Add new row
$('#add-account-form').on('submit', function(event) {
	event.preventDefault();
	$.post(localhost + '?addAccount', $(this).serialize(), account => {
		accountDataTable.ajax.reload();
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
			$("#edit-account-windowed").prop('checked', obj.windowed);
			$("#edit-account-title").val(obj.title);
			$('#edit-account-modal').modal('show');
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
			accountDataTable.ajax.reload();
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
		.then(response => {})
		.then(() => {});
	}
}

function killAccountRow(id) {
	if (undefined != typeof id) {
		fetch(localhost + '?killAccount=' + id)
		.then(response => {})
		.then(() => {});
	}
}