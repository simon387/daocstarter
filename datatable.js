

/*const electron = require('electron');
const app = electron.app;

var request = require('request');
var myRequest;

module.exports = myRequest = function(url, callback) {
  request('/', function(err, res, body) {
	  console.log("miao");
    // do your stuff here
    // finally call the callback
    callback(err, res, body);
  });
};
*/
/*
app.get('/', function (req, res) {
	console.log("gettatko");
	res.send({"aaData":[["2","simone","simon387@hotmail.it","3403909232",null,"<a data-id=\"row-2\" href=\"javascript:editRow(2);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(2);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["3","simone","simon387@hotmail.it","3403909232",null,"<a data-id=\"row-3\" href=\"javascript:editRow(3);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(3);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["5","simone","simon387@hotmail.it","3403909232",null,"<a data-id=\"row-5\" href=\"javascript:editRow(5);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(5);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]})

})

app.post('/', function (req, res) {
	console.log("postss");
	res.send({"aaData":[["2","simone","simon387@hotmail.it","3403909232",null,"<a data-id=\"row-2\" href=\"javascript:editRow(2);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(2);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["3","simone","simon387@hotmail.it","3403909232",null,"<a data-id=\"row-3\" href=\"javascript:editRow(3);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(3);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"],["5","simone","simon387@hotmail.it","3403909232",null,"<a data-id=\"row-5\" href=\"javascript:editRow(5);\" class=\"btn btn-md btn-success\">edit<\/a>&nbsp;<a href=\"javascript:removeRow(5);\" class=\"btn btn-default btn-md\" style=\"background-color: #c83a2a;border-color: #b33426; color: #ffffff;\">remove<\/a>"]]})

})

app.all('/', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
/*
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
/*
app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log(req.body.user.name)
});*/