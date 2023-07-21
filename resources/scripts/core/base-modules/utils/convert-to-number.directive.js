/**=========================================================
 * Directive: convertToNumber
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.utils')
        .directive('convertToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    if(angular.isString(ngModel)) {
                        ngModel.$parsers.push(function (val) {
                            return val != null ? parseInt(val, 10) : null;
                        });
                        ngModel.$formatters.push(function (val) {
                            return val != null ? '' + val : null;
                        });
                    }
                }
            };
        });
})();
