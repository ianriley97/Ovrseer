const Log = require('../utility/logger.js')
const Command = require('../objects/command.js');

class Commands {
  constructor() {
    this.Commands = new Map();
    this.Groups = [];
  }
  GetCommand(name, group) {
    if(!group) group = 'Commands';
    var foundCmd;
    this[group].forEach((value, key, thisMap) => {
      if(key == name || HasAlias(value, name)) {
        foundCmd = value;
        return;
      }
    });
    return foundCmd;
  }
  AddCommand(name, command, group) {
    if(!group) group = 'Commands';
    var cmd = this[group].set(name, new Command(command));
    Log.command('Loading command: ' + name + '...');
    return cmd;
  }
  AddGroup(group) {
    this.Groups.push(group);
  }
  IsGroup(name) {
    return this.Groups.includes(name);
  }
}

var CommandList = new Commands();
module.exports = CommandList;

function HasAlias(cmd, name) {
  var found = false;
  cmd.Config.aliases.forEach(alias => {
    if(alias == name) {
      found = true;
      return;
    }
  });
  return found;
}
