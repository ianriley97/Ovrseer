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

exports.Run = (app, guild, message, params) => {
  guild.LeaveVoiceChannel();
};
