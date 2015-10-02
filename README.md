# gibberish.js

Generate some fake words.

```javascript
var Gibberish = require("gibberish");

// towns in Massachusetts
// en.wikipedia.org/wiki/List_of_municipalities_in_Massachusetts
var towns = [
  "Abington",
  "Acton",
  ...
  "Wrentham",
  "Yarmouth"
];

var gibberish = new Gibberish();
gibberish.push(towns);

for (var i = 0; i < 10; i++) {
  console.log(gibberish.generate());
}
"Brainfield"
"Wester"
"Pittleborough"
"East Barnster"
"Tewksburn"
"Hansfield"
"Southam"
"Brewster-by-the-Sea"
"Arling"
"Linchester"
```
