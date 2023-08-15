(function () {
    'use strict';
    App.controller('AdminUserListController', ['$scope', '$state', '$timeout', '$rootScope', '$translate', 'WaitingService', 'AppDataService', 'urlBase', 'ngDialog',
        function ($scope, $state, $timeout, $rootScope, $translate, WaitingService, AppDataService, urlBase, ngDialog) {

            $scope.module_name = 'users';

            $scope.column_array = [
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
            $scope.loading = true;
            $scope.items = [];
            $scope.totalPages = 0;
            $scope.totalItems = 0;
            $scope.current = 0;

            $scope.loadingMore = false;
            $scope.isInitialisInitialLoading = false;

            $scope.loadCount = 0;
            $scope.totalPages = 1;
            $scope.currentPage = 0;

            $scope.search = {
                query: null,
                filterConfigId: null,
                isTmp: false,
                orders: {},
            };

            $scope.loadUsers = function () {
                $scope.params = {};
                $scope.params.page = 0;
                $scope.params.query = $scope.search.query;
                $scope.params.limit = 20;
                $scope.params.orders = $scope.search.orders;
                if (!_.isEmpty($scope.sort)) {
                    $scope.params.orders = [$scope.sort];
                }
                $scope.params.filter_config_id = $scope.search.filterConfigId;
                $scope.params.is_tmp = $scope.search.isTmp;


                AppDataService.getAdminUserList($scope.params).then(function (res) {
                    if (res.success) {
                        $scope.items = res.data;
                        $scope.totalPages = res.total_pages;
                        $scope.currentPage = res.current;
                    } else {
                        WaitingService.expire();
                    }
                    $timeout(function () {
                        $scope.loadingMore = false;
                        $scope.isInitialLoading = false;
                    }, 1000)
                }, function () {
                    WaitingService.expire();
                    $timeout(function () {
                        $scope.loadingMore = false;
                        $scope.isInitialLoading = false;
                    }, 1000)
                });
            }

            $scope.loadMore = function () {
                if ($scope.loadingMore === false && $scope.currentPage < $scope.totalPages) {
                    $scope.loadingMore = true;
                    $scope.params = {};
                    $scope.params.limit = 20;
                    $scope.params.page = $scope.currentPage + 1;
                    $scope.params.orders = $scope.search.orders;
                    if (!_.isEmpty($scope.sort)) {
                        $scope.params.orders = [$scope.sort];
                    }
                    $scope.params.filter_config_id = $scope.search.filterConfigId;
                    $scope.params.is_tmp = $scope.search.isTmp;

                    AppDataService.getAdminUserList($scope.params).then(function (res) {
                        if (res.success) {
                            $scope.items = $scope.items.concat(res.data);
                            $scope.totalPages = res.total_pages;
                            $scope.currentPage = res.current;
                        } else {
                            WaitingService.expire();
                        }
                        $timeout(function () {
                            $scope.loadingMore = false;
                            $scope.isInitialLoading = false;
                        }, 1000)
                    }, function () {
                        WaitingService.expire();
                        $timeout(function () {
                            $scope.loadingMore = false;
                            $scope.isInitialLoading = false;
                        }, 1000)
                    });
                }
            };

            $scope.reloadInit = function () {
                $scope.isInitialLoading = true;
                $scope.loadCount = 0;
                $scope.totalPages = 1;
                $scope.currentPage = 1;
                $scope.items = [];
                $scope.loadUsers();
            };

            $scope.reloadInit();

            $scope.subscribe('apply_filter_config_users', function (filterConfigId) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = filterConfigId;
                $scope.search.isTmp = true;
                console.log('Execute filter');
                $scope.reloadInit();
            });

            $scope.subscribe('sort_by_column_and_order_users', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.orders = [data];
                $scope.sort = {};
                $scope.reloadInit();
            });

            $scope.subscribe('text_search_users', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.query = data;
                // GmsFilterConfigService.setFilterQuery($scope.module_name, $scope.currentUser.uuid, data);
                $scope.reloadInit();
            });

            $scope.subscribe('clear_filter_config', function () {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = null;
                $scope.search.isTmp = false;
                $scope.search.orders = {};
                $scope.sort = {};
                $scope.search.query = null;
                $scope.reloadInit();
            });

            $scope.deleteFn = function (user, index) {
                WaitingService.questionSimple('Are you sure want DELETE this user?', function () {
                    AppDataService.deleteAdminUser(user.id).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.reloadInit();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };

            $scope.cloneUserFn = function (user) {
                $state.go('app.admin-user.clone', {id: user.id});
            };

            $scope.openCreateAdminDialog = function () {
                $scope.currentAdmin = {id: 0}
                $scope.createAdminUserDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'admin-user', 'add-admin-user-right-dialog'),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentAdmin: ['AppDataService', function (AppDataService) {
                            return {id: 0};
                        }]
                    },
                    closeByDocument: true,
                    controller: 'AdminUserFormController'
                });

                $scope.createAdminUserDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.adminUser)) {
                        $scope.reLoadUsers();
                    }
                });
            };

            $scope.openEditAdminDialog = function (object) {
                $scope.currentAdmin = object
                $scope.editAdminUserDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'admin-user', 'edit-admin-user-right-dialog'),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentAdmin: ['AppDataService', function (AppDataService) {
                            return $scope.currentAdmin;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'AdminUserFormController'
                });

                $scope.editAdminUserDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.adminUser)) {
                        $scope.reLoadUsers();
                    }
                });
            };

            $scope.reLoadUsers = function () {
                $scope.isInitialLoading = true;
                $scope.loadUsers();
            }

        }]);
})();
