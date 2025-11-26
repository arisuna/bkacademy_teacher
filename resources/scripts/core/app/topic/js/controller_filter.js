/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('TopicFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppTopicService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppTopicService) {

            var filters = {
                grades: [],
            };

            $scope.selected_grades = angular.isDefined(filters.grades) ? filters.grades : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    grades: $scope.selected_grades,
                };
                $rootScope.$broadcast('topic_filter_update', filters);
            }
            $scope.$watch('selected_grades', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
