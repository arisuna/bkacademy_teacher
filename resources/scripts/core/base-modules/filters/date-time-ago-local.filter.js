/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('dateTimeAgoParse', dateTimeAgoParse);
    dateTimeAgoParse.$inject = ['Utils', '$filter', 'moment'];

    function dateTimeAgoParse(Utils, $filter, moment) {
        return function (input) {

            let output = input;

            if (angular.isDefined(input) && input != '' && _.isNumber(input) && _.parseInt(input) > 0 && Utils.isUtc(input) == true) {
                output = moment.unix(output).fromNow(true);
                if(_.isString(output)){
                    output = output + ' ago';
                }
            }

            return output;
        }
    }


})();
