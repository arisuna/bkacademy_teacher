/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.filters')
        .filter('isEmpty', isEmpty);
    function isEmpty() {
        var bar;
        return function (obj) {
            for (bar in obj) {
                if (obj.hasOwnProperty(bar)) {
                    return false;
                }
            }
            return true;
        };
    }



})();
