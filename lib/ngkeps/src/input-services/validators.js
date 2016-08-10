'use strict';


angular.module('ngKeps')
.service('validatorService',[
  function(){
    var stringValidation = function(scope){
      scope.errorMsg = false;
      
      if(scope.kepsType.match){
        var regex;
        if(typeof scope.kepsType.match === 'string'){
          regex = new RegExp(scope.kepsType.match);
        }else{
          return;
        }
        console.log(regex.test(scope.data.value));
        if(!regex.test(scope.data.value)){
          if(scope.kepsErrors){scope.kepsErrors.pattern = 'Input does not match pattern';}
          return scope.errorMsg = 'Input does not match pattern';
        }
      }

      if(scope.kepsType.maxlength){
        if(scope.data.value.length > scope.kepsType.maxlength){
          if(scope.kepsErrors){scope.kepsErrors.maxlength = 'Input must be shorter than ' + scope.kepsType.maxlength;}; 
          return scope.errorMsg = 'Input must be shorter than ' + scope.kepsType.maxlength; 
        }
      }

      if(scope.kepsType.minlength){
        if(scope.data.value.length < scope.kepsType.minlength){
           if(scope.kepsErrors){scope.kepsErrors.minlength = 'Input must be longer than ' + scope.kepsType.minlength;}
          return scope.errorMsg = 'Input must be longer than ' + scope.kepsType.minlength;
        }
      }
    };

    var numberValidation = function(scope){
      scope.errorMsg = false;
      if(scope.data.value === undefined){
        scope.errorMsg = "Invalid value";
        if(typeof scope.kepsType.max === 'number') scope.errorMsg += ", value must be less than or equal to " + scope.kepsType.max;
        if(typeof scope.kepsType.min === 'number') scope.errorMsg += ", value must be greater than or equal to " + scope.kepsType.min;
        return scope.errorMsg;
      }else{
        if(typeof scope.kepsType.max === 'number'){
          if(scope.data.value > scope.kepsType.max){
            if(scope.kepsErrors){scope.kepsErrors.max = 'Number must be smaller than '  + scope.kepsType.max;}
            return scope.errorMsg = 'Number must be smaller than '  + scope.kepsType.max;
          }
        }
        if(typeof scope.kepsType.min === 'number'){
          if(scope.data.value < scope.kepsType.min){
            if(scope.kepsErrors){scope.kepsErrors.min = 'Number must be bigger than ' + scope.kepsType.min};
            return scope.errorMsg = 'Number must be bigger than ' + scope.kepsType.min;
          }
        }
      }


    };

    var fileValidation = function(scope, file){
      if(scope.kepsType.hasOwnProperty('filetype')){
        if(file.type !== scope.kepsType.filetype){
          if(scope.kepsErrors){scope.kepsErrors.filetype = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;}
          scope.errorMsg = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;
          scope.$apply();
          return false;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxsize')){
        if(file.size > scope.kepsType.maxsize){
          if(scope.kepsErrors){scope.kepsErrors.maxsize = 'File size too large, max size ' + scope.kepsType.maxsize;}
          scope.errorMsg = 'File size too large, max size ' + scope.kepsType.maxsize;
          scope.$apply();
          return false;
        }
      }
      return true;
    };

    var geopointValidation = function(scope){
      scope.errorMsg = false
      if(scope.kepsType.hasOwnProperty('minlat')){
        if(scope.data.value.lat < scope.kepsType.minlat){
          if(scope.kepsErrors){scope.kepsErrors.minlat = 'Latitude must be greater than ', scope.kepsType.minlat;}
          return scope.errorMsg = 'Latitude must be greater than ' + scope.kepsType.minlat;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxlat')){
        if(scope.data.value.lat > scope.kepsType.maxlat){
          if(scope.kepsErrors){scope.kepsErrors.maxlat = 'Latitude must be less than ', scope.kepsType.maxlat;}
          return scope.errorMsg = 'Latitude must be less than ' + scope.kepsType.maxlat;
        }
      }
      if(scope.kepsType.hasOwnProperty('minlng')){
        if(scope.data.value.lng < scope.kepsType.minlng){
          if(scope.kepsErrors){scope.kepsErrors.minlng = 'Longitude must be greater than ', scope.kepsType.minlng;}
          return scope.errorMsg = 'Longitude must be greater than ' + scope.kepsType.minlng;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxlng')){
        if(scope.data.value.lng > scope.kepsType.maxlng){
          if(scope.kepsErrors){scope.kepsErrors.maxlng = 'Latitude must be less than ', scope.kepsType.maxlng;}
          return scope.errorMsg = 'Longitude must be less than ' + scope.kepsType.maxlng;
        }
      }
    };

    var emailValidation = function(scope){
      scope.errorMsg = '';
      var reg = /@/
      if(reg.test(scope.data.value)){

      }else{
        if(scope.kepsErrors){scope.kepsErrors.emailInvalid = 'Invalid email format';}
        return scope.errorMsg = 'Invalid email format';
      }
    };

    var multiValidation = function(scope){
      scope.errorMsg = '';

      if(scope.kepsType.maxpicked || scope.kepsType.minpicked){
        var test = scope.data.value.length > 0 ? scope.data.value.split(',').length : 0;
        if(test > scope.kepsType.maxpicked){
          if(scope.kepsErrors){
            scope.kepsErrors.maxpicked= 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
          }
          return scope.errorMsg = 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
        }
        if(test < scope.kepsType.minpicked){
          if(scope.kepsErrors){
            scope.kepsErrors.maxpicked= 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;
          }
          return scope.errorMsg = 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;

        }
      }
    };

    return {
      stringValidation:stringValidation,
      numberValidation:numberValidation,
      fileValidation:fileValidation,
      geopointValidation:geopointValidation,
      emailValidation:emailValidation,
      multiValidation:multiValidation
    };
  }]);