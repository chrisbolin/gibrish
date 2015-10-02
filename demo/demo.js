var Gibberish = require("../index.js");

var demo = "massachusetts"; // "england", "massachusetts"
var towns = require("./" + demo + ".json").names;

var gibberish = new Gibberish();

gibberish.push(towns);

for (var i = 0; i < 10; i++) {
  console.log(gibberish.generate());
}
