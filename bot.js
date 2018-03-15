const Path = require('path');
// Allow use of environment variables
require('dotenv').config();
// Set global local modules
global.Log = require(Path.join(__dirname, 'utility', 'logger.js'));
// Initialize necessary objects for bot use
require(Path.join(__dirname, 'server', 'server.js'));
const CommandList = new (require(Path.join(__dirname, 'collections', 'commands.js')))(Path.join(__dirname, 'commands'));
// Initialize clients
const DiscordClient = new (require(Path.join(__dirname, 'objects', 'discord', 'discord.js')))(CommandList);
