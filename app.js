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
	pg.connect(connect, function(err, client, done){
		if(err){
			return console.log('error fetching client from pool', err);
		}
		client.query('SELECT * FROM recipes',function(err, result){
		
		if(err){
			return console.log('error running query', err);
		}
		res.render('index', {recipes: result.rows});
		done();
	});
	});
});

//Adding recipes
app.post('/add', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err){
			return console.log('error fetching client from pool', err);
		}
		client.query("INSERT INTO recipes(name, ingredients, directions) VALUES ($1, $2, $3)",
			[req.body.name, req.body.ingredients, req.body.directions]);
		done();
		res.redirect('/');
		
	});
});

app.delete('/delete/:id', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err){
			return console.log('error fetching client from pool', err);
		}
		client.query("DELETE FROM recipes WHERE id = $1",
			[req.params.id]);
		done();
		res.send(200);
		
	});
})

//Server 
app.listen(3000, function(){
	console.log('server started at port 3000');
});