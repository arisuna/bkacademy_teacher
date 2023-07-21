(function () {
    'use strict';

    angular
        .module('app.angular-table')
        .directive('angularTableApi', angularTableApi);

    angularTableApi.$inject = ['$translate', '$http', 'urlBase'];

    function angularTableApi($translate, $http, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                items: '=items',
                table: '=',
                searchInputEnable: '<?',
                addButtonFunction: '&?',
                addButtonEnable: '<?',
                paginationEnable: '<?',
                sortDefaultField: '@?',
                maxHeight: '<?',
                isAjax: '<?',
                isLoading: '<?',
                onReload: '&?',
                totalItems: '<?',
                totalPages: '<?',
                limitPerPage: '<?',
                currentPage: '=',
            },
            templateUrl: urlBase.tplBase('base-modules/angular-table', 'table-api'),
            link: function (scope, element, attrs) {
                if (scope.paginationEnable == true) {
                    if (angular.isDefined(scope.limitPerPage) && _.isNumber(scope.limitPerPage) && scope.limitPerPage > 0) {
                        //nothing to do here
                        scope.itemsPerPage = scope.limitPerPage;
                    } else {
                        scope.itemsPerPage = 10;
                    }
                } else {
                    scope.itemsPerPage = 10000;
                }
            },
            controller: function ($scope, $element, $attrs) {

                //$scope.items = []; // Holds table data
                function init() {
                    $scope.table = {};
                    $scope.table.sort = {
                        column: 'Id',
                        order: 'asc'
                    };
                    $scope.pagedItems = [];
                    $scope.currentPage = 0;
                    $scope.currentPagePlus = 1;
                    $scope.filterText = '';
                    $scope.totalItems = 0;
                    $scope.totalPages = 0;


                    $scope.nextPage = function (pageSize) {
                        if ($scope.table.currentPage < pageSize) {
                            $scope.currentPage++;
                        }
                        $scope.reload();
                    };

                    $scope.setPage = function (n) {
                        $scope.currentPage = n;
                        $scope.table.reload();
                    };


                    $scope.subscribe('angular-table-api-pagination', function (data) {
                        if (angular.isDefined(data.currentPage)) {
                            $scope.setPage(data.currentPage);
                        }
                    });

                    $scope.table.selectedCls = function (column) {
                        if (column == $scope.table.sort.column) {
                            return ('glyphicon glyphicon-sort-by-attributes' + ($scope.table.sort.order === 'asc' ? '-alt' : ''));
                        } else {
                            return 'glyphicon glyphicon-sort';
                        }
                    };

                    $scope.table.reload = function () {
                        if (angular.isFunction($scope.onReload)) {
                            $scope.onReload({
                                params: {
                                    search: $scope.filterText,
                                    page: $scope.currentPage,
                                    sort: $scope.table.sort,
                                    limit: $scope.itemsPerPage
                                }
                            });
                        }
                    };

                    $scope.table.sortBy = function (newSortingOrder) {
                        if ($scope.table.sort.order === 'desc') {

                        }
                        $scope.table.sort.order = $scope.table.sort.order === 'asc' ? 'desc' : 'asc';
                        $scope.table.sort.column = newSortingOrder;
                        if (angular.isFunction($scope.onReload)) {
                            $scope.table.reload();
                        }
                    }

                    $scope.table.search = function (searchText) {
                        if (_.isEmpty(searchText)) {
                            $scope.table.filterText = '';
                        }
                        $scope.table.query = {
                            search: $scope.filterText
                        }
                        $scope.reload();
                    };
                }

                init();

                $scope.resetSearch = function () {
                    $scope.table.filterText = '';
                };


                $scope.search = function () {
                    $scope.onReload({
                        params: {
                            search: $scope.filterText,
                            page: $scope.currentPage,
                            sort: $scope.table.sort
                        }
                    });
                }


                $scope.reload = function () {
                    $scope.onReload({
                        params: {
                            search: $scope.filterText,
                            page: $scope.currentPage,
                        }
                    });
                }

                $scope.addItem = function () {
                    if (angular.isFunction($scope.addButtonFunction)) {
                        $scope.addButtonFunction();
                    }
                };

                $scope.prevPage = function () {
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                    }
                    $scope.reload();
                }

                $scope.reload();

            }
        };
        return directive;
    }

    angular
        .module('app.angular-table')
        .directive('angularTableApiSort', function () {
            return {
                transclude: true,
                scope: {
                    angularTableApiSort: '=',
                    fieldName: '@',
                },
                template: '<a ng-click="onHandleClick()" class="text-gray link-unstyled">' +
                    '<em class="fa fa-sort mr-sm" ng-show="angularTableApiSort.sort.column != fieldName"></em>' +
                    '<em class="fa fa-sort-up mr-sm" ng-show="angularTableApiSort.sort.column == fieldName && angularTableApiSort.sort.order == \'desc\'"></em>' +
                    '<em class="fa fa-sort-down mr-sm" ng-show="angularTableApiSort.sort.column == fieldName && angularTableApiSort.sort.order == \'asc\'"></em>' +
                    '<ng-transclude></ng-transclude>' +
                    '</a>',
                link: function (scope, element, attrs) {
                    scope.onHandleClick = function () {
                        scope.angularTableApiSort.sortBy(scope.fieldName);
                    };
                }
            }
        });
})();

