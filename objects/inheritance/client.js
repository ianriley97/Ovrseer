const Log = require('../../utility/logger.js')

const Commands = require('../../collections/commands.js');
const Groups = require('../../collections/groups.js');

class Client {
  constructor(id, index) {
    this.Identity = id;
    this.Index = index;
  }
  GetCommand(name) {
    return Commands.GetCommand(name);
  };
  GetGroup(id) {
    return Groups.GetGroup(this.Index, id);
  };
  AddGroup(id, group) {
    var g = Groups.AddGroup(this.Index, id, group);
    Log[this.Identity](`${g.Identity}, "${g.Name}", has been added to Groups.`);
  };
  RemoveGroup(id) {
    var g = Groups.RemoveGroup(this.Index, id);
    Log[this.Identity](`${g.Identity}, "${g.Name}", has been removed from Groups.`);
  };
}

module.exports = Client;
