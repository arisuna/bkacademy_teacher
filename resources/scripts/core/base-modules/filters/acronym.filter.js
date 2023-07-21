/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('acronym', acronym);

    function acronym() {
        return filter;

        function filter(input) {
            if (input !== null && !angular.isUndefined(input)) {
                var words = input.split(/\s/);
                var first = words[0];
                if (words.length == 1) {
                    return input;
                } else {
                    return first + ' ' + input
                        .split(/\s/)
                        .reduce((accumulator, word) => accumulator + word.charAt(0), '');
                }
            }
        }
    }
})();
