
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load bigtweets route
var bigtweets = require('./routes/bigtweets'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// connexion à la base de données
app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 8889, //port mysql
        database:'Bigtwit'

    },'pool') //or single

);



app.get('/', routes.index);
app.post('/bigtweets', bigtweets.list);
app.get('/bigtweets', bigtweets.list);
app.get('/bigtweets/add', bigtweets.add);
app.post('/bigtweets/add', bigtweets.save);
app.get('/bigtweets/delete/:ID', bigtweets.delete_bigtweet);
app.get('/bigtweets/edit/:ID', bigtweets.edit);
app.post('/bigtweets/edit/:ID',bigtweets.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
