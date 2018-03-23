const Path = require('path');
// Allow use of environment variables
require('dotenv').config();
// Initialize necessary objects
const Settings = require(Path.join(__dirname, 'settings.json'));
// Initialize server listener to allow stable port connection on Heroku
new (require(Path.join(__dirname, 'server.js')))((process.env.PORT || 3000), Settings);
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'), Settings.cmd_prefix);
const WordParser = require(Path.join(__dirname, 'utilities', 'parse-string', 'word-parser.js'));
const DBManager = new (require(Path.join(__dirname, 'database.js')))(null, function(err, dbManager) {
  // Initialize apps/clients
  const DiscordApp = require(Path.join(__dirname, 'objects', 'discord', 'discord.js'));
  if(err) {
    new DiscordApp(process.env.DISCORD_BOT_TOKEN, Settings, CommandList, new Map(), WordParser);
  }
  else {
    dbManager.initUsers(function(userList) {
      new DiscordApp(process.env.DISCORD_BOT_TOKEN, Settings, CommandList, userList, WordParser, DBManager);
    });
  }
});
