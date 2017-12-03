exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'leave',
  description: 'Makes client leave its current voiceChannel.',
  usage: 'leave'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    guild.LeaveVoiceChannel((msg) => message.reply(msg));
  }
};
