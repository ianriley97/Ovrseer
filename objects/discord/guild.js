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
  addMember(id) {
    this.memberIds.push(id);
    this.db.query(`INSERT INTO guilds_users VALUES (${this.id}, ${id});`);
  }
  removeMember(memberObj) {
    var id = memberObj.id;
    var index = this.memberIds.indexOf(id);
    if (index > -1) {
      this.memberIds.splice(index, 1);
      this.db.query(`DELETE FROM guilds_users WHERE guilds_users.user_id = ${id} AND guilds_users.guild_id = ${this.id}`);
    }
  }
  setCmdPrefix(prefix) {
    this.cmd_prefix = prefix;
  }
}

module.exports = Guild;
