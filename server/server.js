const http = require('http');
const Express = require('express');
const App = Express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 4040;

// set the view engine to ejs
App.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
App.use(Express.static(__dirname + '/public'));

// set the home page route
App.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

App.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});


function startKeepAlive() {
  setInterval(function() {
    var options = {
      host: 'ovrseer.herokuapp.com',
      port: 80,
      path: '/'
    };
    http.get(options, function(res) {
      res.on('data', function(chunk) {
        try {
          // optional logging...disable after its working
        //   console.log('HEROKU RESPONSE: ' + chunk);
        }
        catch (err) {
          console.log(err.message);
        }
      });
    }).on('error', function(err) {
      console.log('Error: ' + err.message);
    });
  }, (20 * 60 * 1000)); // load every 20 minutes
}
startKeepAlive();
