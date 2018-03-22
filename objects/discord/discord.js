const Path = require('path');
const DiscordJS = require('discord.js');

const User = require(Path.join(__dirname, '..', 'user.js'));
const Guild = require(Path.join(__dirname, 'guild.js'));

class DiscordApp {
  constructor(settings, commandList, users, wordParser, dbManager) {
    const Path = require('path');
    this.client = new DiscordJS.Client({owner:settings.discord_owner_ids});
    require(Path.join(__dirname, '..', '..', 'utility', 'event-loader.js'))(this, __dirname);
    this.db = dbManager;
    this.commands = commandList;
    this.settings = settings;
    this.word_parser = wordParser;
    this.users = users;
    this.db.initGuilds(this, function(app, guilds) {
      app.guilds = guilds;
      app.client.login(process.env.DISCORD_BOT_TOKEN);
    });
  }
  addUser(userObj, cb) {
    var newU = new User(this.db, userObj, this.settings);
    this.users.set(userObj.id, newU);
    this.db.addUser(newU);
    cb(newU);
  }
  getUser(userObj, cb) {
    var u = this.users.get(userObj.id);
    if(!u) this.addUser(userObj, cb);
    else cb(u);
  }
  addGuild(guildObj, cb) {
    var newG = new Guild(this.db, guildObj, this.settings);
    this.guilds.set(guildObj.id, newG);
    this.db.addGuild(newG);
    cb(newG);
  }
  getGuild(guildObj, cb) {
    var g = this.guilds.get(guildObj.id);
    if(!g) this.addGuild(guildObj, cb);
    else cb(g);
  }
  removeGuild(guildObj) {
    var id = guildObj.id;
    this.guilds.delete(id);
    this.db.removeGuild(id);
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
