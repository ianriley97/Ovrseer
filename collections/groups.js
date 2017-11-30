const Collection = require('../objects/collection.js');

const Guild = require('../objects/guild.js');
const Channel = require('../objects/channel.js');

class Groups {
  constructor() {
    this.Groups = [];
    this.Groups.push(new Collection()); //Guild
    this.Groups.push(new Collection()); //Channel
  };
  GetGroup(index, id) {
    var g = this.Groups[index].Get(id);
    return g;
  };
  AddGroup(index, id, group) {
    var g = this.Groups[index].Add(id, new Guild(group));
    return g;
  };
  RemoveGroup(index, id) {
    var g = this.Groups[index].Remove(id);
    return g;
  };
}

var GroupsList = new Groups();
module.exports = GroupsList;
