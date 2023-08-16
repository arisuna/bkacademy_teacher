/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('AdminUserFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'currentAdmin',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, currentAdmin) {
            $scope.isLoading = true;
            $scope.user = {};

            $scope.getDetailFn = function () {
                let id = angular.isDefined(currentAdmin.id) ? currentAdmin.id : 0;
                if (id == 0) {
                    $scope.isLoading = false;
                    return;
                }

                AppDataService.getAdminUserDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.user = res.data;
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $scope.isLoading = false;
                    },
                    function (error) {
                        WaitingService.expire(error);
                        $scope.isLoading = false;
                    }
                );
            };
            $scope.getDetailFn();

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.user.id > 0) {
                    AppDataService.updateAdminUser($scope.user).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({adminUser: res.data});
                        } else {
                            WaitingService.error(res.message, function () {
                                $scope.closeThisDialog();
                            });
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err, function () {
                            $scope.closeThisDialog();
                        });
                    })
                } else {
                    AppDataService.createAdminUser($scope.user).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({adminUser: res.data});
                            // $state.go('app.admin-user.list');
                        } else {
                            WaitingService.error(res.message, function () {
                                $scope.closeThisDialog();
                            });
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err, function () {
                            $scope.closeThisDialog();
                        });
                    })
                }
            }; // End save function

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('Are you sure want DELETE this user?',
                    function (res) {
                        AppDataService.deleteAdminUser(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.admin-user.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.admin-user.list');
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            }; // End delete function

        }]);
})();