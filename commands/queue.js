exports.Config = {
  enabled: true,
  default: false,
  aliases: []
};

exports.Help = {
  name: 'queue',
  description: 'Show the current queue or enqueue a YouTube media track.',
  usage: 'queue , queue <searchstring/videolink>'
};

exports.Run = {
  Discord: (message, params, objs) => {
    var guild = objs.guild;
    message.channel.send(`\`\`\`${guild.GetQueueList()}\`\`\``);
  }
};
