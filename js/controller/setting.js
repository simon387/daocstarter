require('datatables.net')().$('#settingsDT').DataTable({
	"aProcessing":false,
	"aServerSide":false,
	"ajax":localhost + '?ajaxSetting'
});
