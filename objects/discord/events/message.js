module.exports = function(app, args) { // args = [message]
  var client = app.Client;
  var message = args[0];
  if(message.author.bot) return;
  if(isCmdCall(app, message.content, '>')) {

  }
};

function parseMsg(content) {

}

function isCmdCall(app, content, prefix) {
  if (!content.startsWith(prefix)) {
    prefix = process.env.DEFAULT_CMD_PREFIX;
    if (!content.startsWith(prefix)) return;
  }
  var command = content.split(' ')[0].slice(prefix.length);
  var params = content.split(' ').slice(1);
}
