class DatabaseManager {
  constructor(connection, cb, settings) {
    this.settings = settings;
    const {Client} = require('pg');
    this.db = new Client({
      connectionString: connection,
      ssl: true
    });
    var dbm = this;
    this.db.connect(function(err) {
      if(err) console.error(err);
      else console.log('Database connection successful');
      cb(err, dbm);
    });
  }
  query(queryStr, cb) {
    var dbObj = this;
    this.db.query(queryStr).then(function(res) {
      if(cb) cb(res, dbObj);
    }).catch(function(err) { console.error(err); });
  }
  initUsers(userManager, cb) {
    this.query('SELECT * FROM users;', function(res, db) {
      var rows = res.rows, length = rows.length;
      for(var i = 0; i <= length; i++) {
        if(i == length) cb();
        else userManager.addUser(rows[i], null, true);
      }
    });
  }
  addUser(userObj) {
    this.query(`INSERT INTO users VALUES (${userObj.id}, '${userObj.name}' ON CONFLICT DO NOTHING);`, function(res) {
      console.log(`> DB: User, "${userObj.name}", added.`);
    });
  }
  removeUser(userObj) {
    this.query(`DELETE FROM users WHERE users.id=${userObj.id}`, function(res) {
      console.log(`> DB: User, "${userObj.name}", removed.`);
    });
  }
  initGuilds(app, cb) {
    const Path = require('path');
    const GuildManager = new (require(Path.join(__dirname, 'objects', 'discord', 'guildManager.js')))(this, this.settings);
    var guilds = new Map();
    this.query('SELECT * FROM guilds;', function(gRes, db) {
      var rows = gRes.rows, length = rows.length;
      for(var i = 0; i <= length; i++) {
        if(i == length) cb(app, guilds);
        else {
          var guild = rows[i];
          var memberIds = [];
          db.query(`SELECT * FROM guilds_users WHERE guild_id=${oldG.id}`, function(mRes) {
            mRes.rows.forEach(function(member) {
              memberIds.push(member.user_id);
            });
          });

          guilds.set(oldG.id, oldG);
          console.log(`>> Init: Guild, "${oldG.name}", added.`);
        }
      }
    });
  }
  addGuild(guildObj) {
    this.query(`INSERT INTO guilds VALUES (${guildObj.id}, '${guildObj.name}', '${guildObj.cmd_prefix}', ${guildObj.blacklist} ON CONFLICT DO NOTHING);`, function(res) {
      console.log(`> DB: Guild, "${guildObj.name}", added.`);
    });
  }
  removeGuild(guildObj) {
    this.query(`DELETE FROM guilds WHERE guilds.id = ${guildObj.id}; DELETE FROM guilds_users WHERE guilds_users.guild_id = ${guildObj.id};`, function(res) {
      console.log(`> DB: Guild, "${guildObj.name}", removed.`);
    });
  }
  addGuildMember(guildObj, userObj) {
    this.query(`INSERT INTO guilds_users VALUES (${guildObj.id}, ${userObj.id});`, function(res) {
      console.log(`> DB: User, "${userObj.name}", added to guild "${guildObj.name}".`);
    });
  }
  removeGuildMember(guildObj, userObj) {
    this.query(`DELETE FROM guilds_users WHERE guild_id = ${guildObj.id} AND user_id = ${userObj.id}`, function(res) {
      console.log(`> DB: User, "${userObj.name}", removed from guild "${guildObj.name}".`);
    });
  }
  update(table, obj) {
    var objStr = table.slice(0,-1) + '_obj';
    this.query(`UPDATE ${table} SET name=${obj.name}, ${objStr}=${obj[objStr]}`, function(res) {});
  }
  updateCmdPrefix(table, obj, prefix) {
    this.query(`UPDATE ${table} SET cmd_prefix='${prefix}' WHERE ${table}.id=${obj.id};`, function(res) {});
  }
  updateBlacklist(table, obj, words, stateStr) {
    this.this.query(`UPDATE ${table} SET blacklist=${obj.blacklist} WHERE ${table}.id=${obj.id};`, function(res) {});
  }
}

module.exports = DatabaseManager;

function convert(item) {
  var res = item.rows;
  if(res.length == 0) return null;
  res = res[0];
  return res;
}
