const HTTP = require('http');

var settings;
var dbManager;
var discordApp;

class Server {
  constructor(port, s, da) {
    settings = s;
    discordApp = da;
    ReqObjs.set('client', discordApp.client);
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
  res.end(convertObjToString(obj));
}

const PrivateInfo = [
  process.env.DISCORD_BOT_TOKEN
];

function convertObjToString(obj) {
  var cache = [];
  var str = JSON.stringify(obj, function(key, value) {
    if (typeof value == 'object' && value) {
      if(cache.indexOf(value) != -1) return;
      cache.push(value);
    }
    return value;
  });
  const filter = new RegExp('\\b(' + PrivateInfo.join('|') + ')\\b', 'gim');
  str = str.replace(filter, '');
  return str;
}
