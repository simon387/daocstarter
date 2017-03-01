require('datatables.net')().$('#charactersDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxCharacter'
});

function addNewCharacterClicked() {
	$.get(localhost + '?getAllAccountsNames' , function(obj) {
		$('#add-character-accounts').empty();
		for (let i = 0; i < obj.length; i++) {
			$('#add-character-accounts').append($("<option>" + obj[i] + "</option>"));
		}
	}).fail(function() {
		alert('fail on addNewCharacterClicked()');
	});
	$('#add-character-servers').empty();
	for (let i = 0; i < accountsArray.length; i++) {
		console.log(accountsArray[i]);
		$('#add-character-servers').append($("<option>" + accountsArray[i] + "</option>"));
	}
}

