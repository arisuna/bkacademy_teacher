/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('WeekFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppLessonService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppLessonService) {

            var filters = {
                grades: [],
                classrooms: [],
                lesson_types: [],
                date: {
                    startDate: null,
                    endDate: null
                },
                weeks: []
            };

            $scope.selected_grades = angular.isDefined(filters.grades) ? filters.grades : [];
            $scope.selected_weeks = angular.isDefined(filters.weeks) ? filters.weeks : [];
            $scope.selected_classrooms = angular.isDefined(filters.classrooms) ? filters.classrooms : [];
            $scope.selected_lesson_types = angular.isDefined(filters.lesson_types) ? filters.lesson_types : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    grades: $scope.selected_grades,
                    classrooms: $scope.selected_classrooms,
                    weeks: $scope.selected_weeks,
                    lesson_types: $scope.selected_lesson_types,
                    date: $scope.date,
                };
                $rootScope.$broadcast('week_filter_update', filters);
            }

            $scope.$watch('selected_weeks', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_grades', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_classrooms', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('selected_lesson_types', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue && !(newValue.length == 0 && oldValue.length == 0)) {
                    $scope.broadcastFilter();
                }
            });
            $scope.$watch('date', function (newValue, oldValue) {
                if (angular.isDefined(newValue) && newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
