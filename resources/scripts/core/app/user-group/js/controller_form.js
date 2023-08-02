/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('UserGroupFormController', ['$scope', '$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppDataService', 'AppSystem',
        function ($scope, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppDataService, AppSystem) {
            $scope.page_loading = false;
            $scope.user_group = {};
            if (angular.isDefined($scope.ngDialogData) && $scope.ngDialogData.user_group != undefined) {
                $scope.user_group = $scope.ngDialogData.user_group;
            }

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.user_group.id > 0) {
                    AppDataService.updateUserGroup($scope.user_group).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog(res);
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppDataService.createUserGroup($scope.user_group).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.user.list');
                            // });

                            WaitingService.popSuccess(res.message);
                                $scope.closeThisDialog(res);
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
                WaitingService.questionSimple('QUESTION_DELETE_USER_GROUP_TEXT',
                    function (res) {
                        AppDataService.deleteUserGroup(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.user.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                $scope.closeThisDialog(res);
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