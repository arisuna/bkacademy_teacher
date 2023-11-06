(function () {
    'use strict';
    App.controller('OrderListController', ['$scope', '$state', '$timeout', '$rootScope', '$translate', 'WaitingService', 'AppDataService', 'AppBusinessOrderService',
        function ($scope, $state, $timeout, $rootScope, $translate, WaitingService, AppDataService, AppBusinessOrderService) {
            $scope.params = {
                categories: [],
                brandes: [],
                companies: [],
                years: [],
                options: []
            };
            $scope.isLoadingMore = false;
            $scope.isLoading = true;
            $scope.loadCount = 0;
            $scope.currentPage = 0;
            $scope.items = [];
            $scope.totalPages = 1;
            // $scope.statuses = AppBusinessOrderService.getStatusList();

            $scope.columns = [
                {
                    "name": "created_at",
                    "datatype": "datetime",
                    "label": "",
                    'descending': false,
                    "sortText": $translate.instant("FIRST_CREATED_ORDER_TEXT"),
                },
                {
                    "name": "created_at",
                    "datatype": "datetime",
                    "label": "",
                    'descending': true,
                    "sortText": $translate.instant("LAST_CREATED_ORDER_TEXT")
                },
                {
                    "name": "name",
                    "datatype": "string",
                    "label" : "NAME_TEXT",
                    'descending': false,
                    "sortText" : $translate.instant("ALPHABET_UP_TEXT"),
                },
                {
                    "name": "name",
                    "datatype": "string",
                    "label" : "NAME_TEXT",
                    'descending': true,
                    "sortText" : $translate.instant("ALPHABET_DOWN_TEXT")
                },
            ];

            $scope.sort = {
                column: '',
                descending: undefined
            };

            $scope.loadPage = function () {
                $timeout(function () {
                    $scope.loadItems();
                }, 100);
            };

            $scope.loadItems = function () {
                $scope.items = [];
                $scope.loadCount = 1;
                $scope.currentPage = 0;
                $scope.isLoading = true;
                $scope.initItems();
            };

            $scope.initItems = function () {
                $scope.params.draw = $scope.loadCount;
                $scope.params.length = 20;
                $scope.params.start = ($scope.loadCount - 1) * 20;
                $scope.params.orders = [$scope.sort];
                $scope.params.query = $scope.query;

                AppBusinessOrderService.search($scope.params).then(function (res) {
                    if (res.success) {
                        $scope.items = $scope.loadCount > 1 ? $scope.items.concat(res.data) : res.data;
                        $scope.totalPages = res.total_pages;
                        $scope.currentPage = res.page;

                    } else {
                        WaitingService.expire();
                    }
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                }, function (err) {
                    WaitingService.expire();
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                });
            };

            $scope.loadMore = function () {
                console.log('loadMore');
                if ($scope.isLoadingMore == false){
                    $scope.loadCount += 1;
                    $scope.getListMore();
                }
            };

            $scope.getListMore = function () {
                $scope.params.draw = $scope.loadCount;
                $scope.params.length = 20;
                $scope.params.start = ($scope.loadCount - 1) * 20;
                $scope.params.orders = [$scope.sort];
                $scope.params.query = $scope.query;
                if ($scope.currentPage > 0 && $scope.loadCount <= $scope.totalPages){
                    $scope.isLoadingMore = true;
                }

                //console.log($scope.loadCount);
                if ($scope.loadCount == 1 || $scope.loadCount <= $scope.totalPages) {

                    AppBusinessOrderService.search($scope.params).then(function (res) {
                        if (res.success) {
                            $scope.items = $scope.loadCount > 1 ? $scope.items.concat(res.data) : res.data;
                            $scope.totalPages = res.total_pages;
                            $scope.currentPage = res.page;

                        } else {
                            WaitingService.expire();
                        }
                        $timeout(function () {
                            $scope.isLoadingMore = false;
                            $scope.isLoading = false;
                        }, 1000)
                    }, function (err) {
                        WaitingService.expire();
                        $timeout(function () {
                            $scope.isLoadingMore = false;
                            $scope.isLoading = false;
                        }, 1000)
                    });

                }else{
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                }
            };

            $rootScope.$on('order_filter_update', function (event, data) {
                $scope.isLoading = true;
                $scope.loadCount = 0;
                if (data.categories && data.categories.length) {
                    $scope.params.categories = data.categories
                } else {
                    $scope.params.categories = []
                }
                if (data.brandes && data.brandes.length) {
                    $scope.params.brandes = data.brandes
                } else {
                    $scope.params.brandes = []
                }
                if (data.companies && data.companies.length) {
                    $scope.params.companies = data.companies
                } else {
                    $scope.params.companies = []
                }
                if (data.years && data.years.length) {
                    $scope.params.years = data.years
                } else {
                    $scope.params.years = []
                }
                if (data.options && data.options.length) {
                    $scope.params.options = data.options
                } else {
                    $scope.params.options = []
                }
                $timeout(function () {
                    $scope.items = [];
                    $scope.loadItems();
                }, 1000);
            });

            $scope.sortByColumnAndOrder = function (columnName, isDescending) {
                $scope.sort = {
                    column: columnName.toUpperCase(),
                    descending: isDescending
                };
                $scope.loadItems();
            };

            $scope.clearFilter = function () {
                $scope.query = "";
                $scope.params = {
                    categories: [],
                    brandes: [],
                    companies: [],
                    years: [],
                    options: []
                };
                $scope.sort = {};
                // $scope.publish('clearFilter');
                $scope.loadItems();
            };

            $scope.deleteFn = function (uuid) {
                WaitingService.questionSimple('QUESTION_DELETE_ORDER_TEXT', function () {
                    AppBusinessOrderService.deleteBusinessOrder(uuid).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.loadItems();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };

            $scope.editOrderFn = function (order) {
                $state.go('app.order.edit', {id: order.uuid});
            };

            $scope.loadItems();

            $scope.convertNumber = function(amount){
                return Number(amount).toLocaleString();
            }
        }]);
})();
