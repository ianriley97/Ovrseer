const DiscordJS = require('discord.js');

class Discord {
  constructor(options) {
    var discordOptions = {
      commandPrefix: options.cmdPrefix,
      owner: options.owners
    };
    this.Client = new DiscordJS.Client(discordOptions);
    require('./util/eventLoader.js')(this);
    this.Client.login(options.token);
  }
}
module.exports = Discord;
