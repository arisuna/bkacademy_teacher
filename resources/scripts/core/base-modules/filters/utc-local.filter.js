/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('utcLocalDate', utcLocalDate);
    utcLocalDate.$inject = ['Utils', '$filter', 'AppAuthService'];

    function utcLocalDate(Utils, $filter, AppAuthService) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();
            let output = input;

            if (angular.isDefined(input) && input != '' && _.isNumber(input) && _.parseInt(input) > 0 && Utils.isUtc(input) == true) {
                output = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($filter('amFromUnix')(input))), settingFormat);
            }
            return output;
        }
    }


})();
