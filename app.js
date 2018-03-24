const Path = require('path');
// Allow use of environment variables
require('dotenv').config();
// Initialize necessary objects
const Settings = require(Path.join(__dirname, 'settings.json'));
// Initialize server listener to allow stable port connection on Heroku
new (require(Path.join(__dirname, 'server.js')))((process.env.PORT || 3000), Settings);
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'), Settings.cmd_prefix);
const UserManager = new (require(Path.join(__dirname, 'objects', 'userManager.js')));
const WordParser = require(Path.join(__dirname, 'utilities', 'word-parser.js'));
const DBManager = new (require(Path.join(__dirname, 'database.js')))(process.env.DATABASE_URL, function(err, dbManager) {
  // Initialize app clients
  if(err) initAppClients();
  else dbManager.initUsers(UserManager, initAppClients, Settings);
});

function initAppClients(dbManager) {
  new (require(Path.join(__dirname, 'objects', 'discord', 'discord.js')))(process.env.DISCORD_BOT_TOKEN, Settings, CommandList, UserManager, WordParser, dbManager);
}
