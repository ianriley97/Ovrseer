class User {
  constructor(db, userObj, settings, fromDB) {
    this.db = db;
    this.settings = settings;
    this.id = userObj.id;
    this.name = (fromDB) ? userObj.name : userObj.username;
    this.user_obj = (fromDB) ? userObj.user_obj : userObj;
  }
}

module.exports = User;
