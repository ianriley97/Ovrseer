// Node Modules
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
  res.end('Ovrseer says "Hello World!"');
}

var server = HTTP.createServer(handleRequest);
server.listen(PORT, function() {
  console.log("Server listening on port " + PORT);
});
