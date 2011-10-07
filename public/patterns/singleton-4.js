var Universe;

(function () {
  var instance;
  Universe = function Universe() {
    if (instance) {
      return instance;
    }
    instance = this;
    // all the functionality
    this.start_time = 0;
    this.bang = "Big";
  };
} ());

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
uni.constructor === Universe; // false