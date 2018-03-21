const Path = require('path');
const DiscordJS = require('discord.js');

const Guild = require(Path.join(__dirname, 'guild.js'));

class DiscordApp {
  constructor(settings, commandList, wordParser, dbManager) {
    const Path = require('path');
    this.client = new DiscordJS.Client({owner:settings.discord_owner_ids});
    require(Path.join(__dirname, '..', '..', 'utility', 'event-loader.js'))(this, __dirname);
    this.db = dbManager;
    this.commands = commandList;
    this.settings = settings;
    this.guilds = new Map();
    this.word_parser = wordParser;
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
  addGuild(guildObj) {
    var newG = new Guild(this.db, guildObj, this.settings);
    this.guilds.set(guildObj.id, newG);
    console.log(`> Guild, "${newG.name}", added.`);
    return newG;
  }
  getGuild(guildObj, cb) {
    var g = this.guilds.get(guildObj.id);
    if(!g) g = this.addGuild(guildObj);
    cb(g);
  }
  removeGuild(guildObj) {
    this.guilds.delete(guildObj.id);
  }
  runCmd(cmdParams) {
    var cmd = this.commands.get(cmdParams['command'], cmdParams['group']);
    if(cmd) {
      var exe = cmd.run['discord'];
      if(exe && cmd.config.enabled) exe(cmdParams);
    }
  }
  checkForCmd(msg, prefix) {
    return this.commands.parseForCmd(msg, prefix);
  }
  parseMessage(content, checkList) {
    if(!checkList) checkList = this.word_parser.blacklist;
    var found = this.word_parser.find(content, checkList);
  }
  replaceMessage(content, checkList) {
    if(!checkList) checkList = this.word_parser.blacklist;
    var info = this.word_parser.replace(content, checkList);
    var found = info.found;
    return info.newStr;
  }
}
module.exports = DiscordApp;
