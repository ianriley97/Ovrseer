const DiscordJS = require('discord.js');
const fs = require('file-system');
const moment = require('moment');

const Guild = require('./Objects/guild.js');

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

class DiscordClient {
  constructor(owner) {
    this.Client = new DiscordJS.Client({owner:[process.env.DISCORD_OWNER_ID]});
    this.Client.commands = new DiscordJS.Collection();
    this.Client.aliases = new DiscordJS.Collection();
    fs.readdir((__dirname + '/commands/'), (err, files) => {
      if (err) console.error(err);
      log(`Loading a total of ${files.length} commands.`);
      files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Loading Command: ${props.help.name}.`);
        this.Client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          this.Client.aliases.set(alias, props.help.name);
        });
      });
    });
    this.Guilds = new DiscordJS.Collection();
    require('./utility/eventLoader.js')(this);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  };
  GetGuild(guild) {
    return this.Guilds.get(guild.id);
  };
  AddGuild(guild) {
    var newGuild = new Guild(guild);
    this.Guilds.set(guild.id, newGuild);
    console.log("Joined guild \"" + guild.name + "\".");
    return newGuild;
  };
  RemoveGuild(guild) {
    this.Guilds.delete(guild.id);
    console.log("Left guild \"" + guild.name + "\".");
  };
}

module.exports = DiscordClient;
