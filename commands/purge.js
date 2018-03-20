exports.config = {
  enabled: false,
  aliases: [],
  permLvl: 0
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};

exports.run = {
  discord: function(cmdParams) {
    var message = cmdParams['message'];
    var params = cmdParams['params'];
    let messageCount = parseInt(params.join(' '));
    message.channel.fetchMessages({
      limit: messageCount
    }).then(messages => message.channel.bulkDelete(messages));
  }
};
