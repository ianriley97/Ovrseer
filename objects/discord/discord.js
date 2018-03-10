const Path = require('path');
const DiscordJS = require('discord.js');

const Commands = require(Path.join(__dirname, '..', '..', 'collections', 'commands.js'));

class DiscordApp {
  constructor() {
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    require(Path.join(__dirname, '..', '..', 'utility', 'event-loader.js'))(this, __dirname);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  }
  parseCmd(params, cmdName, cmdGroup) {
    var message = params['message'];
    var member = params['member'];
    var guild = params['guild'];
    var cmd = Commands.get(cmdName, cmdGroup);
    if(cmd) {
      var exec = cmd.run['discord'];
      if(exec && cmd.enabled && member.permLvl >= cmd.permLvl) exec.run(params);
    }
  }
}

const DiscordClient = new DiscordApp();
module.exports = DiscordClient;
