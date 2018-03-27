// require node modules
const HTTP = require('http');
const Path = require('path');
require('dotenv').config();

var viewManager;
var dataManager;
var requestRouter;

const DBManager = new (require(Path.join(__dirname, 'model', 'database.js')))(process.env.DATABASE_URL, function(err, dbManager) {
  viewManager = new (require(Path.join(__dirname, 'controller', 'view-manager.js')))();
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
  if(req.method == 'GET') requestRouter.get(req, res);
  else if(req.method == 'POST') requestRouter.post(req, res);
}
