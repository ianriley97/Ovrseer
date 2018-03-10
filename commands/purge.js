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
  discord: function(params) {
    let messagecount = parseInt(params.join(' '));
    message.channel.fetchMessages({
      limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
  }
};
