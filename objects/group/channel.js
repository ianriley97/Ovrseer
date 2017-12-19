const Group = require('./group.js');

class Channel extends Group {
  constructor(channel) {
    super(channel, channel, "Channel");
  };
}

module.exports = Channel;
