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
    this.blacklist = (fromDB) ? guildObj.blacklist : settings.blacklist;
  }
  update(guildObj) {
    this.name = guildObj.name;
    this.guild_obj = guildObj;
    if(this.db) this.db.update('guilds', this);
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
    if(this.db) this.db.updateCmdPrefix('guilds', this, prefix);
    else console.log(`> Guild, "${this.name}", updated their cmd prefix to "${prefix}".`)
  }
  addToBlacklist(words) {
    var newWords = [];
    var blacklist = this.blacklist;
    words.forEach(function(word) {
      if(blacklist.indexOf(word) == -1) {
        blacklist.push(word);
        newWords.push(word);
      }
    });
    if(newWords.length > 0) {
      newWords = newWords.join(', ');
      if(this.db) this.db.updateBlacklist('guilds', this, newWords, ['added', 'to']);
      else  console.log(`> Guild, "${this.name}", added "${newWords}" to their blacklist.`);
    }
  }
  removeFromBlacklist(words) {
    var removedWords = [];
    var blacklist = this.blacklist;
    words.forEach(function(word) {
      var i = blacklist.indexOf(word);
      if(i > -1) {
        blacklist.splice(i, 1);
        removedWords.push(word);
      }
    });
    if(removedWords.length > 0) {
      removedWords = removedWords.join(', ');
      if(this.db) this.db.updateBlacklist('guilds', this, removedWords, ['removed', 'from']);
      else console.log(`> Guild, "${this.name}", removed "${removedWords}" from their blacklist.`)
    }
  }
}

module.exports = Guild;
