(function () {
    'use strict';
    App.controller('ConstantListApiController', ['$scope', '$state', '$timeout', '$rootScope', 'WaitingService', 'AppDataService',
        function ($scope, $state, $timeout, $rootScope, WaitingService, AppDataService) {
            $scope.totalItems = 0;
            $scope.items = [];
            $scope.isLoading = false;

            $scope.getList = function () {
                $scope.isLoading = true;
                AppDataService.getConstantList().then(function (res) {
                    if (res.success) {
                        $scope.items = res.data;
                        $scope.totalItems = res.total_items;
                    }
                    $scope.isLoading = false;
                })
            };

            $scope.getList();

            $scope.deleteFn = function (constant, index) {
                WaitingService.questionSimple('Are you sure want DELETE this constant?', function () {
                    AppDataService.deleteConstant(constant.id).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess();
                            $scope.getList();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };

            $scope.editConstantFn = function (constant) {
                $state.go('app.constant.edit', {id: constant.id});
            };
            $scope.synchronizing = false;
            $scope.synchronize = function () {
                WaitingService.questionSimple('Do you want push all updates of Constant and Translation in CLOUD and to all users devices ?', function () {
                    $scope.synchronizing = true;
                    WaitingService.begin();
                    AppDataService.synchronizeConstant().then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('You have synchronized successful');
                        } else {
                            WaitingService.error('Synchronize has been error');
                        }
                        $scope.synchronizing = false;
                    });
                });
            };
        }]);
})();
