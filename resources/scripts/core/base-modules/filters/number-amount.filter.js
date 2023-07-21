/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('numberAmount', numberAmount);
    numberAmount.$inject = ['Utils', '$filter', 'AppAuthService'];

    function numberAmount(Utils, $filter, AppAuthService) {
        return function (input) {
            let output = input;

            if (angular.isDefined(input) && input !== '' && _.isNumber(input)) {
                output = parseFloat(input).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            }
            return output;
        }
    }


})();
