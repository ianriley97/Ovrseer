class Collection {
  constructor() {
    this.Collection = new Map();
  }
  Keys() {
    return this.Collection.keys();
  }
  Get(key) {
    var val = this.Collection.get(key);
    return val;
  }
  Add(key, value) {
    var val = value;
    this.Collection.set(key, value);
    return val;
  }
  Remove(key) {
    var val = this.Collection.get(key);
    this.Collection.delete(key);
    return val;
  }
}

module.exports = Collection;
