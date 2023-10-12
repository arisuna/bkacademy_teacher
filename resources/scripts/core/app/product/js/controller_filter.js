/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('ProductFilter', ['$scope', '$http', '$state', '$window',
        '$translate', '$stateParams', '$filter', '$timeout', 'urlBase',
        '$rootScope', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppProductService',
        function ($scope, $http, $state, $window,
                  $translate, $stateParams, $filter, $timeout, urlBase,
                  $rootScope, ngDialog, WaitingService, AppDataService, AppSystem, AppProductService) {

            var filters = {
                roles: [],
            };

            $scope.list_roles = AppSystem.getSettingProductGroups();

            $scope.selected_roles = angular.isDefined(filters.roles) ? filters.roles : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    roles: $scope.selected_roles,
                };
                $rootScope.$broadcast('product_filter_update', filters);
            }

            $scope.$watch('selected_roles', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
