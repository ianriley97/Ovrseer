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

exports.Run = (app, guild, message, params) => {
  guild.PauseMedia((msg) => message.reply(msg));
};
