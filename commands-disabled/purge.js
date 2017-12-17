exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    let messagecount = parseInt(params.join(' '));
    message.channel.fetchMessages({
      limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
  }
};
