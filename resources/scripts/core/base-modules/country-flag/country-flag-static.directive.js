/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.country-flag')
        .directive('countryFlagStatic', countryFlagStatic);

    countryFlagStatic.$inject = ['urlBase'];

    function countryFlagStatic(urlBase) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                size: '<',
                countryCode: '@',
                squared: '<',
                circle: '<',
                border: '<'
            },
            templateUrl: urlBase.tplBase('base-modules/country-flag', 'country-flag'),
            controller: function ($scope, $timeout) {
                $scope.countryCode = $scope.countryCode || '';
                $scope.height = $scope.height || $scope.width || 100;
                $scope.countryFlagClass = 'flag-icon-' + $scope.countryCode.toLowerCase();
                $scope.size = $scope.size || 100;
                $scope.width = $scope.size;
                $scope.height = $scope.circle ? $scope.size : ($scope.size / 4) * 3;

                $scope.styles = {
                    width: $scope.width + 'px',
                    height: $scope.height + 'px',
                    'border-radius': $scope.circle ? '50%' : '0',
                };
                $scope.classes = {
                    'flag-icon-squared': $scope.squared || $scope.circle,
                    [$scope.countryFlagClass.toLowerCase()]: true,
                };
            }
        };

        return directive;
    }

})();
