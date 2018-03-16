const Path = require('path');
const HTTP = require('http');
// Allow use of environment variables
require('dotenv').config();
// Initialize necessary objects for bot use
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'));
// Initialize clients
const DiscordClient = new (require(Path.join(__dirname, 'objects', 'discord', 'discord.js')))(CommandList);

var server = HTTP.createServer(function(req, res) {
  res.writeHead(301, {Location: 'https://ovrseer.herokuapp.com'});
  res.end();
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log('Bot running on port ' + PORT);
});
