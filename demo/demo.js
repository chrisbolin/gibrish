var Chain = require("../index.js");

var demo = "massachusetts"; // "england", "massachusetts"
var words = require("./" + demo + ".json").names;

var chain = new Chain();

chain.push(words);

for (var i = 0; i < 100; i++) {
  var name = chain.generate();
  console.log(name);
}
