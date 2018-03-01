exports.config = {
  enabled: true,
  aliases: [],
  default: true
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};

exports.run = {
  discord: function(message, params, objs) {
    message.channel.send('Ping?').then(msg => {
      msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
  }
};
