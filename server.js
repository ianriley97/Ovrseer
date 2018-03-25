// require node modules
const HTTP = require('http');
const Path = require('path');
require('dotenv').config();

var viewManager = new (require(Path.join(__dirname, 'controller', 'view-manager.js')))();
var dataManager;
var requestRouter;

const DBManager = new (require(Path.join(__dirname, 'model', 'database.js')))(process.env.DATABASE_URL, function(err, dbManager) {
  dataManager = new (require(Path.join(__dirname, 'controller', 'data-manager.js')))(dbManager);
  requestRouter = new (require(Path.join(__dirname, 'controller', 'request-router.js')))(viewManager, dataManager);
  requestRouter.buildCaches(function() {
    const PORT = process.env.PORT || 3000;
    var server = HTTP.createServer(handleRequest);
    server.listen(PORT, function() {
      console.log("Server listening on port " + PORT);
    });
  });
});

function handleRequest(req, res) {
  if(req.method == 'GET') {
    requestRouter.route(req, function (err, data) {
      if(err) serveError(res, err, 500, 'Server Error');
      else res.end(data);
    });
  }
}

function serveError(res, err, resCode, resMsg) {
  console.error(err);
  res.statusCode = resCode;
  res.end(resMsg);
}
