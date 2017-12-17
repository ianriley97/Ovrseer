exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'pause',
  description: 'Pause the current playing media.',
  usage: 'pause'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    guild.PauseMedia((msg) => message.reply(msg));
  }
};
