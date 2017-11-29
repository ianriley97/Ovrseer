const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const Command = require('../../Objects/command.js');
const Guild = require('./guild.js');

class DiscordClient {
  constructor() {
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    this.Commands = new DiscordJS.Collection();
    this.Guilds = new DiscordJS.Collection();
    require('../utility/commandLoader.js')(this);
    require('../utility/guildLoader.js')(this);
    require('../utility/eventLoader.js')(this);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  };
  GetCommand(cmdStr) {
    var foundCmd;
    this.Commands.forEach((value, key, thisMap) => {
      if(key == cmdStr || HasAlias(value, cmdStr)) {
        foundCmd = value;
        return;
      }
    });
    return foundCmd;
  };
  AddCommand(cmd) {
    Log.command('Loading command: ' + cmd.Help.name + '...');
    var newCmd = new Command(cmd);
    this.Commands.set(cmd.Help.name, newCmd);
  };
  GetGuild(guild) {
    var foundGuild = this.Guilds.get(guild.id);
    if(!foundGuild) foundGuild = this.AddGuild(guild);
    return foundGuild;
  };
  AddGuild(guild) {
    var newGuild = new Guild(guild);
    this.Guilds.set(guild.id, newGuild);
    Log.default(this.Client.user.tag + " joined the guild \"" + guild.name + "\".");
    return newGuild;
  };
  RemoveGuild(guild) {
    this.Guilds.delete(guild.id);
    Log.default(this.Client.user.tag + " left the guild \"" + guild.name + "\".");
  };
}

module.exports = DiscordClient;

function HasAlias(cmd, cmdStr) {
  var found = false;
  cmd.Config.aliases.forEach(alias => {
    if(alias == cmdStr) {
      found = true;
      return;
    }
  });
  return found;
}
