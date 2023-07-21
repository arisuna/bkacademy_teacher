(function () {
    'use strict';

    angular
        .module('app.angular-table')
        .directive('angularTable', angularTable);

    angularTable.$inject = ['$translate', '$http', 'urlBase', 'angularTableService', '$timeout'];

    function angularTable($translate, $http, urlBase, angularTableService, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                items: '=items',
                table: '=',
                searchInputEnable: '<?',
                addButtonFunction: '&?',
                refreshButtonFunction: '&?',
                addButtonEnable: '<?',
                refreshButtonEnable: '<?',
                iconButton: '@?',
                textButton: '@?',
                paginationEnable: '<?',
                sortDefaultField: '@?',
                maxHeight: '<?',
                isAjax: '<?',
                onReload: '<?',
                limitPerPage: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/angular-table', 'table'),
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.items;
                });

                if (scope.paginationEnable == true) {
                    scope.limitPerPage = 10;
                } else {
                    scope.limitPerPage = 1000;
                }
            },
            controller: function ($scope, $element, $attrs) {

                //$scope.items = []; // Holds table data
                $scope.table = {}; // Object that will hold an instance of angular-table
                $scope.filterText = '';
                $scope.isSpin = false;

                $scope.resetSearch = function () {
                    $scope.filterText = '';
                };

                // Watches
                $scope.$watch('table.filterText', function (val) {
                    $scope.table.search(val);
                });

                $scope.sortBy = function (name) {
                    return $scope.table.sortBy(name);
                };

                (function init() {
                    angularTableService.createClient($scope.table, $scope.items, $scope.limitPerPage).load();
                }());


                $scope.$watchCollection('items', function () {
                    angularTableService.createClient($scope.table, $scope.items, $scope.limitPerPage).load();
                    if ($scope.sortDefaultField) {
                        $scope.table.sortBy($scope.sortDefaultField);
                    }
                });

                $scope.addItem = function () {
                    if (angular.isFunction($scope.addButtonFunction)) {
                        $scope.addButtonFunction();
                    }
                };

                $scope.refreshItem = function () {
                    $scope.isSpin = true;
                    $timeout(function(){
                        if (angular.isFunction($scope.refreshButtonFunction)) {
                            $scope.refreshButtonFunction();

                            $scope.isSpin = false;
                        }
                    }, 500);

                };

                $scope.sortByAjax = function (newSortingOrder) {
                    if ($scope.isAjax == true) {
                        if ($scope.table.sort.order === 'desc') {

                        }
                        $scope.table.sort.order = $scope.table.sort.order === 'asc' ? 'desc' : 'asc';
                        $scope.table.sort.column = newSortingOrder;
                        if (angular.isFunction($scope.onReload)) {
                            $scope.onReload({sort: $scope.table.sort});
                        }
                    }
                };
            }
        };
        return directive;
    }

})();
