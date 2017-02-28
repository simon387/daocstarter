require('datatables.net')().$('#charactersDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxCharacter'
});

function addNewCharacterClicked() {
	console.log('kek');

	$.get(localhost + '?getAllAccountsNames' , function(obj) {
		console.log(obj);
	}).fail(function() {
		alert('f a i l')
	});
}