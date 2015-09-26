var Chain = require("../index.js");

var names = require("./massachusetts.json").names;

var chain = new Chain(3);

chain.push(names);

for (var i = 0; i < 100; i++) {
  var name = chain.generate();
  var exists = (chain.list.indexOf(name) > 0);
  if (!exists) {
    console.log(name);
  }
}
