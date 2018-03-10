const Path = require('path');
// Allow use of environment variables
require('dotenv').config();
// Set global local modules
global.Log = require(Path.join(__dirname, 'utility', 'logger.js'));
// Initialize necessary objects for bot use
require(Path.join(__dirname, 'server', 'server.js'));
require(Path.join(__dirname, 'collections', 'commands.js'));
// Initialize clients
require(Path.join(__dirname, 'objects', 'discord', 'discord.js'));
