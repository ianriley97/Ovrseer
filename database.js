class DBManager {
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
}

module.exports = DBManager;
