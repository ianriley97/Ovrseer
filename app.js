const Path = require('path');
// Allow use of environment variables
require('dotenv').config();
// Initialize server to allow Heroku connections and requests
const HTTP = require('http');
var server = HTTP.createServer(function(req, res) {
  res.writeHead(301, {Location: 'https://ovrseer.herokuapp.com'});
  res.end();
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log('Bot running on port ' + PORT);
});
// Initialize necessary objects for clients
const DBManager = new (require(Path.join(__dirname, 'database.js')))(process.env.DATABASE_URL);
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'), '>');
// Initialize clients
const DiscordClient = new (require(Path.join(__dirname, 'objects', 'discord', 'discord.js')))(DBManager, CommandList, 234921929188966401);
