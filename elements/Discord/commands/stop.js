exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'stop',
  description: 'Stop the current playing media.',
  usage: 'stop'
};

exports.Run = (message, params, objs) => {
  var guild = objs.guild;
  guild.StopMedia((msg) => message.reply(msg));
  guild.LeaveVoiceChannel((msg) => {});
};
