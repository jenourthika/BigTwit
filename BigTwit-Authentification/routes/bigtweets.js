/* Affiche la première page */
exports.index = function(req, res){
  res.render('index', { title: 'BigTwit' });
};


/* Afficher la liste des bigtweets */
exports.list = function(req, res){
	req.getConnection(function(err,connection){
		let query = connection.query('SELECT * FROM bigtweet',function(err,rows)
				{
			if(err)
				console.log("Error Selecting : %s ",err );
			res.render('bigtweets',{page_title:"Bigtweets",data:rows});
				});
	});
};

/* Ajouter un bigtweet */
exports.add = function(req, res){
	res.render('add_bigtweet',{page_title:"Ajouter un bigtweet"});
};

/* Modifier un bigtweet */
exports.edit = function(req, res){
	let ID = req.params.ID;
	req.getConnection(function(err,connection){
		let query = connection.query('SELECT * FROM bigtweet WHERE ID = ?',[ID],function(err,rows)
				{
			if(err)
				console.log("Error Selecting : %s ",err );
			res.render('edit_bigtweet',{page_title:"Modifier un bigtweet",data:rows});
				});
	}); 
};

/* Affiche un bigtweet */
exports.see = function(req, res){
	let ID = req.params.ID;
	req.getConnection(function(err,connection){
		let query = connection.query('SELECT * FROM bigtweet WHERE ID = ?',[ID],function(err,rows)
				{
			if(err)
				console.log("Error Selecting : %s ",err );
			res.render('bigtwit',{page_title:"Modifier un bigtweet",data:rows});
				});
	}); 
};

/* Enregistre un bigtweet */
exports.save = function(req,res){
	let input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function (err, connection) {
		let data = {
				ID          : ChaineAleatoire(6),
				Message   	: input.Message,
				Pseudo      : req.session.oauth.screen_name,
		};
		let query = connection.query("INSERT INTO bigtweet set ? ",data, function(err, rows)
				{
			if (err)
				console.log("Error inserting : %s ",err );
			res.redirect('/bigtweets');
				});

		/* Envoie les 116 premiers caractères du bigtweet et un lien*/
		let twit = require('twit');
		let config={
				consumer_key        :'4JPhVqb8l96ViuOlQaDKQK85h',
				consumer_secret     :'E7chGojc5ZwNfAEHeI5BQDtk5xCKHL7N7GAl4QBM6Anfa6mIYR',
				access_token        :req.session.oauth.access_token,
				access_token_secret :req.session.oauth.access_token_secret,
		}
		let twitter = new twit(config);
		let smallTwit= input.Message.substring(0,116)
		let longerTwit="bt.com:4300/"+data.ID;
		let bigTwit= smallTwit+"\n"+longerTwit;
		let tweet={
				status: bigTwit
		}
		twitter.post('statuses/update', tweet);
	});

};

/* Modifie le bigtweet dans la base de données */
exports.save_edit = function(req,res){
	let input = JSON.parse(JSON.stringify(req.body));
	let ID = req.params.ID;
	req.getConnection(function (err, connection) {
		let data = { 
				Message   	: input.Message,
				Pseudo      : req.session.oauth.screen_name,

		};
		connection.query("UPDATE bigtweet set ? WHERE ID = ? ",[data,ID], function(err, rows)
				{
			if (err)
				console.log("Error Updating : %s ",err );
			res.redirect('/bigtweets');
				});

				console.log(req.session.oauth.screen_name);
		/* Envoie les 116 premiers caractères du bigtweet et un lien*/
		let twit = require('twit');
		let config={
				consumer_key        :'4JPhVqb8l96ViuOlQaDKQK85h',
				consumer_secret     :'E7chGojc5ZwNfAEHeI5BQDtk5xCKHL7N7GAl4QBM6Anfa6mIYR',
				access_token        :req.session.oauth.access_token,
				access_token_secret :req.session.oauth.access_token_secret,
		}
		let twitter = new twit(config);
		let smallTwit= input.Message.substring(0,116)
		let longerTwit="bt.com:4300/"+data.ID;
		let bigTwit= smallTwit+"\n"+longerTwit;
		let tweet={
				status: bigTwit
		}
		twitter.post('statuses/update', tweet);
	});
};

/* Supprime un bigtweet */
exports.delete_bigtweet = function(req,res){      
	let ID = req.params.ID;
	req.getConnection(function (err, connection) { 
		connection.query("DELETE FROM bigtweet  WHERE ID = ? ",[ID], function(err, rows)
				{ 
			if(err)
				console.log("Error deleting : %s ",err );
			res.redirect('/bigtweets');
				});
	});
};

/* Génére un code aléatoire */
let ChaineAleatoire = function ChaineAleatoire(nbcar)
{
	let ListeCar = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9");
	let Chaine ='';
	for(i = 0; i < nbcar; i++)
	{
		Chaine = Chaine + ListeCar[Math.floor(Math.random()*ListeCar.length)];
	}
	return Chaine;
}