const HTTP = require('http');

var settings;
var dbManager;
var discordClient;

class Server {
  constructor(port, s, dbm, dc) {
    settings = s;
    dbManager = dbm;
    discordClient = dc;
    discordClient.token = null;
    ReqObjs.set('client', discordClient);
    this.server = HTTP.createServer(handleRequest);
    this.server.listen(port, function() {
      console.log('App running on port ' + port);
    });
  }
}

module.exports = Server;

function handleRequest(req, res) {
  if(req.url.startsWith('/request')) serve(req, res);
  else {
    res.writeHead(301, {Location: settings.webpage});
    res.end();
  }
}

const ReqObjs = new Map();

function serve(req, res) {
  var url = req.url.split('/').slice(2);
  res.writeHead(200, {"Content-Type": "application/json"});
  var obj = ReqObjs.get(url[0]);
  res.end(dbManager.convertFromObj(obj));
}
