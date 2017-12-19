class TwitchChannels {
  constructor() {
    this.Channels = [];
  }
  AddChannel(channel) {
    this.Channels.push(channel);
  }
}

const ChannelList = new TwitchChannels();
module.exports = ChannelList;
