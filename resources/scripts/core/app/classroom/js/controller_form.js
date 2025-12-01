/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('ClassroomFormController', ['$scope', '$state', '$http', '$stateParams', '$timeout', '$rootScope', '$translate', 'ngDialog', 'urlBase', 'WaitingService', 'AppDataService', 'AppClassroomService', 'AppAddressService',
        function ($scope, $state, $http, $stateParams, $timeout, $rootScope, $translate, ngDialog, urlBase, WaitingService, AppDataService, AppClassroomService, AppAddressService) {
            $scope.isLoading = true;
            $scope.isLoadingAddress = true;
            $scope.isLoadingBanks = true;
            $scope.classroom = {};
            $scope.isEditable = false;
            $scope.tabActive = 2;
            $scope.saving = false;

            $scope.addresses = [];
            $scope.billAddresses = [];
            $scope.siteAddresses = [];
            $scope.mailAddresses = [];
            $scope.classroomStatus = 0;
            $scope.isUnVerify = false;
            $scope.bankAccounts = [];

            $scope.attachmentSelect = [];

            $scope.statuses = [
                {name: 'UNVERIFIED_TEXT', value: -1, color: 'dark-gray', text: 'UNVERIFIED_TEXT'},
                {name: 'PENDING_REQUEST_TEXT', value: 0, color: 'yellow', text: 'PENDING_REQUEST_TEXT'},
                {name: 'VERIFIED_TEXT', value: 1, color: 'green', text: 'VERIFIED_TEXT'},
            ]

            $scope.getDetailFn = function () {
                let uuid = angular.isDefined($stateParams.uuid) ? $stateParams.uuid : 0;
                if (!uuid) {
                    $scope.isLoading = false;
                    return;
                }

                AppClassroomService.getClassroomDetail(uuid).then(
                    function (res) {
                        if (res.success) {
                            $scope.classroom = res.data;
                            $scope.classroomStatus = res.data.status

                            $scope.classroom.statusSelected = $scope.statuses.find(o => o.value === $scope.classroom.status)

                            // $scope.getListAddress(res.data.id)

                        } else {
                            WaitingService.error(res.message);
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

            $scope.getListAddress = (classroomId) => {
                AppAddressService.getAddressList({
                    classroom_id: classroomId
                }).then((res) => {
                    if (res.success) {
                        $scope.addresses = res.data
                        $scope.billAddresses = res.data.filter(o => o.address_type == 3)
                        $scope.siteAddresses = res.data.filter(o => o.address_type == 2)
                        $scope.mailAddresses = res.data.filter(o => o.address_type == 1)
                        $scope.warehouseAddresses = res.data.filter(o => o.address_type == 4)

                        console.log("mailAddresses", $scope.mailAddresses)
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

                if ($scope.classroom.id > 0) {

                        AppClassroomService.updateClassroom($scope.classroom).then(function (res) {
                            $scope.saving = false;
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.closeThisDialog({classroom: res});
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, (err) => {
                            $scope.saving = false;
                            WaitingService.error(err);
                        })
                } else {
                    AppClassroomService.createClassroom($scope.classroom).then(function (res) {
                        $scope.saving = false;

                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({classroom: res});
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
                WaitingService.questionWithInputText('YOU_SHOULD_ENTER_CODE_TO_CONFIRM_ACTION_TEXT', 'ENTER_CODE_TO_CONFIRM_DELETE_TEXT', null,
                    function (confirmText) {
                        if (confirmText) {
                            AppClassroomService.deleteClassroom(id, confirmText).then(function (res) {
                                if (res.success) {
                                    WaitingService.popSuccess(res.message);
                                    $scope.getDetailFn()
                                } else {
                                    WaitingService.error(res.message);
                                }
                            }, function (err) {
                                WaitingService.error(err);
                            });
                        }
                    });
            };

            $scope.createAddress = function (type = 1) {
                // alert('createAddress')

                $scope.createAddressDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'classroom', 'address-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentClassroom: ['AppDataService', function (AppDataService) {
                            return $scope.classroom;
                        }],
                        type: ['AppDataService', function (AppDataService) {
                            return type;
                        }],
                        address: ['AppDataService', function (AppDataService) {
                            return {};
                        }]
                    },
                    closeByDocument: true,
                    controller: 'AddressController'
                });

                $scope.createAddressDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.address) && data.value.address) {
                        console.log('data.value', data.value);

                        $scope.getListAddress($scope.classroom.id);
                    }
                });
            }

            $scope.deleteAddressFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_ADDRESS_TEXT',
                    function (res) {
                        AppAddressService.deleteAddress(id).then(function (res) {
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.getListAddress($scope.classroom.id);
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            };

            $scope.editAddressFn = function (address, type = 1) {
                // alert('editAddress')

                $scope.editAddressDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'classroom', 'address-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentClassroom: ['AppDataService', function (AppDataService) {
                            return $scope.classroom;
                        }],
                        type: ['AppDataService', function (AppDataService) {
                            return type;
                        }],
                        address: ['AppDataService', function (AppDataService) {
                            return address;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'AddressController'
                });

                $scope.editAddressDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.address) && data.value.address) {
                        console.log('data.value', data.value);

                        $scope.getListAddress($scope.classroom.id);
                    }
                });
            }

            $scope.onEditable = ($event, isEditable) => {
                // $event.preventDefault();
                // $event.stopPropagation();
                $scope.$evalAsync(function () {
                    $scope.isEditable = !isEditable
                })
            }

            $scope.setTab = (tabActive) => {
                $scope.tabActive = tabActive
            }
        }]);

})();