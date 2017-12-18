class HelpMessage {
  constructor(styleText) {
    this.Style = styleText;
    this.Groups = new Map();
    this.Others = [];
  }
  AddToGroup(group, element) {
    var el = this.Groups.get(group);
    if(!el) el = [];
    el.push(element);
    this.Groups.set(group, el);
  }
  AddToOther(element) {
    this.Others.push(element);
  }
  GetMessage() {
    var msg = '';
    this.Groups.forEach((value, key) => {
      msg += (this.Style + '- ' + key + ' -' + this.Style + ' \n');
      value.forEach((el) => {
        msg += ('\t' + el + '\n');
      });
      msg += '\n';
    });
    this.Others.forEach((el) => {
      msg += (el + '\n');
    });
    return msg;
  }
}

module.exports = HelpMessage;
