/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('CompanyFormController', ['$scope', '$http', '$stateParams', '$state', '$translate', '$timeout', 'WaitingService', 'AppDataService', 'AppSystem', 'AppCompanyService', 'AppAddressService',
        function ($scope, $http, $stateParams, $state, $timeout, $translate, WaitingService, AppDataService, AppSystem, AppCompanyService, AppAddressService) {
            $scope.isLoading = true;
            $scope.isLoadingAddress = true;
            $scope.company = {};
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.saving = false;

            $scope.addresses = [];
            $scope.billAddresses = [];
            $scope.siteAddresses = [];
            $scope.mailAddresses = [];

            $scope.statuses = [
                {name: 'UNVERIFIED_TEXT', value: 0, color: 'dark-gray', text: 'UNVERIFIED_TEXT'},
                {name: 'VERIFIED_TEXT', value: 1, color: 'green', text: 'VERIFIED_TEXT'},
            ]

            $scope.getDetailFn = function () {
                console.log("$stateParams.uuid", $stateParams.uuid)
                let uuid = angular.isDefined($stateParams.uuid) ? $stateParams.uuid : 0;
                if (!uuid) {
                    $scope.isLoading = false;
                    return;
                }

                AppCompanyService.getCompanyDetail(uuid).then(
                    function (res) {
                        if (res.success) {
                            $scope.company = res.data;

                            $scope.company.statusSelected = $scope.statuses.find(o => o.value == $scope.company.status)

                            $scope.getListAddress(res.data.id)
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

            $scope.getListAddress = (companyId) => {
                AppAddressService.getAddressList({
                    company_id: companyId
                }).then((res) => {
                    if (res.success) {
                        $scope.addresses = res.data
                    } else {
                        WaitingService.expire();
                    }

                    $timeout(function () {
                        $scope.isLoadingAddress = false;
                    }, 500)

                }, (err) => {
                    WaitingService.expire();
                    $timeout(function () {
                        $scope.isLoadingAddress = false;
                    }, 500)
                });
            };


            $scope.saveFn = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                if ($scope.company.id > 0) {
                    AppCompanyService.updateCompany($scope.company).then(function (res) {
                        $scope.saving = false;
                        $scope.isEditable = false

                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({company: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, (err) => {
                        $scope.saving = false;
                        $scope.isEditable = false

                        WaitingService.error(err);
                    })
                } else {
                    AppCompanyService.createCompany($scope.company).then(function (res) {
                        $scope.saving = false;

                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({company: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, function (err) {
                        $scope.saving = false;

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

            $scope.createAddress = function (type = 1) {
                alert('createAddress')
            }

            $scope.onEditable = ($event) => {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.$evalAsync(function () {
                    $scope.isEditable = !$scope.isEditable
                })
            }

            $scope.changeStatus = (item) => {
                $scope.company.status = item.value
            }
        }]);

})();