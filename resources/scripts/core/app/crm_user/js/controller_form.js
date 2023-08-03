/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('CrmUserFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAclService',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppAclService) {
            $scope.page_loading = true;
            $scope.user = {};
            $scope.canSave = false;

            $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('crm_user', 'edit') : AppAclService.validateAction('crm_user', 'create');

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }

                AppDataService.getCrmUserDetail(id).then(
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
                    AppDataService.updateCrmUser($scope.user).then(function (res) {
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
                    AppDataService.createCrmUser($scope.user).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.user.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.crm-user.list');
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                }
            }; // End save function

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_CRM_USER_TEXT',
                    function (res) {
                        AppDataService.deleteCrmUser(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.user.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.crm-user.list');
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