/**=========================================================
 * Filter: parseDate
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('timestamp', timestamp);

    function timestamp() {
        return function timestampFn(input) {
            if (input == '' || input == null || input == undefined) {
                return null;
            } else {
                return (Date.parse(input));
            }
        }
    }

    angular
        .module('app.filters')
        .filter('dateF', dateF);
    dateF.$inject = ['$translate', '$filter'];

    function dateF($translate, $filter) {
        return function dateF(input, format) {
            if (input == '' || input == null || input == undefined) {
                return null;
            }
            else {
                return $filter('amDateFormat')($filter('amLocal')($filter('amUtc')(input)), format);
            }
        }
    }

})();
