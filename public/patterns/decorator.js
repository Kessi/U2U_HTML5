Decorators = function () {

//  this.Sale2 = function (price) {
//    var price = price;

//    return (function () { return { getPrice: function () { return price; } } })();
//  }

  var sale = function (price) {
    this.price = price || 100;
  };

  sale.prototype.getPrice = function () {
    return this.price;
  }

  sale.decorators = {};

  sale.decorators.tax = {
    getPrice: function () {
      return this.uber.getPrice() * 1.21;
    }
  };

  // Let's add functions that does the decorating
  sale.prototype.decorate = function (decorator) {
    var F = function () { };
    var overrides = this.constructor.decorators[decorator];
    var i;
    var newObj;
    F.prototype = this;
    newObj = new F();
    newObj.uber = F.prototype;
    for (i in overrides) {
      if (overrides.hasOwnProperty(i)) {
        newObj[i] = overrides[i];
      }
    }
    return newObj;
  };

  var result = {};

  result.Sale = sale;

  return result;
} ();

Decorators.Sale.decorators.inPounds = {
  getPrice: function () {
    return this.uber.getPrice().toString() + '£';
  }
};

var sale = new Decorators.Sale(100); // the price is 100 dollars
sale = sale.decorate('tax'); // add federal tax
sale = sale.decorate('inPounds'); // add provincial tax
var p = sale.getPrice(); // "121£"
console.log(p);

