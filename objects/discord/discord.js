const Path = require('path');
const DiscordJS = require('discord.js');

const User = require(Path.join(__dirname, '..', 'user.js'));
const Guild = require(Path.join(__dirname, 'guild.js'));

class DiscordApp {
  constructor(botToken, settings, commandList, users, wordParser, dbManager) {
    const Path = require('path');
    this.client = new DiscordJS.Client({owner:settings.discord_owner_ids});
    require(Path.join(__dirname, '..', '..', 'utilities', 'event-loader.js'))(this, __dirname);
    this.db = dbManager;
    this.commands = commandList;
    this.settings = settings;
    this.settings.blacklist = wordParser.blacklist;
    this.word_parser = wordParser;
    this.users = users;
    if(dbManager) {
      dbManager.initGuilds(this, function(app, guilds) {
        app.guilds = guilds;
        app.client.login(botToken);
      });
    }
    else {
      this.guilds = new Map();
      this.client.login(botToken);
    }
  }
  addUser(userObj, cb) {
    var newU = new User(this.db, userObj, this.settings);
    this.users.set(userObj.id, newU);
    if(this.db) this.db.addUser(newU);
    else console.log(`> User, "${newU.name}", added.`);
    if(cb) cb(newU);
  }
  getUser(userObj, cb) {
    var u = this.users.get(userObj.id);
    if(!u) this.addUser(userObj, cb);
    else {
      u.verifyFields();
      cb(u);
    }
  }
  updateUser(userObj, cb) {
    this.getUser(userObj, function(user) {
      user.update(userObj);
      if(cb) cb(user);
    });
  }
  removeUser(userObj) {
    this.users.delete(userObj.id);
    if(this.db) this.db.removeUser(userObj);
    else console.log(`> User, "${userObj.username}", removed.`);
  }
  addGuild(guildObj, cb, userObj) {
    var newG = new Guild(this.db, guildObj, this.settings);
    this.guilds.set(guildObj.id, newG);
    if(userObj) newG.addMember(userObj);
    if(this.db) this.db.addGuild(newG);
    else console.log(`> Guild, "${newG.name}", added.`);
    if(cb) cb(newG);
  }
  getGuild(guildObj, cb, userObj) {
    var g = this.guilds.get(guildObj.id);
    if(!g) this.addGuild(guildObj, cb, userObj);
    else {
      g.verifyFields();
      if(userObj) g.addMember(userObj);
      cb(g);
    }
  }
  updateGuild(guildObj, cb) {
    this.getGuild(guildObj, function(guild) {
      guild.update(guildObj);
      if(cb) cb(guild);
    });
  }
  removeGuild(guildObj) {
    this.guilds.delete(guildObj.id);
    if(this.db) this.db.removeGuild(guildObj);
    else console.log(`> Guild, "${guildObj.name}", removed.`);
  }
  checkForCmd(msg, prefix) {
    return this.commands.parseForCmd(msg, prefix);
  }
  runCmd(cmdParams) {
    var cmd = this.commands.get(cmdParams['command'], cmdParams['group']);
    if(cmd) {
      var exe = cmd.run['discord'];
      var validPrefix = (cmdParams.default && cmd.config.default) || !cmdParams.default;
      if(exe && cmd.config.enabled && validPrefix) exe(cmdParams);
    }
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
