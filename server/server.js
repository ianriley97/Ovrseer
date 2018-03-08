const HTTP = require('http');
const FileSystem = require('fs');
const Path = require('path');

const PORT = process.env.PORT || 3000;

function serveError(res, err, resCode, resMsg) {
  console.error(err);
  res.statusCode = resCode;
  res.end(resMsg);
}

function handleRequest(req, res) {
  res.end('Hello from Ovrseer!');
}

var server = HTTP.createServer(handleRequest);
server.listen(PORT, function() {
  Log('server', "Server listening on port " + PORT);
});
