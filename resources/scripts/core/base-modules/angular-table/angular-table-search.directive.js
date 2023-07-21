(function () {
    'use strict';

    angular
        .module('app.angular-table')
        .directive('angularTableSearch', angularTableSearch);

    angularTableSearch.$inject = ['$translate', '$http', 'urlBase', 'angularTableService'];

    function angularTableSearch($translate, $http, urlBase, angularTableService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                table: '=',
            },
            templateUrl: urlBase.tplBase('base-modules/angular-table', 'table-search'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.resetSearch = function () {
                    $scope.filterText = '';
                };
                $scope.$watch('table.filterText', function (val) {
                    $scope.table.search(val);
                });
            }
        };
        return directive;
    }

})();
