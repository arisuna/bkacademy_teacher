/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.empty-string')
        .filter('emptyString', function() {
            return function(input) {
                if (input) {
                    return input;
                }
                return '-----';
            };
        });
})();
