(function () {
    'use strict';
    App.controller('ProductFieldGroupIndexController', ['$scope', '$http', '$timeout', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile', 'WaitingService', '$rootScope',
        function ($scope, $http, $timeout, DTOptionsBuilder, DTColumnBuilder, $compile, WaitingService, $rootScope) {

            if ($rootScope.globalSearch === undefined) {
                $rootScope.globalSearch = {};
            }

            if ($rootScope.globalSearch['attribute'] === undefined) {
                $rootScope.globalSearch['attribute'] = {
                    'label': '', 'translation': '', 'language': ''
                };
            }

            $scope.search = {
                'label': $rootScope.globalSearch.attribute.label,
                'translation': $rootScope.globalSearch.attribute.translation,
                'language': $rootScope.globalSearch.attribute.language
            };

            // Match search object to global search
            $rootScope.globalSearch['attribute'] = $scope.search;

            $scope.resetSearch = function () {
                $scope.search.label = '';
                $scope.search.translation = '';
                $scope.search.language = '';
                $rootScope.globalSearch['attribute'] = $scope.search;
                $scope.reloadSearch();
            };
            // --------------


        }]);

})();