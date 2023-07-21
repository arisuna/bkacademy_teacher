/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('sizeUnit', sizeUnit);

    function sizeUnit() {
        return function filter(input) {
            if (input !== null && !angular.isUndefined(input)) {
                if (input == 1) return 'm2';
                if (input == 2) return 'ft2';
            }
            return 'NC';
        }
    }
})();
