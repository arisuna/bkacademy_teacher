(function () {
    'use strict';
    App.controller('ConstantIndexController', ['$scope', '$http', '$timeout', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile', 'WaitingService', '$rootScope',
        function ($scope, $http, $timeout, DTOptionsBuilder, DTColumnBuilder, $compile, WaitingService, $rootScope) {

            if ($rootScope.globalSearch === undefined) {
                $rootScope.globalSearch = {};
            }

            if ($rootScope.globalSearch['constant'] === undefined) {
                $rootScope.globalSearch['constant'] = {
                    'label': '', 'translation': '', 'language': ''
                };
            }

            $scope.search = {
                'label': $rootScope.globalSearch.constant.label,
                'translation': $rootScope.globalSearch.constant.translation,
                'language': $rootScope.globalSearch.constant.language
            };

            // Match search object to global search
            $rootScope.globalSearch['constant'] = $scope.search;

            $scope.resetSearch = function () {
                $scope.search.label = '';
                $scope.search.translation = '';
                $scope.search.language = '';
                $rootScope.globalSearch['constant'] = $scope.search;
                $scope.reloadSearch();
            };
            // --------------


        }]);

})();