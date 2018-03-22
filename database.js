const Path = require('path');

const Settings = require(Path.join(__dirname, 'settings.json'));

class DatabaseManager {
  constructor(connection) {
    const {Client} = require('pg');
    this.db = new Client({
      connectionString: connection,
      ssl: true
    });
    this.db.connect(function(err) {
      if(err) console.log(err);
      else console.log('Database connection successful');
    });
  }
  query(queryStr, cb) {
    this.db.query(queryStr).then(function(res) { if(cb) cb(res); }).catch(function(err) { console.log(err); });
  }
  initUsers(cb) {
    const User = require(Path.join(__dirname, 'objects', 'user.js'));
    var users = new Map();
    this.query('SELECT * FROM users;', function(res) {
      res.rows.forEach(function(user) {
        var oldU = new User(this, user, Settings, true);
        users.set(user.id, oldU);
        console.log(`>> Init: User, "${oldU.name}", added.`);
      });
      cb(users);
    });
  }
  addUser(userObj) {
    this.query(`INSERT INTO users VALUES (${userObj.id}, '${userObj.name}');`, function(res) {
      console.log(`> User, "${userObj.name}", added.`);
    });
  }
  updateUser(userObj) {

  }
  removeUser(userObj) {
    this.query(`DELETE FROM users WHERE users.id=${userObj.id}`, function(res) {
      console.log(`> User, "${userObj.name}", removed.`);
    });
  }
  initGuilds(app, cb) {
    const Guild = require(Path.join(__dirname, 'objects', 'discord', 'guild.js'));
    var guilds = new Map();
    this.query('SELECT * FROM guilds;', function(gRes) {
      gRes.rows.forEach(function(guild) {
        var oldG = new Guild(this, guild, Settings, true);
        this.query(`SELECT * FROM guilds_users WHERE guild_id=${oldG.id}`, function(mRes) {
          mRes.rows.forEach(function(member) {
            oldG.addMember(member.user_id);
            console.log(`>> Init: Guild, "${oldG.name}" added.`);
          });
        });
      });
      cb(app, guilds);
    });
  }
  addGuild(guildObj) {
    this.db.query(`INSERT INTO guilds VALUES (${guildObj.id}, '${guildObj.name}', '${guildObj.cmd_prefix}');`, function(res) {
      console.log(`> Guild, "${guildObj.name}", added.`);
    });
  }
  updateGuild(guildObj) {

  }
  removeGuild(guildObj) {
    this.query(`DELETE FROM guilds WHERE guilds.id = ${guildObj.id}; DELETE FROM guilds_users WHERE guilds_users.guild_id = ${guildObj.id};`, function(res) {
      console.log(`> Guild, "${guildObj.name}", removed.`);
    });
  }
  addGuildMember(guildObj, userObj) {
    this.query(`INSERT INTO guilds_users VALUES (${guildObj.id}, ${userObj.id});`);
  }
  removeGuildMember(guildObj, userObj) {
    this.query(`DELETE FROM guilds_users WHERE guild_id = ${guildObj.id} AND user_id = ${userObj.id}`)
  }
}

module.exports = DatabaseManager;

function convert(item) {
  var res = item.rows;
  if(res.length == 0) return null;
  res = res[0];
  return res;
}
