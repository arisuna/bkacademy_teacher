/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('CrmUserFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAclService', 'currentObj',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppAclService, currentObj) {
            $scope.isLoading = true;
            $scope.user = {};
            $scope.canSave = false;

            $scope.canSave = angular.isDefined(currentObj.id) ? AppAclService.validateAction('crm_user', 'edit') : AppAclService.validateAction('crm_user', 'create');

            $scope.getDetailFn = function () {
                let id = angular.isDefined(currentObj.id) ? currentObj.id : 0;
                if (!id) {
                    $scope.isLoading = false;
                    return;
                }

                AppDataService.getCrmUserDetail(id).then(
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
                    AppDataService.updateCrmUser($scope.user).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({data: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        $scope.closeThisDialog();

                        WaitingService.error(err);
                    })
                } else {
                    AppDataService.createCrmUser($scope.user).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({data: res});
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        $scope.closeThisDialog();
                        WaitingService.error(err);
                    })
                }
            }; // End save function

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_CRM_USER_TEXT',
                    function (res) {
                        AppDataService.deleteCrmUser(id).then(function (res) {
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.closeThisDialog({data: id});
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