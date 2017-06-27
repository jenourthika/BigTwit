module.exports = function(app, passport) {
let OAuth = require('oauth').OAuth
  , oauth = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      "GGVT8EFvZP2ug5nCWPk3U3dSD",
      "IhU5ojVzf3un8WVCVPSGGDaY5PywqE2yigvCwufqi3arNbnWdW",
      "1.0",
      "http://127.0.0.1:3000/auth/twitter/callback",
      "HMAC-SHA1"
    );
	// route for home page
	app.get('/', function(req, res) {
		res.render('Accueil.ejs'); // load the index.ejs file
	});


	// route for login form
  app.get('/login', isLoggedIn, function(req, res) {
		res.render('login.ejs', {
			//user : req.user // get the user out of session and pass to template
		});
	});
	// route for processing the login form
	// route for signup form
	// route for processing the signup form

	// route for showing the profile page
	app.get('/pro', isLoggedIn, function(req, res) {
		res.render('pro.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// route for logging out
	app.get('/logout', function(req, res) {
		req.logout();
		return res.redirect('/');
	});


	// route for twitter authentication and login


app.get('/auth/twitter', function(req, res) {
 
  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    if (error) {
      console.log(error);
      res.send("Authentication Failed!");
    }
    else {
      req.session.oauth = {
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
    var oauth_data = req.session.oauth;
 
    oauth.getOAuthAccessToken(
      oauth_data.token,
      oauth_data.token_secret,
      oauth_data.verifier,
      function Display(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.log(error);
          res.send("Authentication Failure!");
        }
        else {
          req.session.oauth.access_token = oauth_access_token;
          req.session.oauth.access_token_secret = oauth_access_token_secret;

          console.log(results.screen_name);
          var user_name = results.screen_name;
      
          /*s = "<body>"+user_name+"</body>";
           var l= elem.innerHTML;
           l = s;*/
          //console.log(req.session.oauth.screen_name);
          
         res.render('../views/pro');
         //res.redirect('/profile'); // You might actually want to redirect!
        }
      }
    );
  }
  else {
    res.render('/login'); // Redirect to login page
  }
 
});
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	return res.redirect('/');

}

/*function DisplayUserName(req, res) {
 
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth_data = req.session.oauth;
 
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
          console.log(results.screen_name);
          var user_name = results.screen_name;
          s = "<body>"+user_name+"</body>";
          elem.innerHTML = s;
          
          //console.log(req.session.oauth.screen_name);
          
         res.render('../views/pro');
         //res.redirect('/profile'); // You might actually want to redirect!
        }
      }
    );
  }
  else {
    res.render('/login'); // Redirect to login page
  }
 
};
*/
}

