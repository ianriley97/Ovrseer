const Collection = require('../collection.js');

const Guild = require('./guild.js');
const Channel = require('./channel.js');

class Groups {
  constructor() {
    this.Objects = [];
    this.Groups = [];
    this.Objects.push(Guild);
    this.Groups.push(new Collection());
    this.Objects.push(Channel);
    this.Groups.push(new Collection());
  };
  GetGroup(index, id) {
    var g = this.Groups[index].Get(id);
    return g;
  };
  AddGroup(index, id, group) {
    var g = this.Groups[index].Add(id, new (this.Objects[index])(group));
    return g;
  };
  RemoveGroup(index, id) {
    var g = this.Groups[index].Remove(id);
    return g;
  };
}

var GroupsList = new Groups();
module.exports = GroupsList;
