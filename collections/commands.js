var groupCount = 0;

class Commands {
  constructor(cmdFolderPath, defCmdPrefix) {
    this.Groups = new Map();
    this.Commands = [new Map()];
    this.DefCmdPrefix = defCmdPrefix;
    readDirectory(this, cmdFolderPath);
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
    console.log(`Command Loaded: ${(group) ? `${group} - ${cmdName}` : `${cmdName}`}`);
  }
  get(cmdName, cmdGroup) {
    var groupIndex = this.Groups.get(cmdGroup);
    if(!groupIndex) groupIndex = 0;
    var cmd = this.Commands[groupIndex].get(cmdName);
    return cmd;
  }
  checkGroup(group) {
    return this.Groups.has(group);
  }
}

module.exports = Commands;

function readDirectory(listObj, dirPath, group) {
  const FileSystem = require('fs');
  const Path = require('path');
  FileSystem.readdir(dirPath, function(err, files) {
    if(err) console.error(err);
    else {
      files.forEach(function(file) {
        var filePath = Path.join(dirPath, file);
        if(FileSystem.statSync(filePath).isDirectory()) readDirectory(listObj, filePath, file);
        else {
          var cmd = require(filePath);
          listObj.add(cmd, group);
        }
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
