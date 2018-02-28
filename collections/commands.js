const FileSystem = require('fs');
const Path = require('path');

var groupCount = 0;

class Commands {
  constructor() {
    this.Groups = new Map();
    this.Commands = [new Map()];
    var cmdPath = Path.join(__dirname, '..', 'commands');
    readDirectory(cmdPath);
  }
  add(cmd) {
    var cmdGroup = cmd.help.group;
    var groupIndex = this.Groups.get(cmdGroup);
    if(!groupIndex) {
      if(cmdGroup) {
        groupIndex = groupCount++;
        this.Groups.set(cmdGroup, groupIndex);
        this.Commands.push(new Map());
      }
      else groupIndex = 0;
    }
    this.Commands[groupIndex].set(cmd.help.name, new Command(cmd.config, cmd.help, cmd.run));
  }
  get(cmdName, groupName) {
    var groupIndex = this.Groups.get(groupName);
    if(!groupIndex) groupIndex = 0;
    return this.Commands[groupIndex].get(cmdName);
  }
  run(params, cmdName, groupName) {
    var cmd = this.get(cmdName, groupName);
    if(cmd && cmd.config.enabled) cmd.run(params);
  }
}

const CommandsList = new Commands();
module.exports = CommandsList;

function readDirectory(dirPath) {
  FileSystem.readdir(dirPath, function(err, files) {
    if(err) console.error(err);
    else {
      files.forEach(function(file) {
        var filePath = Path.join(dirPath, file);
        if(FileSystem.statSync(filePath).isDirectory()) readDirectory(filePath);
        var cmd = require(filePath);
        CommandsList.add(cmd);
      });
    }
  });
}

class Command {
  constructor(config, help, run) {
    this.config = config;
    this.help = config;
    this.run = run;
  }
}
