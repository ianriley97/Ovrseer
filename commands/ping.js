exports.config = {
  enabled: true,
  aliases: [],
  permLvl: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};

exports.run = {
  discord: function(params) {
    var message = params['message'];
    message.channel.send('Ping?').then(function(msg) {
      msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
  }
};
