exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'pause',
  description: 'Pause the current playing media.',
  usage: 'pause'
};

exports.Run = (message, params, objs) => {
  var guild = objs.guild;
  guild.PauseMedia((msg) => message.reply(msg));
};
