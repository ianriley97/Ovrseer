const Log = require('../../utility/logger.js')

const Commands = require('../command/commands.js');
const Groups = require('../group/groups.js');

class Client {
  constructor(id, index) {
    this.Identity = id;
    this.Index = index;
  }
  GetCommand(name, group) {
    return Commands.GetCommand(name, group);
  };
  GetGroup(id) {
    return Groups.GetGroup(this.Index, id);
  };
  AddGroup(id, group) {
    var g = Groups.AddGroup(this.Index, id, group);
    Log[this.Identity](`${g.Identity}, "${g.Name}", has been added to Groups.`);
    return g;
  };
  RemoveGroup(id) {
    var g = Groups.RemoveGroup(this.Index, id);
    Log[this.Identity](`${g.Identity}, "${g.Name}", has been removed from Groups.`);
    return g;
  };
  IsCommandGroup(name) {
    return Commands.IsGroup(name);
  };
}

module.exports = Client;
