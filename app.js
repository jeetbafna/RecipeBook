var express = require ('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

//DB connect
var connect = "postgres://eduonix:123456@localhost/recipebookdb";

//Assign dust engine to .dust files
app.engine('dust', cons.dust);

//Set default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
	res.render('index');
});

//Server 
app.listen(3000, function(){
	console.log('server started at port 3000');
});