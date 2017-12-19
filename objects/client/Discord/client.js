const App = require('../client.js');
const DiscordJS = require('discord.js');

class DiscordClient extends App {
  constructor() {
    super('Discord', 0);
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    require('../../../utility/eventLoader.js')(this, __dirname);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  };
}

module.exports = DiscordClient;
