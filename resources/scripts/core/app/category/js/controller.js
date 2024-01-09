(function () {
    'use strict';
    App.controller('CategorySettingController',
        ['$scope', '$http', '$state', '$rootScope', '$timeout', 'AppDataService', 'WaitingService', 'AppCategoryService', 'ngDialog', 'urlBase',
            function ($scope, $http, $state, $rootScope, $timeout, AppDataService, WaitingService, AppCategoryService, ngDialog, urlBase) {

                var filters = {
                    grades: [],
                };
    
                $scope.selected_grades = angular.isDefined(filters.grades) ? filters.grades : [];
    
                $scope.broadcastFilter = function () {
                    var filters;
                    filters = {
                        grades: $scope.selected_grades,
                    };
                    $rootScope.$broadcast('grade_filter_update', filters);
                }
    
                $scope.$watch('selected_grades', function (newValue, oldValue) {
                    if (angular.isDefined(newValue) && newValue !== oldValue) {
                        $scope.broadcastFilter();
                    }
                });

                $scope.isLoading = true;
                $scope.isLoadingLevel2 = true;
                $scope.data = {
                    category_selected_level_1: {},
                    category_selected_level_2: {},
                    category_selected_level_3: {},

                    category_level_1_items: [],
                    category_level_2_items: [],
                    category_level_3_items: [],

                    level1ParentId: {id: 0},
                    grades: null,
                };
                $rootScope.$on('grade_filter_update', function (event, data) {
                    $scope.isLoading = true;
                    $scope.loadCount = 0;
                    if (data.grades && data.grades.length) {
                        $scope.data.grades = data.grades
                    } else {
                        $scope.data.grades = []
                    }
                });

            }]);
})();
