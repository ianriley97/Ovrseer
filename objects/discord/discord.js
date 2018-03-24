const DiscordJS = require('discord.js');

class DiscordApp {
  constructor(botToken, settings, commandList, userManager, wordParser, dbManager) {
    const Path = require('path');
    this.client = new DiscordJS.Client({owner:settings.discord_owner_ids});
    require(Path.join(__dirname, '..', '..', 'utilities', 'event-loader.js'))(this, __dirname);
    this.db = dbManager;
    this.commands = commandList;
    this.settings = settings;
    this.word_parser = wordParser;
    this.userManager = userManager;
    if(dbManager) {
      dbManager.initGuilds(this, function(app, guildManager) {
        app.this.guildManager = guildManager;
        app.client.login(botToken);
      });
    }
    else {
      this.guildManager = new (require(Path.join(__dirname, 'guildManager.js')))(this.db, this.settings);
      this.client.login(botToken);
    }
  }
  addUser(userObj, cb) {
    this.userManager.addUser(userObj, cb);
  }
  getUser(userObj, cb) {
    this.userManager.getUser(userObj, cb);
  }
  updateUser(userObj, cb) {
    this.userManager.updateUser(userObj, cb);
  }
  removeUser(userObj) {
    this.userManager.removeUser(userObj);
  }
  addGuild(guildObj, cb, userObj) {
    this.guildManager.addGuild(guildObj, cb, userObj);
  }
  getGuild(guildObj, cb, userObj) {
    this.guildManager.getGuild(guildObj, cb, userObj);
  }
  updateGuild(guildObj, cb) {
    this.guildManager.getGuild(guildObj, cb);
  }
  removeGuild(guildObj) {
    this.guildManager.removeGuild(guildObj);
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
    var found = this.word_parser.find(content, checkList);
  }
  replaceMessage(content, checkList) {
    var info = this.word_parser.replace(content, checkList);
    var found = info.found;
    return info.newStr;
  }
}

module.exports = DiscordApp;
