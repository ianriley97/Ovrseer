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
      this.db.addGuildMember(this, userObj);
    }
  }
  removeMember(userObj) {
    var id = userObj.id;
    var i = this.memberIds.indexOf(id);
    if (i > -1) {
      this.memberIds.splice(i, 1);
      this.db.removeGuildMember(this, userObj);
    }
  }
  setCmdPrefix(prefix) {
    this.cmd_prefix = prefix;
  }
}

module.exports = Guild;
