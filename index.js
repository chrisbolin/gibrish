"use strict";

var utils = {
  sample: function(array) {
    return array[
      Math.floor(Math.random() * array.length)
    ];
  },
  extend: function(a, b) {
    if (typeof b === "object") {
      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
    }
    return a;
  },
};

var DB = function(){
  this.store = {};
};

DB.prototype.add = function(key, value) {
  if (this.store.hasOwnProperty(key)) {
    this.store[key].push(value);
  } else {
    this.store[key] = [value];
  }
};

DB.prototype.sample = function(key) {
  return utils.sample(this.store[key]);
};

var Chain = function(options){
  this.db = new DB();
  this.list = [];
  this.starter = "^";
  this.ender = "$";

  // default options
  this.options = utils.extend({
    novel: true,
    maxTries: 10,
    order: 3,
  }, options);
};

Chain.prototype.push = function(words) {
  var order = this.options.order;
  if (typeof words === "string") {
    words = [words];
  }
  for (var i = words.length - 1; i >= 0; i--) {
    var word = words[i];
    if (word.length < order) {
      continue;
    }

    this.list.push(word);
    word = word + "$";

    // add inital
    this.db.add(this.starter, word.substr(0, order));

    // add subsequent
    var length = word.length;
    for (var j = 0; j <= length - order - 1; j++) {
      var key = word.substr(j, order);
      var value = word[j + order];
      this.db.add(key, value);
    }
  }
};

Chain.prototype.check = function(word, options) {
  if (options.novel) {
    if (this.list.indexOf(word) >= 0) {
      return false;
    }
  }
  return true;
};

Chain.prototype.generate = function(options, depth) {
  // use global options.order; generate options.order is irrelevant
  var order = this.options.order;
  options = utils.extend(this.options, options);
  depth = depth || 0;
  if (depth > this.options.maxTries) {
    return null;
  }

  var word = this.db.sample(this.starter);
  for (var i = 100; i >= 0; i--) {
    var tail = word.substr(word.length - order, order);
    var next = this.db.sample(tail);
    if (next === this.ender || !next) {
      if (word[word.length - 1] === this.ender) {
        word = word.slice(0, word.length - 1);
      }
      break;
    } else {
      word = word + next;
    }
  }

  if (this.check(word, options)) {
    return word;
  } else {
    return this.generate(null, depth + 1);
  }
};

module.exports = Chain;
