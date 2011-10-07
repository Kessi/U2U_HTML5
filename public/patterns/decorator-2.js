Decorators = function () {

  var sale = function (price) {
    this.price = price || 100;
    this.decorators_list = [];
  }

  sale.prototype.getPrice = function () {
    var price = this.price;
    var i = 0;
    var max = this.decorators_list.length;
    var name;
    for (i = 0; i < max; i++) {
      name = this.decorators_list[i];
      price = Decorators.Sale.decorators[name].getPrice(price);
    }
    return price;
  }

  sale.decorators = {};

  sale.decorators.tax = {
    getPrice: function (price) {
      return price * 1.21;
    }
  };

  sale.decorators.inPounds = {
    getPrice: function (price) {
      return price.toString() + '£';
    }
  }

  // Let's add functions that does the decorating
  sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
    return this;
  };

  var result = {};

  result.Sale = sale;

  return result;
} ();

var sale = new Decorators.Sale(100); // the price is 100 dollars
sale = sale.decorate('tax'); // add federal tax
sale = sale.decorate('inPounds'); // add provincial tax
var p = sale.getPrice(); // "$112.88"
console.log(p);

