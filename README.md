# Gibrish

Gibrish generates fake words from real words.

### Install

Gibrish is on [npm](https://www.npmjs.com/package/gibrish): `npm install gibrish`

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

# Docs

### `new Gibrish([options])`

Constructs a new gibrish instance. This constructor is the only export of the module:

`var Gibrish = require("gibrish")`

#### Arguments

* `[options]` _(Object)_ - Options for the instance (not required).
* `[options.order=3]` _(Number)_ - The order of the Markov chain. The order is the number of previous characters used to determine the next. Defaults to `3`.
* `[options.novel=true]` _(Boolean)_ - Exclusively generate words that _do not_ exist in the training set. Defaults to `true`.
* `[options.maxTries=10]` _(Number)_ - Number of times `generate()` will retry if its output is not novel. Defaults to `10`.

#### Returns

_Object_: Returns an Gibrish instance.

---

### `gibrish.push(words)`

Add training words to the instance. These words are processed and added to the instance's database for use in `generate()`.

#### Arguments

* `words` _(Array of Strings_ or _String)_ - words to add to the instance. If an Array of Strings is given, each member will be added as a word. If a _String_ is given it will be added as a single word.

#### Returns

_undefined_: Does not return a value.

---

### `gibrish.generate([options])`

Generates a word from instance's database. This method is _not deterministic_, as Gibrish uses a random probabilistic algorithm.

Therefore `generate()` will return `null` if `novel` is truthy and `generate()` has not found a novel word in `maxTries`. This may happen often if `order` is relatively high compared to the training words' average length or if few training words have been added.

#### Arguments

* `[options]` _(Object)_ - Options for generation (not required). These options are identical to those in the `Gibrish` constructor except that `order` is ignored (an instance's order is immutable). Any `generate()` options override those in the constructor.

#### Returns

_String_ or _null_: Returns a generated word or `null` if one could not be created.

# About

## Markov chains

Gibrish creates a [Markov chain](https://en.wikipedia.org/wiki/Markov_chain) from input words and uses it to generate gibberish words. Markov chains are made up of _states_ and links between those states. In Gibrish's case, the states are just letters and other characters you'd find in words (like spaces and dashes). A word is built by linking states together. The links are chosen randomly, according to the distribution of links in the training words.

A chain's _order_ (or memory) is the number of states it uses to determine its next state. In Gibrish the default order is 3.

Don't worry; it's really not that scary. For example, here's how the beginning of the gibberish town name "East Barnster" is created from actual [Massachusetts town names](https://en.wikipedia.org/wiki/List_of_municipalities_in_Massachusetts):

1. **"Eas"** - "Eas" is randomly selected as a starting point. It has a length of 3 because the order is 3. "Eas" was in the training database because it occurred in some of the training words, like "East Longmeadow", and "Eastham."
1. **"East"** - "Eas" is used to determine the next character (note that it is 3-characters long, the order of the chain). In this case, "t" is the only character that occurs after "Eas" in the training data, so it is chosen.
1. **"East "** - "ast" (again, 3 characters) is used to determine the next character. The characters that follow "ast" in the training data are "e", "o", "h", and " "; these are from words like "Lancaster", "Easthampton", "Easton", and "East Brookfield", respectively. In this example, a space " " was randomly chosen (with a probability of 3/7, if you're curious).

## Gibberish passwords

Creating gibberish words is mainly just for fun. One practical use, however, is to create memorable but [non-dictionary](http://kb.mit.edu/confluence/display/istcontrib/Strong+Passwords#StrongPasswords-BadpasswordsWhatthesystemlooksfor) passwords (especially useful if a system [limits your password length](http://arstechnica.com/security/2013/04/why-your-password-cant-have-symbols-or-be-longer-than-16-characters/)). Gibberish words are a nice compromise between real words (easy to type and easy to remember) and random characters (not found in dictionaries and therefore more secure).
