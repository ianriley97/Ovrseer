const FileSystem = require('fs');
const Path = require('path');

class Commands {
  constructor() {
    var cmdPath = Path.join('commands', '..');
    
  }
}

const CommandsList = new Commands();
module.exports = CommandsList;

class Command {
  constructor(config, help, run) {
    this.Config = config;
    this.Help = config;
    this.Run = run;
  }
}
