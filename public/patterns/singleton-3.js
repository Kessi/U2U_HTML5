function Universe() {
  // the cached instance
  var instance;
  // rewrite the constructor
  Universe = function Universe() {
    return instance;
  };
  // carry over the prototype properties
  Universe.prototype = this;
  // the instance
  instance = new Universe();
  // reset the constructor pointer
  instance.constructor = Universe;
  // all the functionality
  instance.start_time = 0;
  instance.bang = "Big";
  return instance;
}

// testing
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true

// --------------------------------------------------------------------------
// ??
// --------------------------------------------------------------------------

// adding to the prototype
Universe.prototype.nothing = true;
var uni = new Universe();
// again adding to the prototype
// after the initial object is created
Universe.prototype.everything = true;
var uni2 = new Universe();

// only the original prototype was
// linked to the objects

uni.nothing; // true
uni2.nothing; // true
uni.everything; // undefined
uni2.everything; // undefined
// that sounds right:
uni.constructor.name; // "Universe"
// but that's odd:
uni.constructor === Universe; // true