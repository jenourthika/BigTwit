/* Déclaration des modules */
let express     = require('express');
let http        = require('http');
let path        = require('path');
let app         = express();
let connection  = require('express-myconnection'); 
let mysql       = require('mysql');

let bigtweets   = require('./routes/bigtweets'); 

/* Environnements */
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser()); 
app.use(express.cookieSession({ secret: 'BigTwit!', maxAge: 25 })); // session secret

/* Connexion à la base de données */
app.use(connection(mysql,{
	host: 'localhost',
	user: 'root',
	password : '',
	port : 8889,
	database:'Bigtwit'
},'pool')
		);


app.get('/', bigtweets.index);
app.post('/bigtweets', bigtweets.list);
app.get('/bigtweets', bigtweets.list);
app.get('/bigtweets/add', bigtweets.add);
app.post('/bigtweets/add', bigtweets.save);
app.get('/bigtweets/delete/:ID', bigtweets.delete_bigtweet);
app.get('/bigtweets/edit/:ID', bigtweets.edit);
app.post('/bigtweets/edit/:ID',bigtweets.save_edit);
app.get('/:ID', bigtweets.see);
app.post('/:ID',bigtweets.see);


app.use(app.router);
require('./routes/routes.js')(app);

/* Création du serveur */
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
