(function () {
    'use strict';

    angular
        .module('app.angular-table')
        .service('angularTableService', function () {
            var configureClient = function ($scope, data, itemsPerPage) {
                init($scope, itemsPerPage);

                $scope.load = function () {
                    if (_.isEmpty($scope.filterText) && (_.isEmpty($scope.filterFields) || $scope.filterFields.length == 0)) {
                        $scope.filteredItems = data;
                    } else {

                        let items = data;
                        let filterObject = {};

                        if ($scope.filterFields.length > 0) {
                            angular.forEach($scope.filterFields, function (filter) {
                                filterObject[filter.field] = filter.value;
                            });
                            if (!_.isEmpty(filterObject)) {
                                items = $filter('filter')(items, filterObject, true);
                            }
                        }

                        let filterText = $scope.filterText.toLowerCase();
                        $scope.currentPage = 0;
                        $scope.filteredItems = items.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(filterText) != -1;
                        });
                    }
                    $scope.groupToPages();
                };

                // Calculates page records
                $scope.groupToPages = function () {
                    $scope.pagedItems = [];
                    let filteredItemsLength = Object.keys($scope.filteredItems).length;
                    for (var i = 0; i < filteredItemsLength; i++) {
                        if (i % $scope.itemsPerPage === 0) {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                        } else {
                            if (angular.isUndefined($scope.pagedItems[Math.floor(i / $scope.itemsPerPage)]) || !angular.isArray($scope.pagedItems[Math.floor(i / $scope.itemsPerPage)])) {
                                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [];
                            }
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                        }
                    }
                };

                $scope.sortBy = function (newSortingOrder) {
                    data = _.sortBy(data, newSortingOrder);

                    if ($scope.sort.order === 'desc') {
                        data = data.reverse();
                    }

                    $scope.sort.order = $scope.sort.order === 'asc' ? 'desc' : 'asc';

                    $scope.sort.column = newSortingOrder;
                    $scope.load();
                };

                $scope.sortByAjax = function (newSortingOrder) {

                }
            };

            function init($scope, itemsPerPage) {
                $scope.sort = {
                    column: 'Id',
                    order: 'asc'
                };
                $scope.gap = 5;
                $scope.filteredItems = [];
                $scope.itemsPerPage = itemsPerPage;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.currentPagePlus = 1;
                $scope.filterText = '';
                $scope.totalItems = 0;
                $scope.totalPages = 0;
                $scope.filteredItemsLength = 0;
                $scope.filterFields = [];

                $scope.prevPage = function () {
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                    }
                };

                $scope.nextPage = function (pageSize) {
                    if ($scope.currentPage < pageSize) {
                        $scope.currentPage++;
                    }
                };

                $scope.setPage = function (n) {
                    $scope.currentPage = n;
                };

                $scope.range = function (size, start, end) {
                    var ret = [];

                    if (size < end) {
                        end = size;
                        start = size - $scope.gap;
                    }
                    for (var i = start; i < end; i++) {
                        if (i >= 0) ret.push(i);
                    }

                    return ret;
                };

                $scope.selectedCls = function (column) {
                    if (column == $scope.sort.column) {
                        return ('glyphicon glyphicon-sort-by-attributes' + ($scope.sort.order === 'asc' ? '-alt' : ''));
                    } else {
                        return 'glyphicon glyphicon-sort';
                    }
                };

                $scope.search = function (searchText) {
                    if (_.isEmpty(searchText)) {
                        $scope.filterText = '';
                    }
                    $scope.load();
                };

                $scope.filter = function (filterFields) {
                    if (_.isEmpty(filterFields)) {
                        $scope.filterFields = [];
                    } else {
                        $scope.filterFields = filterFields;
                    }
                    $scope.load();
                }
            }

            return {
                createClient: function ($scope, data, itemsPerPage) {
                    configureClient($scope, data, itemsPerPage);

                    return $scope;
                }
            };
        });

// AngularJS Table paging directive
    angular
        .module('app.angular-table')
        .directive('angularTablePagination', function () {
            return {
                scope: {
                    angularTablePagination: '='
                },
                template:
                '<div class="row" ng-show="angularTablePagination.filteredItems.length">' +
                '<div class="col-xs-4"><div class="pagination"><div class="mt text-muted">{{ \'TOTAL_TEXT\' | translate }}: {{angularTablePagination.filteredItems.length}} {{ \'ITEMS_TEXT\' | translate }}</div></div></div>' +
                '<div class="col-xs-8 text-right">' +
                '<ul uib-pagination total-items="angularTablePagination.filteredItems.length"\n' +
                '    ng-model="angularTablePagination.currentPagePlus" items-per-page="angularTablePagination.itemsPerPage" \\n\n' +
                '    max-size="6" class="pagination" boundary-links="true" boundary-link-numbers="true" previous-text="&lsaquo;"\n' +
                '    next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" rotate="false"\n' +
                '    ng-change="angularTablePagination.setPage( angularTablePagination.currentPagePlus - 1)"></ul>' +
                '</div>' +
                '</div>'
            };
        });
    angular
        .module('app.angular-table')
        .directive('angularTableSort', function () {
            return {
                transclude: true,
                scope: {
                    angularTableSort: '=',
                    fieldName: '@',
                },
                template: '<a ng-click="onHandleClick()" class="link-unstyled text-dark-blue">' +
                '<em class="fa fa-sort mr-sm" ng-show="angularTableSort.sort.column != fieldName"></em>' +
                '<em class="fa fa-sort-up mr-sm" ng-show="angularTableSort.sort.column == fieldName && angularTableSort.sort.order == \'desc\'"></em>' +
                '<em class="fa fa-sort-down mr-sm" ng-show="angularTableSort.sort.column == fieldName && angularTableSort.sort.order == \'asc\'"></em>' +
                '<ng-transclude></ng-transclude>' +
                '</a>',
                link: function (scope, element, attrs) {
                    scope.onHandleClick = function () {
                        scope.angularTableSort.sortBy(scope.fieldName);
                    };
                }
            }
        });

})();

