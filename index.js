"use strict";

var _ = require("lodash");

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
  return _.sample(this.store[key]);
};

var Chain = function(order){
  this.order = order;
  this.db = new DB();
  this.list = [];
  this.starter = "^";
  this.ender = "$";
  this.options = {
    novel: true,
  };
};

Chain.prototype.push = function(words) {
  if (typeof words === "string") {
    words = [words];
  }
  for (var i = words.length - 1; i >= 0; i--) {
    var word = words[i];
    this.list.push(word);
    word = word + "$";

    // add inital
    this.db.add(this.starter, word.substr(0, this.order));

    // add subsequent
    var length = word.length;
    for (var j = 0; j <= length - this.order - 1; j++) {
      var key = word.substr(j, this.order);
      var value = word[j + this.order];
      this.db.add(key, value);
    }
  }
};

Chain.prototype.check = function(word) {
  if (this.options.novel) {
    if (this.list.indexOf(word) >= 0) {
      return false;
    }
  }
  return true;
};

Chain.prototype.generate = function() {
  var word = this.db.sample(this.starter);
  for (var i = 100; i >= 0; i--) {
    var tail = word.substr(word.length - this.order, this.order);
    var next = this.db.sample(tail);
    if (next === this.ender || !next) {
      if (word[word.length - 1] === this.ender) {
        return word.slice(0, word.length - 1);
      }
      break;
    } else {
      word = word + next;
    }
  }

  if (this.check(word)) {
    return word;
  } else {
    return this.generate();
  }
};

module.exports = Chain;
