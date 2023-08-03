(function () {
    'use strict';
    App.controller('AclSettingController',
        ['$scope', '$http', '$state', '$timeout', 'AppDataService', 'WaitingService', 'AppAclService', 'ngDialog', 'urlBase',
            function ($scope, $http, $state, $timeout, AppDataService, WaitingService, AppAclService, ngDialog, urlBase) {
                $scope.isLoading = true;
                $scope.isLoadingLevel2 = true;
                $scope.isLoadingLevel3 = true;
                $scope.data = {
                    acl_selected_level_1: {},
                    acl_selected_level_2: {},
                    acl_selected_level_3: {},

                    acl_level_1_items: [],
                    acl_level_2_items: [],
                    acl_level_3_items: [],

                    company_type: null,
                };
                // Get country list
                $scope.getAclLevel1Items = function () {

                };
                $scope.getAclLevel1Items();


                $scope.reloadFn = function () {
                    $scope.getAclLevel1Items();
                }

            }]);
})();
