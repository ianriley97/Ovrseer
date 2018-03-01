const Path = require('path');
const DiscordJS = require('discord.js');

class DiscordApp {
  constructor() {
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    require(Path.join(__dirname, '..', '..', 'utility', 'event-loader.js'))(this, __dirname);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  }
}

const DiscordClient = new DiscordApp();
module.exports = DiscordClient;
