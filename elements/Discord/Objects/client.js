const DiscordJS = require('discord.js');
const Log = require('../../../utility/logger.js');

const Command = require('./command.js');
const Guild = require('./guild.js');

class Client {
  constructor() {
    const fs = require('file-system');
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    this.Commands = new DiscordJS.Collection();
    this.Guilds = new DiscordJS.Collection();
    require('../utility/commandLoader.js')(this);
    require('../utility/guildLoader.js')(this);
    require('../utility/eventLoader.js')(this);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  };
  GetCommand(cmd) {
    var foundCmd = this.Commands.get(cmd);
    return foundCmd;
  };
  AddCommand(cmd) {
    Log.command('Loading command: ' + cmd.Help.name + '...');
    var newCmd = new Command(cmd);
    this.Commands.set(cmd.Help.name, newCmd);
    cmd.Config.aliases.forEach(alias => this.Commands.set(alias, newCmd));
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

module.exports = Client;
