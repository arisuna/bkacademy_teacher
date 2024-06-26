/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('ClassroomFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppClassroomService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppClassroomService) {

            var filters = {
                statuses: [],
            };

            $scope.list_statuses = [
                {name: 'UNVERIFIED_TEXT', value: 0, color: 'dark-gray', label: 'UNVERIFIED_TEXT', selected: false},
                {name: 'VERIFIED_TEXT', value: 1, color: 'green', label: 'VERIFIED_TEXT', selected: false},
                {name: 'ARCHIVED_TEXT', value: -1, color: 'red', label: 'ARCHIVED_TEXT', selected: false},
            ];

            $scope.selected_statuses = angular.isDefined(filters.statuses) ? filters.statuses : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    statuses: $scope.selected_statuses,
                };
                $rootScope.$broadcast('classroom_filter_update', filters);
            }

            $scope.$watch('selected_statuses', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
