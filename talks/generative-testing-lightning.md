# Generative testing

Callum Macrae | @callumacrae

----

# @callumacrae

JavaScript Developer at SamKnows

----

# What is generative testing?

----

## Unit testing

```js
describe('reverse()', function () {
    it('should return reversed string', function () {
        assert.equal(reverse('abc'), 'cba');
        assert.equal(reverse('qwerty'), 'ytrewq');
        assert.equal(reverse('hello'), 'olleh');
    });
});
```

----

## Generative testing

```js
describe('reverse()', function () {
  it('should return reversed string', function () {
    for (var i = 0; i < 100; i++) {
      var string = randomString();
      
      assert.notEqual(reverse(string), string);
      assert.equal(reverse(reverse(string)), string);
    }
  });
});
```

----

# How is generative testing useful?

----

## How is generative testing useful?

```js
describe('reverse()', function () {
  it('should return reversed string', function () {
    for (var i = 0; i < 100; i++) {
      var string = randomString();
      
      assert.notEqual(reverse(string), string);
      assert.equal(reverse(reverse(string)), string);
    }
  });
});
```

- Tests functions against many values, instead of just one or a couple
- Can force your functions to be purer
- Forces you to think about your code

----

# Why isn't everyone doing it?

----

## The disadvantages

- Inconsistent - might not always fail
- Potential performance cost
- Complicated to write

----

# How can I do it in JavaScript?

----

## Generative testing in JavaScript - JSCheck

```js
JSC.test(
    "Less than",
    function (verdict, a, b) {
        return verdict(le(a, b));
    },
    [
        JSC.integer(10),
        JSC.integer(20)
    ],
    function (a, b) {
        if (a < b) {
            return 'lt';
        } else if (a === b) {
            return 'eq';
        } else {
            return 'gt';
        }
    }
);
```

----

## Generative testing in JavaScript - JSVerify

<img src="./images/jsverify-docs.png" style="height: auto; max-width: 80%">

----

## Generative testing in JavaScript - DeityJS

```js
deity('int:0-10', 'int:0-20', function (a, b) {
  var expected;
  
  if (a < b) {
    expected = 'lt';
  } else if (a === b) {
    expected = 'eq'
  } else {
    expected = 'gt';
  }
  
  assert.equal(le(a, b), expected);
});
```

----

## DeityJS - plugins and async

```js
var deity = require('deity');
var randomuser = require('deity-randomuser');

deity.extend(randomuser);

describe('emailValidator()', function () {
  it('should validate emails', function () {
    return deity('randomuser', function (user) {
    
      // Function could be synchronous:
      assert.ok(emailValidator(user.email));
      
      // Or function could return a promise
      return emailValidator(user.email);
      
    });
  });
});
```

----

# Generative testing

- Generative testing automatically tests your functions against a tonne of random values
- It can catch cases that you wouldn't have thought to write unit tests for
- It has disadvantages: it can have a performance cost, and it runs different tests every time
- There are a few libraries available for JavaScript
  - I wrote one! [DeityJS](http://deityjs.com/)

----

# Thanks!

Callum Macrae | @callumacrae
