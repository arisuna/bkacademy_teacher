/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.filters')
        .filter('capitalize', capitalize)
        .filter('capitalizeName', capitalizeName);

    function capitalize() {
        return filter;

        function filter(input) {
            if (input !== null && !angular.isUndefined( input )) {
                input = input.toLowerCase();
                return input.substring(0,1).toUpperCase();
            }
        }
    }

    function capitalizeName() {
        return filter;
        function filter(input) {
            if(input && input!= '') {
                var iArray = input.split(' ');
                //console.log(iArray);
                return (!!input) ? input.charAt(0).toUpperCase() + '. ' + iArray[iArray.length - 1] : '';
            }
        }
    }

})();
