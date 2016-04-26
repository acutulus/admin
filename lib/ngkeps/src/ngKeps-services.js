angular.module('ngKeps', [])

.filter('keys', function() {
  return function(input) {
    if (!input) {
      return [];
    }
    return Object.keys(input);
  };
});


// add sync to restService and socketService


// finish sync
// test new sync code
// look at sync tree defaults
// make db admin flex and more like database
// make ajax content have contentToFind contentToReplace Animation(start with slide up, down, left, right)
