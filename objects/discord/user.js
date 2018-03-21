class User {
  constructor(db, memberObj) {
    this.db = db;
    this.id = memberObj.id;
    this.name = memberObj.username;
    this.user_obj = memberObj.user;
  }
}

module.exports = User;
