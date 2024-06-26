(function () {
    'use strict';
    App.controller('CrmUserListController', ['$scope', '$state', '$timeout', '$rootScope', '$translate', 'WaitingService', 'AppDataService', 'ngDialog', 'urlBase',
        function ($scope, $state, $timeout, $rootScope, $translate, WaitingService, AppDataService, ngDialog, urlBase) {
            $scope.params = {
                roles: [],
            };
            $scope.isLoadingMore = false;
            $scope.isLoading = true;
            $scope.loadCount = 0;
            $scope.currentPage = 0;
            $scope.items = [];
            $scope.totalPages = 1;

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
                    "label": "NAME_TEXT",
                    'descending': false,
                    "sortText": $translate.instant("ALPHABET_UP_TEXT"),
                },
                {
                    "name": "name",
                    "datatype": "string",
                    "label": "NAME_TEXT",
                    'descending': true,
                    "sortText": $translate.instant("ALPHABET_DOWN_TEXT")
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

                AppDataService.getCrmUserList($scope.params).then(function (res) {
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
                if ($scope.isLoadingMore == false) {
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
                if ($scope.currentPage > 0 && $scope.loadCount <= $scope.totalPages) {
                    $scope.isLoadingMore = true;
                }

                //console.log($scope.loadCount);
                if ($scope.loadCount == 1 || $scope.loadCount <= $scope.totalPages) {

                    AppDataService.getCrmUserList($scope.params).then(function (res) {
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

                } else {
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                }
            };

            $rootScope.$on('crm_user_filter_update', function (event, data) {
                $scope.isLoading = true;
                $scope.loadCount = 0;

                console.log("data.statuses", data.roles)

                if (data.roles && data.roles.length) {
                    $scope.params.roles = data.roles
                } else {
                    $scope.params.roles = []
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
                $scope.sort = {};
                $scope.publish('clearFilter');
            };

            $scope.deleteFn = function (user, index) {
                WaitingService.questionSimple('QUESTION_DELETE_CRM_USER_TEXT', function () {
                    AppDataService.deleteCrmUser(user.id).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.loadItems();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };

            $scope.editUserFn = function (user) {
                let currentObj = user

                $scope.editDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'crm_user', 'edit.dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentObj: ['AppDataService', function (AppDataService) {
                            return currentObj;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'CrmUserFormController'
                });

                $scope.editDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.data)) {
                        console.log('data.value', data.value);

                        $timeout(function () {
                            $scope.items = [];
                            $scope.loadItems();
                        }, 1000);
                    }
                });
            };

            $scope.createUserFn = function () {
                let currentObj = {id: 0};
                $scope.createDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'crm_user', 'create.dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentObj: ['AppDataService', function (AppDataService) {
                            return currentObj
                        }]
                    },
                    closeByDocument: true,
                    controller: 'CrmUserFormController'
                });

                $scope.createDialog.closePromise.then(function (data) {
                    console.log('data.value', data.value);

                    if (angular.isDefined(data.value.data)) {
                        $timeout(function () {
                            $scope.items = [];
                            $scope.loadItems();
                        }, 500);
                    }
                });
            };

            $scope.loadItems();
        }]);
})();
