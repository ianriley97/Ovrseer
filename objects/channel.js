const Group = require('./inheritance/group.js');

class Channel extends Group {
  constructor(channel) {
    super(channel);
  };
}

module.exports = Channel;
