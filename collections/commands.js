const Log = require('../utility/logger.js')
const Command = require('../objects/command.js');

class Commands {
  constructor() {
    this.Commands = new Map();
  }
  Keys() {
    return this.Commands.keys();
  }
  GetCommand(name) {
    var foundCmd;
    this.Commands.forEach((value, key, thisMap) => {
      if(key == name || HasAlias(value, name)) {
        foundCmd = value;
        return;
      }
    });
    return foundCmd;
  }
  AddCommand(name, command) {
    var cmd = this.Commands.set(name, new Command(command));
    Log.command('Loading command: ' + name + '...');
    return cmd;
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
