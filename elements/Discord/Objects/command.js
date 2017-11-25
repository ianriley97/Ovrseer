const DiscordJS = require('discord.js');

class Command {
  constructor(cmd) {
    this.Config = cmd.Config;
    this.Help = cmd.Config;
    this.Run = cmd.Run;
  }
}

module.exports = Command;
