$(function() {
  'use strict';
  console.log('sanity check');

  var urlProduct = 'http://galvanize-student-apis.herokuapp.com/gcommerce/products';
  var productObj = ajaxCall(urlProduct); //create promise object for ajax call

  fullProductList(productObj);//populate products;

  $('#clear-selection').on('click', function() {
    fullProductList(productObj);
  });

  //grab on click from a size link and return only those items that equal that size category
  $('#sort-by-size li a').on('click', function(event){
    event.preventDefault();
    var key = parseInt($(this).attr('value'));
    clearOutputDiv();
    productObj.then(function(products){
      var sortedSize = products.filter(function(index){
        return key === index.size;
      });
      createProductElement(sortedSize);
    });
  });
  // grab on click from a price link and return only those items that are within the twenty dollar range
  $('#sort-by-price li a').on('click', function(event){
    event.preventDefault();
    var key = parseFloat($(this).attr('value'));
    clearOutputDiv();
    productObj.then(function(products){
      var sortedPrice = products.filter(function(index){
        var noDollarSign = index.price.replace('$', '');
        if (key === 80) {
          return (noDollarSign > key);
        }
        else {
          return (noDollarSign <= (key + 20) && noDollarSign > key);
        }
      });
      createProductElement(sortedPrice);
    });
  });
});

//get Ajax Object as a promise
function ajaxCall(url){
  return Promise.resolve($.ajax(url));
}
//create a div element on page per object in array
function createProductElement(productObjArr){
  productObjArr.forEach(function(value){
    $('#product-display').append('<figure class="products float-left bg-info"><img src="assets/' + value.id + '.png" alt="foobar"><div><strong>Rating:</strong> ' + randomStar() + '</div><p class=""> <strong>Description:</strong> ' + value.description + '</p><p class="text-info child"> <strong>Price:</strong> ' + value.price + '</p></figure>');
  });
}
//clear product display div
function clearOutputDiv(){
  $('#product-display').empty();
}

//create full list of products and place on page
function fullProductList(productObj){
  productObj.then(function(products){
    createProductElement(products);
  });
}

function randomStar(){
  var starNumber = Math.floor((Math.random() * 10) + 1)/2;
  var fullStarBar = [];
  console.log(starNumber);

  for (var i = 0; i < 5; i++) {
    if (starNumber > 0.5) {
       fullStarBar.push('<i class="fa fa-star" aria-hidden="true"></i>');
    }
    else if (starNumber === 0.5) {
      fullStarBar.push('<i class="fa fa-star-half-o" aria-hidden="true"></i>');
    }
    else {
      fullStarBar.push('<i class="fa fa-star-o" aria-hidden="true"></i>');
    }
    starNumber--;
  }
    return fullStarBar.toString().replace(/,/g, '');

}
