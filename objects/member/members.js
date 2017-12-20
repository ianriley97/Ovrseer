const Log = require('../../utility/logger.js')

const Collection = require('../collection.js');
const Member = require('./member.js');

class Members {
  constructor() {
    this.Members = new Collection();
  }
  GetMember(id) {
    var m = this.Members.Get(id);
    return m;
  }
  AddMember(id) {
    var m = this.Members.Add(id, new Member());
    return m;
  }
  RemoveMember(id) {
    var m = this.Members.Remove(id);
    return m;
  }
}

const MembersList = new Members();
module.exports = MembersList;
