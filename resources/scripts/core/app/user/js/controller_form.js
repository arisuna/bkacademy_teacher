/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('EndUserFormController', ['$scope', '$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppAddressService', 'AppSystem', 'AppAclService', 'AppUserService',
        function ($scope, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppAddressService, AppSystem, AppAclService, AppUserService) {
            $scope.page_loading = true;
            $scope.user = {};
            $scope.canSave = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.addresses = [];
            $scope.bankAccounts = [];
            $scope.count_attachment_id_front = 0;
            $scope.count_attachment_id_back = 0;

            $scope.getListAddress = () => {
                AppAddressService.getAddressList({
                    end_user_id: $stateParams.id
                }).then((res) => {
                    if (res.success) {
                        $scope.addresses = res.data;

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

            $scope.statuses = [
                {name: 'UNVERIFIED_TEXT', value: 0, color: 'dark-gray', text: 'UNVERIFIED_TEXT', isSelectable: true},
                {name: 'PENDING_REQUEST_TEXT', value: 1, color: 'yellow', text: 'PENDING_REQUEST_TEXT', isSelectable: true},
                {name: 'VERIFIED_TEXT', value: 2, color: 'green', text: 'VERIFIED_TEXT', isSelectable: true},
                {name: 'CERTIFIED_TEXT', value: 3, color: 'blue', text: 'CERTIFIED_TEXT', isSelectable: false},
            ]

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

                $scope.getListAddress();
                AppUserService.getUserDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.user = res.data;
                            if($scope.user.company_status == 1){
                                $scope.user.statusSelected = $scope.statuses[3];
                            } else {
                                $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                            }

                            $scope.getListBanks(res.data.uuid);
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

            $scope.subscribe('update_attachments', function (data) {
                console.log('update_attachments', data);
                if (angular.isDefined(data.uuid) && angular.isDefined(data.type && angular.isDefined(data.count)) && data.uuid == $scope.user.uuid && data.type == 'user_id_front') {
                   $scope.count_attachment_id_front = data.count;
                }
                if (angular.isDefined(data.uuid) && angular.isDefined(data.type) && angular.isDefined(data.count) && data.uuid == $scope.user.uuid && data.type == 'user_id_back') {
                   $scope.count_attachment_id_back = data.count;
                }
            });

            $scope.setTab = (tabActive) => {
                $scope.tabActive = tabActive;
            }

            $scope.changeStatus = (item, index) => {
                if(item.value == 2){
                    let mess = 'VERIFICATION_NOT_ALLOW_TEXT';
                    console.log($scope.user.verification_status);

                    if (!$scope.user.id_number ) {
                        mess = 'ID_NUMBER_IS_REQUIRED_TEXT';
                        $scope.user.statusSelected = $scope.statuses.find(o => o.value == $scope.user.verification_status)
                        console.log($scope.user.statusSelected);
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        return;
                    }

                    if ($scope.bankAccounts.length == 0 ) {
                        mess = 'BANK_ACCOUNT_IS_REQUIRED_TEXT';
                        $scope.user.statusSelected = $scope.statuses.find(o => o.value == $scope.user.verification_status)
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        return;
                    }

                    if ($scope.count_attachment_id_back == 0 ) {
                        mess = 'ID_CERTIFICATE_BACK_SIDE_IS_REQUIRED_TEXT';
                        $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status)
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        return;
                    }

                    if ($scope.count_attachment_id_front == 0 ) {
                        mess = 'ID_CERTIFICATE_FRONT_SIDE_IS_REQUIRED_TEXT';
                        $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status)
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        return;
                    }

                
                    // $scope.user.verification_status = item.value;
                    $scope.upgradeToLvl2();


                    return;
                } else if(item.value == 0){
                    WaitingService.questionWithInputText('YOU_SHOULD_ENTER_CODE_TO_CONFIRM_ACTION_TEXT', 'ENTER_CODE_TO_CONFIRM_UNVERIFIED_TEXT', null,
                        function (confirmText) {
                            let mess = 'VERIFICATION_NOT_ALLOW_TEXT';
                            if (confirmText != 'unverified') {
                                mess = 'CONFIRM_TEXT_INCORRECT_TEXT';
                                $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                                console.log($scope.user.verification_status, $scope.user.statusSelected);
                                WaitingService.error(mess);
                                return;
                            }
                            // $scope.user.verification_status = item.value;
                            $scope.rejectToLvl2();
                        });
                } else if(item.value == 1){
                    $scope.changeToPending();
                }

            }

            $scope.upgradeToLvl2 = function () {
                $scope.saving = true;
                AppUserService.upgradeToLvl2($scope.user).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.user.lvl = 2;
                        $scope.user.verification_status = 2;
                        // $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    } else {
                        WaitingService.error(res.message);
                    }
                    console.log($scope.user.verification_status);
                    $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    $scope.saving = false;
                }, function (err) {
                    $scope.saving = false;
                    $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    WaitingService.error(err);
                })
            }; 

            $scope.rejectToLvl2 = function () {
                $scope.saving = true;
                AppUserService.rejectToLvl2($scope.user).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.user.verification_status = 0;
                        // $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    } else {
                        WaitingService.error(res.message);
                    }
                    console.log($scope.user.verification_status);
                    $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    $scope.saving = false;
                }, function (err) {
                    $scope.saving = false;
                    $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    WaitingService.error(err);
                })
            };  

            $scope.changeToPending = function () {
                $scope.saving = true;
                AppUserService.changeToPending($scope.user).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.user.verification_status = 1;
                        // $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    } else {
                        WaitingService.error(res.message);
                    }
                    console.log($scope.user.verification_status);
                    $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
                    $scope.saving = false;
                }, function (err) {
                    $scope.saving = false;
                    $scope.user.statusSelected = $scope.statuses.find(o => o.value === $scope.user.verification_status);
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


            $scope.createAddress = function (type = 2) {
                // alert('createAddress')

                $scope.createAddressDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'user', 'address-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentUser: ['AppDataService', function (AppDataService) {
                            return $scope.user;
                        }],
                        type: ['AppDataService', function (AppDataService) {
                            return type;
                        }],
                        address: ['AppDataService', function (AppDataService) {
                            return {};
                        }]
                    },
                    closeByDocument: true,
                    controller: 'UserAddressController'
                });

                $scope.createAddressDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.address) && data.value.address) {
                        console.log('data.value', data.value);

                        $scope.getListAddress($scope.user.id);
                    }
                });
            }

            $scope.deleteAddressFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_ADDRESS_TEXT',
                    function (res) {
                        AppAddressService.deleteAddress(id).then(function (res) {
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.getListAddress($scope.user.id);
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            };

            $scope.editAddressFn = function (address, type = 2) {
                // alert('editAddress')

                $scope.editAddressDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'user', 'address-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentUser: ['AppDataService', function (AppDataService) {
                            return $scope.user;
                        }],
                        type: ['AppDataService', function (AppDataService) {
                            return type;
                        }],
                        address: ['AppDataService', function (AppDataService) {
                            return address;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'UserAddressController'
                });

                $scope.editAddressDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.address) && data.value.address) {
                        console.log('data.value', data.value);

                        $scope.getListAddress($scope.user.id);
                    }
                });
            }

            $scope.getListBanks = (uuid) => {
                $scope.isLoadingBanks = true

                AppUserService.getBankAccounts(uuid).then(
                    function (res) {
                        if (res.success) {
                            $scope.bankAccounts = res.data ? res.data : []
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.isLoadingBanks = false
                    },
                    function (error) {
                        console.log("error", error)
                        $scope.isLoadingBanks = false

                        WaitingService.expire(error);
                    }
                );
            }

            $scope.createBankAccount = () => {

                $scope.createBankDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'user', 'bank-account-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentUser: ['AppDataService', function (AppDataService) {
                            return $scope.user;
                        }],
                        bank: ['AppDataService', function (AppDataService) {
                            return {};
                        }]
                    },
                    closeByDocument: true,
                    controller: 'UserBankAccountController'
                });

                $scope.createBankDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.bank) && data.value.bank) {
                        console.log('data.value', data.value);

                        $scope.getListBanks($scope.user.uuid);
                    }
                });
            }

            $scope.editBankAccount = (bank) => {
                $scope.editBankDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'company', 'bank-account-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentUser: ['AppDataService', function (AppDataService) {
                            return $scope.user;
                        }],
                        bank: ['AppDataService', function (AppDataService) {
                            return bank;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'UserBankAccountController'
                });

                $scope.editBankDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.bank) && data.value.bank) {
                        console.log('data.value', data.value);

                        $scope.getListBanks($scope.user.uuid);
                    }
                });
            }

            $scope.deleteBankAccount = (uuid) => {
                $scope.saving = true;
                if ($scope.bankAccounts.length == 1 && $scope.user.verification_status == 2) {
                    WaitingService.error('CRM_DELETE_BANK_ACCOUNT_OF_USER_NOT_ALLOWED_TEXT');
                    return;
                }
                WaitingService.questionSimple('QUESTION_DELETE_BANK_ACCOUNT_TEXT',
                function (res) {

                    AppUserService.removeBankAccount(uuid).then(function (res) {
                        $scope.saving = false;
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.getListBanks($scope.user.uuid);
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, (err) => {
                        $scope.saving = false;
                        WaitingService.error(err);
                    })
                });

            }
        }]);
})();