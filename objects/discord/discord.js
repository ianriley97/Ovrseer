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
    if(dbManager) {
      dbManager.initGuilds(this, function(app, guilds) {
        app.guilds = guilds;
        app.client.login(process.env.DISCORD_BOT_TOKEN);
      });
    }
    else {
      this.guilds = new Map();
      this.client.login(process.env.DISCORD_BOT_TOKEN);
    }
  }
  addUser(userObj, cb, guildObj) {
    var newU = new User(this.db, userObj, this.settings);
    this.users.set(userObj.id, newU);
    if(guildObj) guildObj.addMember(newU);
    if(this.db) this.db.addUser(newU);
    else console.log(`> User, "${newU.name}", added.`);
    cb(newU);
  }
  getUser(userObj, cb, guildObj) {
    var u = this.users.get(userObj.id);
    if(!u) this.addUser(userObj, cb, guildObj);
    else {
      if(guildObj) guildObj.addMember(u);
      cb(u);
    }
  }
  removeUser(userObj) {
    this.users.delete(userObj.id);
    if(this.db) this.db.removeUser(userObj);
    else console.log(`> User, "${userObj.username}", removed.`);
  }
  addGuild(guildObj, cb) {
    var newG = new Guild(this.db, guildObj, this.settings);
    this.guilds.set(guildObj.id, newG);
    if(this.db) this.db.addGuild(newG);
    else console.log(`> Guild, "${newG.name}", added.`);
    cb(newG);
  }
  getGuild(guildObj, cb) {
    var g = this.guilds.get(guildObj.id);
    if(!g) this.addGuild(guildObj, cb);
    else cb(g);
  }
  removeGuild(guildObj) {
    this.guilds.delete(guildObj.id);
    if(this.db) this.db.removeGuild(guildObj);
    else console.log(`> Guild, "${guildObj.name}", removed.`);
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
