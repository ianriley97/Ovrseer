class DatabaseManager {
  constructor(connection) {
    const {Client} = require('pg');
    this.DB = new Client({
      connectionString: connection,
      ssl: true
    });
    this.DB.connect(function(err) {
      if(err) console.log(err);
      else console.log('Database connection successful');
    });
  }
  addGuild(id, guild) {

  }
  getGuild(id) {

  }
  updateGuild(id, guild) {

  }
  addMember(id, member) {

  }
  getMember(id) {

  }
  updateMember(id, member) {

  }
}

module.exports = DatabaseManager;
