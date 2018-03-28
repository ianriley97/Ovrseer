const Path = require('path');
const DiscordJS = require('discord.js');

class DiscordApp {
  constructor(botToken, settings, commandList, dbManager, userManager, wordParser) {
    this.settings = settings;
    this.db = dbManager;
    this.commands = commandList;
    this.userManager = userManager;
    this.wordParser = wordParser;
    this.client = new DiscordJS.Client({owner:settings.discord_owner_ids});
    require(Path.join(__dirname, '..', '..', 'utilities', 'event-loader.js'))(this, __dirname);
    this.client.login(botToken);
  }
  parseCmd(msg, prefix) {
    return this.commands.parseCmd(msg, prefix);
  }
  runCmd(cmdParams) {
    cmdParams.label = 'discord';
    this.commands.runCmd(cmdParams);
  }
  parseMessage(dbUser, dbGuild, content, blacklist) {
    var badFinds = this.wordParser.find(content, blacklist);
    var negativeCounts = (badFinds.length > 0) ? 1 : 0;
    this.db.query(`UPDATE users SET total_karma_counts=total_karma_counts+1, negative_karma_counts=negative_karma_counts+${negativeCounts} WHERE users.discord_id=${dbUser.discord_id};`);
    if(dbGuild) this.db.query(`UPDATE guilds SET total_karma_counts=total_karma_counts+1, negative_karma_counts=negative_karma_counts+${negativeCounts} WHERE guilds.id=${dbGuild.id};`);
  }
  replaceMessage(dbUser, dbGuild, content, checkList) {
    var info = this.wordParser.replace(content, checkList);
    var found = info.found;
    return info.newStr;
  }
  addGuild(appGuild, cb, appUser) {
    var app = this;
    this.db.query(`INSERT INTO guilds (id, name, guild_obj, cmd_prefix, total_karma_counts, negative_karma_counts) VALUES (${appGuild.id}, '${appGuild.name}', '${this.db.convertFromObj(appGuild)}', '${this.commands.defCmdPrefix}', 0, 0) ON CONFLICT DO NOTHING RETURNING *;`, function(res, db) {
      console.log(`DB: Guild, "${appGuild.name}", added.`);
      app.checkForGuildMember(appGuild, appUser);
      cb(res.rows[0]);
    });
  }
  getGuild(appGuild, cb, appUser) {
    var app = this;
    this.db.query(`SELECT * FROM guilds WHERE guilds.id=${appGuild.id};`, function(res, db) {
      if(res.rows.length == 0) app.addGuild(appGuild, cb, appUser);
      else {
        app.checkForGuildMember(appGuild, appUser);
        cb(res.rows[0]);
      }
    });
  }
  updateGuild(appGuild) {
    this.db.query(`UPDATE guilds SET name='${appGuild.name}', guild_obj='${this.db.convertFromObj(appGuild)}' WHERE guilds.id=${appGuild.id};`);
  }
  removeGuild(appGuild) {
    this.db.query(`DELETE FROM guilds WHERE guilds.id=${appGuild.id};`, function(res, db) {
      if(res.rows.length > 0) console.log(`DB: Guild, "${appGuild.name}", removed.`);
    });
  }
  addGuildMember(appGuild, appUser) {
    this.db.query(`INSERT INTO guilds_users (guild_id, user_id) VALUES (${appGuild.id}, ${appUser.id}) RETURNING *;`, function(res, db) {
      console.log(`DB: Member, "${appUser.username}", added to Guild, "${appGuild.name}".`);
    });
  }
  checkForGuildMember(appGuild, appUser) {
    if(!appUser) return;
    var app = this;
    this.db.query(`SELECT * FROM guilds_users WHERE guild_id=${appGuild.id} AND user_id=${appUser.id};`, function(res, db) {
      if(res.rows.length == 0) app.addGuildMember(appGuild, appUser);
    });
  }
  removeGuildMember(appGuild, appUser) {
    this.db.query(`DELETE FROM guilds_users WHERE guild_id=${appGuild.id} AND user_id=${appUser.id};`, function(res, db) {
      if(res.rows.length > 0) console.log(`DB: Member, "${appUser.username}", removed from Guild, "${appGuild.name}".`);
    });
  }
  updateCmdPrefix(dbGuild, prefix) {
    this.db.query(`UPDATE guilds SET cmd_prefix='${prefix}' WHERE guilds.id=${dbGuild.id};`);
  }
  addToBlacklist(dbGuild, words) {
    var thisDb = this.db;
    words.forEach(function(word) {
      thisDb.query(`SELECT * FROM guilds_blacklists WHERE guild_id=${dbGuild.id} AND word='${word}';`, function(res, db) {
        if(res.rows.length == 0) db.query(`INSERT INTO guilds_blacklists (guild_id, word) VALUES (${dbGuild.id}, '${word}') RETURNING *;`);
      });
    });
  }
  getBlacklist(dbGuild, cb) {
    this.db.query(`SELECT word FROM guilds_blacklists WHERE guild_id='${dbGuild.id}';`, function(res, db) {
      var words = [];
      var rows = res.rows;
      var length = rows.length;
      for(var i = 0; i < length; i++) words.push(rows[i].word);
      cb(words);
    });
  }
  removeFromBlacklist(dbGuild, words) {
    var thisDb = this.db;
    words.forEach(function(word) {
      thisDb.query(`DELETE FROM guilds_blacklists WHERE guild_id=${dbGuild.id} AND word='${word}'`);
    });
  }
  addUser(appUser, cb) {
    this.db.query(`INSERT INTO users (discord_id, discord_username, discord_user_obj, total_karma_counts, negative_karma_counts) VALUES (${appUser.id}, '${appUser.username}', '${this.db.convertFromObj(appUser)}', 0, 0) ON CONFLICT DO NOTHING RETURNING *;`, function(res, db) {
      console.log(`DB: User, "${appUser.username}", added.`);
      cb(res.rows[0]);
    });
  }
  getUser(appUser, cb) {
    var app = this;
    this.db.query(`SELECT * FROM users WHERE users.discord_id=${appUser.id};`, function(res, db) {
      if(res.rows.length == 0) app.addUser(appUser, cb);
      else cb(res.rows[0]);
    });
  }
  updateUser(appUser) {
    this.db.query(`UPDATE users SET discord_username='${appUser.username}', discord_user_obj='${this.db.convertFromObj(appUser)}' WHERE users.discord_id=${appUser.id};`);
  }
}

module.exports = DiscordApp;
