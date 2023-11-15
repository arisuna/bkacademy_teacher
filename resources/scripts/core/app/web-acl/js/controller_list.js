(function () {
    'use strict';
    App.controller('WebAclListController', ['$scope', '$state', '$timeout', '$rootScope', 'ngDialog', 'urlBase', '$translate', 'WaitingService', 'AppDataService', 'AppWebAclService',
        function ($scope, $state, $timeout, $rootScope, ngDialog, urlBase, $translate, WaitingService, AppDataService, AppWebAclService) {

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

            $scope.loadWebAcls = function () {


                AppWebAclService.getAclLevel1Items().then(function (res) {
                    if (res.success) {
                        $scope.items = res.data;
                        AppWebAclService.setLvl1WebAcls(res.data);
                        // $scope.totalPages = res.total_pages;
                        // $scope.currentPage = res.current;
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

            $scope.reloadInit = function () {
                $scope.isInitialLoading = true;
                $scope.loadCount = 0;
                $scope.totalPages = 1;
                $scope.currentPage = 1;
                $scope.items = [];
                $scope.loadWebAcls();
            };

            $scope.reloadInit();

            $scope.editWebAclFn = function (item) {
                $state.go('app.web-acl.edit', {id: item.id});
            };
        }]);
})();
