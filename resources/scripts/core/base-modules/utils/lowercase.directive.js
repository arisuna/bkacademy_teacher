(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('lowerCase', lowerCaseDirective);

    function lowerCaseDirective() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var lowerTextFunction = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var lowerText = inputValue.toLowerCase();
                    if (lowerText !== inputValue) {
                        modelCtrl.$setViewValue(lowerText);
                        modelCtrl.$render();
                    }
                    return lowerText;
                }
                modelCtrl.$parsers.push(lowerTextFunction);
                lowerTextFunction(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    }
})();
