class CommandManager {
  constructor(cmdFolderPath, cmdPrefix) {
    this.groupCount = 0;
    this.groups = new Map();
    this.commands = [new Map()];
    this.defCmdPrefix = cmdPrefix;
    readDirectory(this, cmdFolderPath);
  }
  add(cmd, group) {
    if(group) cmd.help.group = group;
    var cmdGroup = cmd.help.group;
    var groupIndex = this.groups.get(cmdGroup);
    if(!groupIndex) {
      if(cmdGroup) {
        groupIndex = ++this.groupCount;
        this.groups.set(cmdGroup, groupIndex);
        this.commands.push(new Map());
      }
      else groupIndex = 0;
    }
    var cmdName = cmd.help.name;
    this.commands[groupIndex].set(cmdName, new Command(cmd.config, cmd.help, cmd.run));
    console.log(`Command Loaded: ${(group) ? `${group} - ${cmdName}` : `${cmdName}`}`);
  }
  get(cmdName, cmdGroup) {
    var groupIndex = this.groups.get(cmdGroup);
    if(!groupIndex) groupIndex = 0;
    var cmd = this.commands[groupIndex].get(cmdName);
    return cmd;
  }
  isCmdGroup(group) {
    return this.groups.has(group);
  }
  parseCmd(msg, prefix) {
    var cmdInfo;
    if(msg.startsWith(prefix)) {
      cmdInfo = parseCmd(this, msg, prefix);
      cmdInfo.default = false;
    }
    else if(msg.startsWith(this.defCmdPrefix)) {
      cmdInfo = parseCmd(this, msg, this.defCmdPrefix);
      cmdInfo.default = true;
    }
    return cmdInfo;
  }
  runCmd(cmdParams) {
    var cmd = this.get(cmdParams['command'], cmdParams['group']);
    if(cmd) {
      var exe = cmd.run[cmdParams['label']];
      if(exe && cmd.config.enabled && (cmdParams.default && cmd.config.default) || !cmdParams.default) exe(cmdParams);
    }
  }
}

module.exports = CommandManager;

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

function parseCmd(listObj, str, prefix) {
  var command = str.split(' ')[0].slice(prefix.length);
  var params = str.split(' ').slice(1);
  var group;
  if(listObj.isCmdGroup(command)) {
    group = command;
    command = params[0];
    params = params.slice(1);
  }
  params = params.join(' ').trim();
  var cmd = {
    'command': command,
    'group': group,
    'params': params
  };
  return cmd;
}

class Command {
  constructor(config, help, run) {
    this.config = config;
    this.help = help;
    this.run = run;
  }
}
