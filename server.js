const HTTP = require('http');

var server = HTTP.createServer(function(req, res) {
  res.writeHead(301, {Location: 'https://ovrseer.herokuapp.com'});
  res.end();
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log('Bot running on port ' + PORT);
});
