/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('formatNumber', formatNumber);

    function formatNumber() {
        return function (number) {
            number = _.round(number, 0);
            number = number + "";
            number = number.split('').reverse().join('');
            var result = "";
            for (let i = 0; i <= number.length; i += 3) {
                result = result + number.substring(i, i + 3) + ",";
            }
            result = result.split('').reverse().join('');
            if (!isFinite(result.substring(0, 1))) result = result.substring(1, result.length);
            if (!isFinite(result.substring(0, 1))) result = result.substring(1, result.length);

            return result;
        }
    }

})();
