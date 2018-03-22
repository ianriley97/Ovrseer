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
// Initialize necessary objects
const Settings = require(Path.join(__dirname, 'settings.json'));
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'), Settings.cmd_prefix);
const WordParser = require(Path.join(__dirname, 'objects', 'parse-string', 'word-parser.js'));
const DBManager = new (require(Path.join(__dirname, 'database.js')))(process.env.DATABASE_URL, function(err, dbManager) {
  // Initialize apps/clients
  const DiscordApp = require(Path.join(__dirname, 'objects', 'discord', 'discord.js'));
  if(err) {
    new DiscordApp(Settings, CommandList, new Map(), WordParser);
  }
  else {
    dbManager.initUsers(function(userList) {
      new DiscordApp(Settings, CommandList, userList, WordParser, DBManager);
    });
  }
});
