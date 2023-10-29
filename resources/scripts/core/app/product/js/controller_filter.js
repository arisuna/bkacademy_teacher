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
                categories: [],
                brandes: [],
                companies: [],
                years: [],
                options: []
            };

            $scope.selected_categories = angular.isDefined(filters.categories) ? filters.categories : [];
            $scope.selected_brandes = angular.isDefined(filters.brandes) ? filters.brandes : [];
            $scope.selected_companies = angular.isDefined(filters.companies) ? filters.companies : [];
            $scope.selected_years = angular.isDefined(filters.years) ? filters.years : [];
            $scope.selected_options = angular.isDefined(filters.options) ? filters.options : [];

            $scope.broadcastFilter = function () {
                var filters;
                filters = {
                    categories: $scope.selected_categories,
                    brandes: $scope.selected_brandes,
                    companies: $scope.selected_companies,
                    years: $scope.selected_years,
                    options: $scope.selected_options,
                };
                $rootScope.$broadcast('product_filter_update', filters);
            }

            $scope.$watch('selected_categories', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });

            $scope.$watch('selected_brandes', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });

            $scope.$watch('selected_companies', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });

            $scope.$watch('selected_years', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });

            $scope.$watch('selected_options', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.broadcastFilter();
                }
            });
        }]);

})();
