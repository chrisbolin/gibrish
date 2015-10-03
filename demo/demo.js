var Gibrish = require("../index.js");

var demo = "massachusetts"; // "england", "massachusetts"
var towns = require("./" + demo + ".json").names;

var gibrish = new Gibrish();

gibrish.push(towns);

for (var i = 0; i < 10; i++) {
  console.log(gibrish.generate());
}
