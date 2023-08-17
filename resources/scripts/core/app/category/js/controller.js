(function () {
    'use strict';
    App.controller('CategorySettingController',
        ['$scope', '$http', '$state', '$timeout', 'AppDataService', 'WaitingService', 'AppCategoryService', 'ngDialog', 'urlBase',
            function ($scope, $http, $state, $timeout, AppDataService, WaitingService, AppCategoryService, ngDialog, urlBase) {
                $scope.isLoading = true;
                $scope.isLoadingLevel2 = true;
                $scope.data = {
                    category_selected_level_1: {},
                    category_selected_level_2: {},

                    category_level_1_items: [],
                    category_level_2_items: [],

                    level1ParentId: {id: 0},
                    company_type: null,
                };
                // Get country list

            }]);
})();
