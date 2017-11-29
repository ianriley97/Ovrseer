const TMIJS = require('tmi.js');
const Log = require('../../../utility/logger.js');

const Command = require('../../Objects/command.js');
const Channel = require('./channel.js');

class TwitchClient {
  constructor() {
    this.Client = new TMIJS.client({identity:{username:process.env.TWITCH_BOT_NAME,password: process.env.TWITCH_KEY},channels:[process.env.TWITCH_CHANNELS]});
    this.Commands = new Map();
    this.Channels = new Map();
    require('../utility/commandLoader.js')(this);
    require('../utility/channelLoader.js')(this);
    require('../utility/eventLoader.js')(this);
    this.Client.connect();
  };
  GetCommand(cmdStr) {
    var foundCmd;
    this.Commands.forEach((value, key, thisMap) => {
      if(key == cmdStr || HasAlias(value, cmdStr)) {
        foundCmd = value;
        return;
      }
    });
    return foundCmd;
  };
  AddCommand(cmd) {
    Log.command('Loading command: ' + cmd.Help.name + '...');
    var newCmd = new Command(cmd);
    this.Commands.set(cmd.Help.name, newCmd);
  };
  GetChannel(channel) {
    var foundGuild = this.Channels.get(channel);
    if(!foundGuild) foundGuild = this.AddChannel(channel);
    return foundGuild;
  };
  AddChannel(channel) {
    var newChannel = new Channel(channel);
    this.Channels.set(channel, newChannel);
    Log.default(this.Client.username + " joined the channel \"" + channel + "\".");
    return newChannel;
  };
  RemoveChannel(guild) {
    this.Channels.delete(guild.id);
    Log.default(this.Client.username + " left the channel \"" + channel + "\".");
  };
}

module.exports = TwitchClient;

function HasAlias(cmd, cmdStr) {
  var found = false;
  cmd.Config.aliases.forEach(alias => {
    if(alias == cmdStr) {
      found = true;
      return;
    }
  });
  return found;
}
