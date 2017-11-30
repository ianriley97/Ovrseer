const App = require('../../objects/inheritance/client.js');
const DiscordJS = require('discord.js');

class DiscordClient extends App {
  constructor() {
    super(0);
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    require('./eventLoader.js')(this);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  };
}

module.exports = DiscordClient;
