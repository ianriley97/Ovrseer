const HTTP = require('http');
const FileSystem = require('fs');
const Path = require('path');

const PORT = process.env.PORT || 3000;

const DefRootDir = 'public';
const DefaultPage = 'index.html';
const SubDomains = require('.' + Path.sep + 'subdomains.json');

function serveError(res, err, resCode, resMsg) {
  console.error(err);
  res.statusCode = resCode;
  res.end(resMsg);
}

function serveIndexPage(res, path, readPath) {
  FileSystem.readdir(readPath, function(err, files) {
    if(err) serveError(res, err, 500, 'Server Error');
    else {
      var html = `<h1>Directory: ${path}</h1>`;
      html += `<a href="${Path.join(path, '..')}">[Parent Directory]</a><br>`;
      files.map(function(item) {
        html += `<br><a href="${Path.join(path, item)}">${item}</a>`;
      });
      res.end(html);
    }
  });
}

function serveDirectory(res, path, readPath) {
  FileSystem.readFile(Path.join(readPath, DefaultPage), function(err, data) {
    if(err) {
      if(err.code == 'ENOENT') serveIndexPage(res, path, readPath);
      else serveError(res, err, 500, 'Server Error');
    }
    else res.end(data);
  });
}

function serveFile(res, path, readPath) {
  FileSystem.readFile(readPath, function(err, data) {
    if(err) serveError(res, err, 500, 'Server Error');
    else res.end(data);
  });
}

function setRequestPath(req) {
  var subdomain = req.headers.host.split('.');
  var path;
  if(subdomain.length > 1) path = SubDomains[subdomain[0]];
  else path = Path.join(DefRootDir, req.url);
  return path;
}

function handleRequest(req, res) {
  var readPath = setRequestPath(req);;
  if(readPath) {
    FileSystem.stat(readPath, function(err, stats) {
      if(err) serveError(res, err, 404, 'File Not Found');
      else if(stats.isDirectory()) serveDirectory(res, req.url, readPath);
      else serveFile(res, req.url, readPath);
    });
  }
  else {
    res.statusCode = 404;
    res.end('Subdomain Not Found');
  }
}

var server = HTTP.createServer(handleRequest);
server.listen(PORT, function() {
  console.log("Listening at port ", PORT);
});
