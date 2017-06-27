module.exports = function(app) {
	let OAuth = require('oauth').OAuth, oauth = new OAuth(
			"https://api.twitter.com/oauth/request_token",
			"https://api.twitter.com/oauth/access_token",
			"4JPhVqb8l96ViuOlQaDKQK85h",
			"E7chGojc5ZwNfAEHeI5BQDtk5xCKHL7N7GAl4QBM6Anfa6mIYR",
			"1.0",
			"http://127.0.0.1:4300/auth/twitter/callback",
			"HMAC-SHA1"
			);

	/* Route pour la page de login */
	app.get('/bigtweets', isLoggedIn, function(req, res) {
		res.render('bigtweets.ejs', {
		});
	});

	/* Route pour la déconnexion */
	app.get('/', function(req, res) {
		req.logout();
		return res.redirect('/');
	});

	/* Route pour l'authentification Twitter */
	app.get('/auth/twitter', function(req, res) {
		oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
			if (error) {
				console.log(error);
				res.send("Authentication Failed!");
			}
			else {
				req.session.oauth = {
						screen_name: results.screen_name,
						token: oauth_token,
						token_secret: oauth_token_secret
				};
				console.log(req.session.oauth);
				res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
			}
		});
	});
	app.get('/auth/twitter/callback', function(req, res, next) {
		if (req.session.oauth) {
			req.session.oauth.verifier = req.query.oauth_verifier;
			let oauth_data = req.session.oauth;
			oauth.getOAuthAccessToken(
					oauth_data.token,
					oauth_data.token_secret,
					oauth_data.verifier,
					function(error, oauth_access_token, oauth_access_token_secret, results) {
						if (error) {
							console.log(error);
							res.send("Authentication Failure!");
						}
						else {
							req.session.oauth.access_token = oauth_access_token;
							req.session.oauth.access_token_secret = oauth_access_token_secret;
							req.session.oauth.screen_name= results.screen_name;

							console.log(results, req.session.oauth);
							res.render('../views/bigtweets');
						}
					}
					);
		}
		else {
			res.render('/'); 
		}
	});

	/* Route middleware pour verifier si l'user est bien connecté */
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		return res.redirect('/');
	}

}
