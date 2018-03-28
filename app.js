const Path = require('path');
// Allow use of environment variables
require('dotenv').config();
// Initialize necessary objects
const Settings = require(Path.join(__dirname, 'settings.json'));
// Initialize server listener to allow stable port connection on Heroku
new (require(Path.join(__dirname, 'server.js')))((process.env.PORT || 3000), Settings);
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'), Settings.cmd_prefix);
const WordParser = require(Path.join(__dirname, 'utilities', 'word-parser.js'));
new (require(Path.join(__dirname, 'objects', 'database-manager.js')))(process.env.DATABASE_URL, function(err, dbManager) {
  const UserManager = new (require(Path.join(__dirname, 'objects', 'user-manager.js')))(dbManager, Settings);
  new (require(Path.join(__dirname, 'objects', 'discord', 'discord.js')))(process.env.DISCORD_BOT_TOKEN, Settings, CommandList, dbManager, UserManager, WordParser);
});
