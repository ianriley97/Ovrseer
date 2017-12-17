exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'resume',
  description: 'Resume the currently paused media.',
  usage: 'resume'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    guild.ResumeMedia((msg) => message.reply(msg));
  }
};
