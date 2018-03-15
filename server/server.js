// Node Modules
const HTTP = require('http');
const FileSystem = require('fs');
const Path = require('path');
// Controllers
const PageRenderer = require(Path.join(__dirname, 'controllers', 'page-renderer.js'));

const PORT = process.env.PORT || 3000;

function serveError(res, err, resCode, resMsg) {
  console.error(err);
  res.statusCode = resCode;
  res.end(resMsg);
}

function handleRequest(req, res) {
  PageRenderer.render('home', function(err, data) {
    if(err) serveError(res, err, 500, 'Server Error');
    else res.end(data);
  });
}

var server = HTTP.createServer(handleRequest);
server.listen(PORT, function() {
  Log('server', "Server listening on port " + PORT);
});
