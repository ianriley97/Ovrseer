const DiscordJS = require('discord.js');
const fs = require('file-system');
const moment = require('moment');

class Discord {
  constructor(options) {
    this.CmdPrefix = options.cmdPrefix;
    var discordOptions = {
      commandPrefix: options.cmdPrefix,
      owner: options.owners
    };
    this.Client = new DiscordJS.Client(discordOptions);
    this.Client.commands = new DiscordJS.Collection();
    this.Client.aliases = new DiscordJS.Collection();
    fs.readdir((__dirname + '/commands/'), (err, files) => {
      if (err) console.error(err);
      log(`Loading a total of ${files.length} commands.`);
      files.forEach(f => {
        console.log(f);
        let props = require(`./commands/${f}`);
        log(`Loading Command: ${props.help.name}.`);
        this.Client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          this.Client.aliases.set(alias, props.help.name);
        });
      });
    });
    require('./utility/eventLoader.js')(this);
    this.Client.login(options.token);
  }
  reload(command) {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
        this.Client.commands.delete(command);
        this.Client.aliases.forEach((cmd, alias) => {
          if (cmd === command) this.Client.aliases.delete(alias);
        });
        this.Client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          this.Client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      }
      catch (e){
        reject(e);
      }
    });
  }
  SetCurrentPrefix(newPrefix) {
    this.CmdPrefix = newPrefix;
  }
}
module.exports = Discord;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
