/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('EndUserFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAclService', 'AppUserService',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppAclService, AppUserService) {
            $scope.page_loading = true;
            $scope.user = {};
            $scope.canSave = false;
            $scope.isEditable = false;

            $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('end_user', 'edit') : AppAclService.validateAction('end_user', 'create');

            $scope.onEditable = ($event, isEditable) => {
                $scope.$evalAsync(function () {
                    $scope.isEditable = !isEditable
                })
            }

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }

                AppUserService.getUserDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.user = res.data;
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $scope.page_loading = false;
                    },
                    function (error) {
                        WaitingService.expire(error);
                        $scope.page_loading = false;
                    }
                );
            };
            $scope.getDetailFn();

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.user.id > 0) {
                    AppUserService.updateUser($scope.user).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppUserService.createUser($scope.user).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.user.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.user.list');
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                }
            }; // End save function

            $scope.upgradeToLvl2 = function () {
                $scope.saving = true;
                AppUserService.upgradeToLvl2($scope.user).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.user.lvl = 2;
                        $scope.user.verification_status = 2;
                    } else {
                        WaitingService.error(res.message);
                    }
                    $scope.saving = false;
                }, function (err) {
                    WaitingService.error(err);
                })
            }; 

            $scope.rejectToLvl2 = function () {
                $scope.saving = true;
                AppUserService.rejectToLvl2($scope.user).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.user.verification_status = -1;
                    } else {
                        WaitingService.error(res.message);
                    }
                    $scope.saving = false;
                }, function (err) {
                    WaitingService.error(err);
                })
            }; 

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_USER_TEXT',
                    function (res) {
                        AppUserService.deleteUser(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.user.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.user.list');
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