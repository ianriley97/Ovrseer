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

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    var member = message.member;
    guild.RequestSkip(member.id, member.voiceChannel.members.size, (msg) => {
      message.reply(msg);
    });
  }
};
