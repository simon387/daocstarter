//var router = require('electron-request-response/render');
 
// register a route 
 /*

var kek = '{"aaData":[["8","asdasd","asd@asdasd.com","keasd",null,"<a data-id=\"row-8\" href=\"javascript:editRow(8);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(8);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["7","1","1@1.1","1",null,"<a data-id=\"row-7\" href=\"javascript:editRow(7);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(7);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["3","simone","564564n387@hotmail.it","34",null,"<a data-id=\"row-3\" href=\"javascript:editRow(3);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(3);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["6","marco","darinasd@pollo.com","asd",null,"<a data-id=\"row-6\" href=\"javascript:editRow(6);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(6);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["5","simone","45687@hotmail.it","345",null,"<a data-id=\"row-5\" href=\"javascript:editRow(5);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(5);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["9","A","A@a.a","a",null,"<a data-id=\"row-9\" href=\"javascript:editRow(9);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(9);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["10","asd","asdasd@asd.e","asd",null,"<a data-id=\"row-10\" href=\"javascript:editRow(10);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(10);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["11","simone","simon387@asd.it","asdsda",null,"<a data-id=\"row-11\" href=\"javascript:editRow(11);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(11);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["12","a","a@a.a","a",null,"<a data-id=\"row-12\" href=\"javascript:editRow(12);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(12);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["13","a","a@a.a","a",null,"<a data-id=\"row-13\" href=\"javascript:editRow(13);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(13);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["14","a","a@a.a","a",null,"<a data-id=\"row-14\" href=\"javascript:editRow(14);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(14);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["15","a","a@a.a","a",null,"<a data-id=\"row-15\" href=\"javascript:editRow(15);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(15);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["16","a","a@a.a","a",null,"<a data-id=\"row-16\" href=\"javascript:editRow(16);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(16);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]}';
router.registerRoute('/ajax.js', function (data, callback) {
	console.log(kek); // will log "Hey did you get this? 
	var shouldError = (new Date()).getDay() === 3; // we don't work on hump day 
	if (shouldError) {
		return callback('Go away, it\'s hump day', null); // we could also use an object as the error here... 
	}
	return callback(null, kek);
});*/

const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})