angular.module('ngKeps')
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text && typeof text === 'string') {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }else if(typeof text === "number"){
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                    return text;
                }else{
                    return undefined;
                }
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});