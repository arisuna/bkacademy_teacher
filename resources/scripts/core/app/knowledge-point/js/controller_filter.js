/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('KnowledgePointFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppKnowledgePointService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppKnowledgePointService) {

            var filters = {
                grades: [],
                chapter_types: [],
                levels: [],
            };

            $scope.selected_grades = angular.isDefined(filters.grades) ? filters.grades : [];
            $scope.selected_chapter_types = angular.isDefined(filters.chapter_types) ? filters.chapter_types : [];
            $scope.selected_levels = angular.isDefined(filters.levels) ? filters.levels : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    grades: $scope.selected_grades,
                    chapter_types: $scope.selected_chapter_types,
                    levels: $scope.selected_levels,
                };
                $rootScope.$broadcast('knowledge_point_filter_update', filters);
            }
            $scope.$watch('selected_grades', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_chapter_types', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_levels', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
