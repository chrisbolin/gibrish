# gibrish

Gibrish generates fake words from real words.

```javascript
var Gibrish = require("gibrish");
var g = new Gibrish();

g.push(massachusettsTowns);
// massachusettsTowns = ["Abington", "Acton", ... ]

g.generate();
  "Brainfield"
g.generate();
  "Pittleborough"
g.generate();
  "East Barnster"
g.generate();
  "Brewster-by-the-Sea"
```
