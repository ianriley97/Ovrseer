const Path = require('path');

const User = require(Path.join(__dirname, 'user.js'));

class Guild {
  constructor(db, guildObj, defaults) {
    this.db = db;
    this.id = guildObj.id;
    this.name = guildObj.name;
    this.guild_obj = guildObj;
    this.members = new Map();
    this.cmd_prefix = defaults.cmd_prefix;
  }
  addMember(memberObj) {
    var newM = new User(this.db, memberObj);
    this.members.set(memberObj.id, newM);
    console.log(`> Member, "${newM.name}", added to guild "${this.name}".`);
    return newM;
  }
  getMember(memberObj, cb) {
    var m = this.members.get(memberObj.id);
    if(!m) m = this.addMember(memberObj);
    cb(m);
  }
  removeMember(memberObj) {
    this.members.delete(memberObj.id);
  }
  setCmdPrefix(prefix) {
    this.cmd_prefix = prefix;
  }
}

module.exports = Guild;
