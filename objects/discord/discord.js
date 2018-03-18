const DiscordJS = require('discord.js');

class DiscordApp {
  constructor(commandList) {
    const Path = require('path');
    this.Commands = commandList;
    this.Client = new DiscordJS.Client({owner:[234921929188966401]});
    require(Path.join(__dirname, '..', '..', 'utility', 'event-loader.js'))(this, __dirname);
    this.Client.login(process.env.DISCORD_BOT_TOKEN);
  }
  runCmd(cmdParams, isDefPrefix) {
    var cmd = this.Commands.get(cmdParams['command'], cmdParams['group']);
    if(cmd) {
      var exec = cmd.run['discord'];
      if(exec && cmd.config.enabled) exec(cmdParams);
    }
  }
  isCmdGroup(group) {
    return this.Commands.checkGroup(group);
  }
  checkForCmdCall(msg, prefix) {
    var cmdInfo;
    if(msg.startsWith(prefix)) {
      cmdInfo = parseCmd(this, msg, prefix);
      cmdInfo.default = false;
    }
    else if(msg.startsWith('>')) {
      cmdInfo = parseCmd(this, msg, prefix);
      cmdInfo.default = true;
    }
    return cmdInfo;
  }
}

module.exports = DiscordApp;

function parseCmd(app, str, prefix) {
  var command = str.split(' ')[0].slice(prefix.length);
  var params = str.split(' ').slice(1);
  var group;
  if(app.isCmdGroup(command)) {
    group = command;
    command = params[0];
    params = params.slice(1);
  }
  params = params.join(' ');
  return {
    'command': command,
    'group': group,
    'params': params
  };
}
