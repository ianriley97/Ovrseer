const HTTP = require('http');

class Server {
  constructor(port, settings) {
    this.settings = settings;
    this.server = HTTP.createServer(this.handRequest);
    this.server.listen(port, function() {
      console.log('App running on port ' + port);
    });
  }
  handRequest(req, res) {
    res.writeHead(301, {Location: this.settings.webpage});
    res.end();
  }
}

module.exports = Server;
