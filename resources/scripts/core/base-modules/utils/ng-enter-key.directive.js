(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('ngEnterKey', ngEnterKey);

    function ngEnterKey() {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                var keyCode = event.which || event.keyCode;

                // If enter key is pressed
                if (keyCode === 13) {
                    scope.$apply(function () {
                        // Evaluate the expression
                        scope.$eval(attrs.ngEnterKey);
                    });

                    event.preventDefault();
                }
            });
        };
    }

    angular.module('app.utils').directive('updateOnEnter', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                element.on("keyup", function (ev) {
                    if (ev.keyCode == 13) {
                        ctrl.$commitViewValue();
                        scope.$apply(ctrl.$setTouched);
                    }
                });
            }
        }
    });


})();
