require('dotenv').config();
// Node Modules
const HTTP = require('http');
const FileSystem = require('fs');
const Path = require('path');

const PORT = process.env.PORT || 4040;

const PageRouter = require(Path.join(__dirname, 'controllers', 'page-router.js'));

function serveError(res, err, resCode, resMsg) {
  console.error(err);
  res.statusCode = resCode;
  res.end(resMsg);
}

function handleRequest(req, res) {
  if(req.method == 'GET') PageRouter.render(req.url, function (err, data) {
    if(err) serveError(res, err, 500, 'Server Error');
    else res.end(data);
  });
}

var server = HTTP.createServer(handleRequest);
server.listen(PORT, function() {
  console.log("Server listening on port " + PORT);
});
