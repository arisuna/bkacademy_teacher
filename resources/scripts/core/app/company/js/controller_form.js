/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('CompanyFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppCompanyService', 'currentCompany',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppCompanyService, currentCompany) {
            $scope.isLoading = true;
            $scope.company = {};
            $scope.canSave = true;

            $scope.getDetailFn = function () {
                let id = angular.isDefined(currentCompany.id) ? currentCompany.id : 0;
                if (id == 0) {
                    $scope.isLoading = false;
                    return;
                }

                AppCompanyService.getCompanyDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.company = res.data;
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $scope.isLoading = false;
                    },
                    function (error) {
                        console.log("error", error)
                        WaitingService.expire(error);
                        $scope.isLoading = false;
                    }
                );
            };
            $scope.getDetailFn();

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.company.id > 0) {
                    AppCompanyService.updateCompany($scope.company).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({company: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppCompanyService.createCompany($scope.company).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({company: res.data});
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
                WaitingService.questionSimple('QUESTION_DELETE_COMPANY_TEXT',
                    function (res) {
                        AppCompanyService.deleteCompany(id).then(function (res) {
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $scope.closeThisDialog({company: res.data});
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