(function () {
    'use strict';

    angular
        .module('app.angular-table')
        .directive('angularTableApiPagination', angularTableApiPagination);

    angularTableApiPagination.$inject = ['$translate', '$http', 'urlBase', 'angularTableService'];

    function angularTableApiPagination($translate, $http, urlBase, angularTableService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                table: '=',
                totalPages: '<?',
                itemsPerPage: '<?',
                totalItems: '<?',
                currentPage: '=',
            },
            templateUrl: urlBase.tplBase('base-modules/angular-table', 'table-api-pagination'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.setPage = function (n) {
                    $scope.publish('angular-table-api-pagination', {currentPage: n});
                };
            }
        };
        return directive;
    }

})();
