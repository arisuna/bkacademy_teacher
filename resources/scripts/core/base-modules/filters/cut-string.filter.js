/**=========================================================
 * Filter: parseInt
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('cut', cut);

    function cut() {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    //Also remove . and , so its gives a cleaner result.
                    if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    }

    angular
        .module('app.filters')
        .filter('cutShow', cutShow);

    cutShow.$inject = ['$translate', '$compile'];

    function cutShow($translate, $compile) {
        return function (value, wordwise, max, _function, tail) {
            if (!value) return '';
            let currentValue = angular.copy(value);
            max = parseInt(max, 10);
            if (!max) return value;
            if (currentValue.length <= max){
                let label = $translate.instant('LESS_DETAIL_BTN_TEXT');
                return currentValue + (tail || " <a ng-click='_function'>"+ label + "</a>");
            }

            let showMore = function(){
                console.log('abcdef');
            };

            currentValue = currentValue.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    //Also remove . and , so its gives a cleaner result.
                    if (currentValue.charAt(lastspace-1) === '.' || currentValue.charAt(lastspace-1) === ',') {
                        lastspace = lastspace - 1;
                    }
                    currentValue = currentValue.substr(0, lastspace);
                }
            }
            let label = $translate.instant('MORE_DETAIL_BTN_TEXT');
            return currentValue + (tail || $compile("<a ng-click='showMore()'>"+ label + "</a>"));
        };
    }
})();
