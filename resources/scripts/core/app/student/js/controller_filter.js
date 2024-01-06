/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('StudentFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppStudentService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppStudentService) {

            var filters = {
                years: [],
            };

            $scope.selected_years = angular.isDefined(filters.years) ? filters.years : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    years: $scope.selected_years,
                };
                $rootScope.$broadcast('student_filter_update', filters);
            }

            $scope.$watch('selected_years', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
