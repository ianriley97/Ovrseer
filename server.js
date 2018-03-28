const HTTP = require('http');

var settings;

class Server {
  constructor(port, s) {
    settings = s;
    this.server = HTTP.createServer(handleRequest);
    this.server.listen(port, function() {
      console.log('App running on port ' + port);
    });
  }
}

module.exports = Server;

function handleRequest(req, res) {
  res.writeHead(301, {Location: settings.webpage});
  res.end();
}
