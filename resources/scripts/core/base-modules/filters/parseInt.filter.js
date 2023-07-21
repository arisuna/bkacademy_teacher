/**=========================================================
 * Filter: parseInt
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('parseInt', parseInt);

    function parseInt() {
        return function (number) {
            if (!number) {
                return false;
            }
            return parseInt(number);
        };
    }
})();
