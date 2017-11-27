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

exports.Run = (message, params, objs) => {
  var guild = objs.guild;
  guild.ResumeMedia((msg) => message.reply(msg));
};
