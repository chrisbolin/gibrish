# gibrish

Gibrish generates fake words from real words.

### Install

`npm install gibrish`

### Quick start

```javascript
var Gibrish = require("gibrish");
var g = new Gibrish();

var massachusettsTowns = ["Abington", "Acton", /* etc. */ ];
g.push(massachusettsTowns);

g.generate();
  "Brainfield"
g.generate();
  "Pittleborough"
g.generate();
  "East Barnster"
g.generate();
  "Brewster-by-the-Sea"
```

## Markov chains

Gibrish creates a [Markov chain](https://en.wikipedia.org/wiki/Markov_chain) from input words and uses it to generate gibberish words. Markov chains are made up of _states_ and links between those states. In Gibrish's case, the states are just letter and other characters you'd find in words (like spaces and dashes). A word is built by linking states together. The links are chosen randomly, according to the distribution of links in the training words.

A chain's _order_ (or memory) is the number of states it uses to determine its next state. In Gibrish the default order is 3.

Don't worry; it's really not that scary. For example, here's how the beginning of the gibberish town name "East Barnster" is created from actual [Massachusetts town names](https://en.wikipedia.org/wiki/List_of_municipalities_in_Massachusetts):

1. **"Eas"** - "Eas" is randomly selected as a starting point. It has a length of 3 because the order is 3. "Eas" occurs in a few real Massachusetts towns, like "East Longmeadow", "Eastham", and "Easton."
1. **"East"** - "Eas" is used to determine the next character (note that it is 3-characters long, the order of the chain). In this case, "t" is the only character that occurs after "Eas", so it is chosen.
1. **"East "** - "ast" (again, 3 characters) is used to determine the next character. A space " " was randomly chosen (with a probability of 3/7, if you're curious).

## Gibberish passwords

Creating gibberish words is mainly just for fun. One practical use, however, is to create memorable but [non-dictionary](http://kb.mit.edu/confluence/display/istcontrib/Strong+Passwords#StrongPasswords-BadpasswordsWhatthesystemlooksfor) passwords (especially useful if a system [limits your password length](http://arstechnica.com/security/2013/04/why-your-password-cant-have-symbols-or-be-longer-than-16-characters/)).
