require('datatables.net')().$('#charactersDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxCharacter'
});
