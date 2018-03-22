const Path = require('path');

class Guild {
  constructor(db, guildObj, settings, fromDB) {
    this.db = db;
    this.settings = settings;
    this.id = guildObj.id;
    this.name = guildObj.name;
    this.guild_obj = (fromDB) ? guildObj.guild_obj : guildObj;
    this.cmd_prefix = (fromDB) ? guildObj.cmd_prefix : settings.cmd_prefix;
    this.memberIds = [];
  }
  addMember(userObj) {
    var id = userObj.id;
    var i = this.memberIds.indexOf(id);
    if(i == -1) {
      this.memberIds.push(id);
      if(this.db) this.db.addGuildMember(this, userObj);
      else console.log(`> User, "${userObj.name || userObj.username}", added to guild "${this.name}".`);
    }
  }
  removeMember(userObj) {
    var id = userObj.id;
    var i = this.memberIds.indexOf(id);
    if (i > -1) {
      this.memberIds.splice(i, 1);
      if(this.db) this.db.removeGuildMember(this, userObj);
      else console.log(`> User, "${userObj.name || userObj.username}", removed from guild "${this.name}".`);
    }
  }
  setCmdPrefix(prefix) {
    this.cmd_prefix = prefix;
    if(this.db) this.db.setCmdPrefix('guilds', this, prefix);
    else console.log(`> DB: Guild, "${this.name}", updated their cmd prefix to "${prefix}".`)
  }
}

module.exports = Guild;
