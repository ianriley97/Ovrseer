exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'join',
  description: 'Makes client join the voice channel of caller or of specified channel in guild.',
  usage: 'join , join <channelId>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    var member = message.member;
    if(params.length == 0) guild.JoinVoiceChannel(member.voiceChannelID, (msg) => message.reply(msg));
    else guild.JoinVoiceChannel(params[0], (msg) => message.reply(msg));
  }
};
