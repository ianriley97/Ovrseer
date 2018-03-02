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
  add(cmd, group) {
    if(group) cmd.help.group = group;
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
    var cmdName = cmd.help.name;
    this.Commands[groupIndex].set(cmdName, new Command(cmd.config, cmd.help, cmd.run));
    Log('command', `Command Loaded: ${(group) ? `${group} - ${cmdName}` : `${cmdName}`}`);
  }
  get(cmdName, groupName) {
    var groupIndex = this.Groups.get(groupName);
    if(!groupIndex) groupIndex = 0;
    return this.Commands[groupIndex].get(cmdName);
  }
  run(clientName, params, cmdName, groupName) {
    var cmd = this.get(cmdName, groupName);
    if(cmd && cmd.config.enabled && cmd.run[clientName]) cmd.run[clientName](params);
  }
}

const CommandsList = new Commands();
module.exports = CommandsList;

function readDirectory(dirPath, group) {
  FileSystem.readdir(dirPath, function(err, files) {
    if(err) console.error(err);
    else {
      files.forEach(function(file) {
        var filePath = Path.join(dirPath, file);
        if(FileSystem.statSync(filePath).isDirectory()) readDirectory(filePath, file);
        var cmd = require(filePath);
        CommandsList.add(cmd, group);
      });
    }
  });
}

class Command {
  constructor(config, help, run) {
    this.config = config;
    this.help = help;
    this.run = run;
  }
}
