/**
 * [format number percent directive]
 * @return {[value]}
 * @created by tung@relotalent.com
 */

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('formatNumberPercent', formatNumberPercent);

    formatNumberPercent.$inject = ['$timeout', '$translate', '$filter', '$browser'];

    function formatNumberPercent($timeout, $translate, $filter, $browser) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {

                var sep = attrs.formatNumberPercent || "\.";
                var model = attrs.ngModel;

                var doReplace = function () {
                    var curValue = element.val();

                    //var rep = new RegExp(sep, 'g');
                    var cleanValue = curValue.replace(/\./g, "");

                    // Create dotted value from clean
                    var x1 = cleanValue + '';
                    var rgx = /(\d{2})(\d+)/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx ,'$1' + sep + '$2');
                    }

                    element.val(x1);

                    scope.$apply(function () {
                        controller.$setViewValue(x1);
                    });
                }


                element.on('keyup', function () {
                    doReplace();
                });

                element.on('blur', function () {
                    doReplace();

                });

                // trigger for existing model values
                $timeout(doReplace, 1);

            }
        }
    }

})();
