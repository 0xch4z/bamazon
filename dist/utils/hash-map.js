"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class HashMap extends Map {
  constructor(array) {
    super();
    const keys = array.map(a => a.name);
    array.forEach((el, index) => {
      this.set(keys[index], el);
    });
  }

  get $keys() {
    return Array.from(this.keys());
  }

  get $values() {
    return Array.from(this.values());
  }
}
exports.default = HashMap;