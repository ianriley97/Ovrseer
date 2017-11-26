exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'skip',
  description: 'Vote to skip the current playing media track.',
  usage: 'skip'
};

exports.Run = (app, guild, message, params) => {
  var member = message.member;
  guild.RequestSkip(member.id, member.voiceChannel.members.size, (msg) => {
    message.reply(msg);
  });
};
