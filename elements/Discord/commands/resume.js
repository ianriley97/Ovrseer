exports.Config = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.Help = {
  name: 'resume',
  description: 'Resume the currently paused media.',
  usage: 'resume'
};

exports.Run = (app, guild, message, params) => {
  guild.ResumeMedia((msg) => message.reply(msg));
};
