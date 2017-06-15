
/* Affiche la liste des bigtweets */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM bigtweet',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('bigtweets',{page_title:"Bigtweets",data:rows});
         });
         //console.log(query.sql);
    });
};


/* Ajouter un bigtweet */
exports.add = function(req, res){
  res.render('add_bigtweet',{page_title:"Ajouter un bigtweet"});
};

/* Modifie un bigtweet */
exports.edit = function(req, res){
    var ID = req.params.ID;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM bigtweet WHERE ID = ?',[ID],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_bigtweet',{page_title:"Modifier un bigtweet",data:rows});
         });
         //console.log(query.sql);
    }); 
};

/* Enregistre un bigtweet */
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            Message   	: input.Message,
        };
        var query = connection.query("INSERT INTO bigtweet set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/bigtweets');
        });
       // console.log(query.sql); get raw query
    });
    /* Envoie les 130 premiers caractères du bigtweet et un lien */
    var Twit = require('twit');
    var config = require('./config');
    var T = new Twit(config);
    var MessageCourt= input.Message.substring(1,5);
    //var MessageLong= <a href='http://www.google.fr'>cliquez ici</a>;
    var tweet={
    status: MessageCourt
    }
    T.post('statuses/update', tweet);
};

/* Modifie le bigtweet dans la base de données */
exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var ID = req.params.ID;
    req.getConnection(function (err, connection) {
        var data = { 
            Message   	: input.Message,
        };
        connection.query("UPDATE bigtweet set ? WHERE ID = ? ",[data,ID], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/bigtweets');
        });
    });
};

/* Supprime un bigtweet */
exports.delete_bigtweet = function(req,res){      
     var ID = req.params.ID;
     req.getConnection(function (err, connection) { 
        connection.query("DELETE FROM bigtweet  WHERE ID = ? ",[ID], function(err, rows)
        { 
             if(err)
                 console.log("Error deleting : %s ",err );
             res.redirect('/bigtweets');
        });
     });
};


