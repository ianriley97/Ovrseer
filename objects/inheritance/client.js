const Commands = require('../../collections/commands.js');
const Groups = require('../../collections/groups.js');

class Client {
  constructor(index) {
    this.Index = index;
  }
  GetCommand(name) {
    return Commands.GetCommand(name);
  };
  GetGroup(id) {
    return Groups.GetGroup(this.Index, id);
  };
  AddGroup(id, guild) {
    return Groups.AddGroup(this.Index, id, guild);
  };
  RemoveGroup(id) {
    return Groups.RemoveGroup(this.Index, id);
  };
}

module.exports = Client;
