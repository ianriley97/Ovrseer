exports.config = {
  enabled: false,
  aliases: [],
  default: false
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};

exports.run = {
  discord: function(message, params, objs) {
    let messagecount = parseInt(params.join(' '));
    message.channel.fetchMessages({
      limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
  }
};
