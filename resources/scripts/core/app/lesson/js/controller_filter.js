/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('LessonFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppLessonService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppLessonService) {

            var filters = {
                grades: [],
                classrooms: [],
                weeks: []
            };

            $scope.selected_grades = angular.isDefined(filters.grades) ? filters.grades : [];
            $scope.selected_weeks = angular.isDefined(filters.weeks) ? filters.weeks : [];
            $scope.selected_classrooms = angular.isDefined(filters.classrooms) ? filters.classrooms : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    grades: $scope.selected_grades,
                    classrooms: $scope.selected_classrooms,
                    weeks: $scope.selected_weeks,
                };
                $rootScope.$broadcast('lesson_filter_update', filters);
            }

            $scope.$watch('selected_weeks', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_weeks', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_classrooms', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
