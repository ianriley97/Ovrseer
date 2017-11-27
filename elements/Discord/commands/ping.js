exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};

exports.Run = (message, params, objs) => {
  message.channel.send('Ping?').then(msg => {
      msg.edit(`Pong! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
  });
};
