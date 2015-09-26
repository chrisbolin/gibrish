var _ = require('lodash');

var DB = function(){};

DB.prototype.add = function(key, value) {
  if (this[key]) {
    this[key].push(value);
  } else {
    this[key] = [value];
  }  
};

DB.prototype.sample = function(key) {
  return _.sample(this[key]);
};

var Chain = function(order){
  this.order = order;
  this.db = new DB();
  this.list = [];
  this.starter = '^';
  this.ender = '$';
};

Chain.prototype.push = function(words) {
  if (typeof words === 'string') {
    words = [words];
  }
  for (var i = words.length - 1; i >= 0; i--) {
    var word = words[i];
    this.list.push(word);
    word = word + '$';

    // add inital
    this.db.add(this.starter, word.substr(0, this.order));

    // add subsequent
    var length = word.length;
    for (var j = 0; j <= length - this.order - 1; j++) {
      var key = word.substr(j, this.order);
      var value = word[j + this.order];
      this.db.add(key, value);
    }
  };
};

Chain.prototype.generate = function() {
  var word = this.db.sample(this.starter);
  for (var i = 100; i >= 0; i--) {
    var tail = word.substr(word.length - this.order, this.order);
    var next = this.db.sample(tail);
    if (next === this.ender || !next) {
      return word;
    } else {
      word = word + next;
    }
  }
  return word;
};

module.exports = Chain;
