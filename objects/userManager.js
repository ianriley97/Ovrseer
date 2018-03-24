const Path = require('path');

class UserManager {
  constructor(db, settings) {
    this.db = db;
    this.settings = settings;
    this.users = new Map();
  }
  addUser(userObj, cb, fromDB) {
    var newU = new User(this.db, userObj, this.settings, fromDB);
    this.users.set(userObj.id, newU);
    if(fromDB) console.log(`>> Init: User, "${newU.name}", added.`);
    else {
      if(this.db) this.db.addUser(newU);
      else console.log(`> User, "${newU.name}", added.`);
      if(cb) cb(newU);
    }
  }
  getUser(userObj, cb) {
    var u = this.users.get(userObj.id);
    if(!u) this.addUser(userObj, cb);
    else {
      u.verifyFields();
      cb(u);
    }
  }
  updateUser(userObj, cb) {
    this.getUser(userObj, function(user) {
      user.update(userObj);
      if(cb) cb(user);
    });
  }
  removeUser(userObj) {
    this.users.delete(userObj.id);
    if(this.db) this.db.removeUser(userObj);
    else console.log(`> User, "${userObj.username}", removed.`);
  }
}

module.exports = UserManager;

class User {
  constructor(db, userObj, settings, fromDB) {
    this.db = db;
    this.settings = settings;
    this.id = userObj.id;
    this.name = (fromDB) ? userObj.name : userObj.username;
    this.user_obj = (fromDB) ? userObj.user_obj : userObj;
  }
  verifyFields() {

  }
  update(userObj) {
    this.name = userObj.username;
    this.user_obj = userObj;
    if(this.db) this.db.update('users', this);
  }
}
