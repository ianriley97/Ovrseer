exports.config = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};

exports.run = {
  Discord: (message, params, objs) => {
    message.channel.send('Ping?').then(msg => {
      msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
  }
};
