class UserManager {
  constructor(dbManager, settings) {
    this.db = dbManager;
    this.settings = settings;
  }
}

module.exports = UserManager;
