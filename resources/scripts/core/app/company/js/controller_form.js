/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('CompanyFormController', ['$scope', '$state', '$http', '$stateParams', '$timeout', '$rootScope', '$translate', 'ngDialog', 'urlBase', 'WaitingService', 'AppDataService', 'AppCompanyService', 'AppAddressService',
        function ($scope, $state, $http, $stateParams, $timeout, $rootScope, $translate, ngDialog, urlBase, WaitingService, AppDataService, AppCompanyService, AppAddressService) {
            $scope.isLoading = true;
            $scope.isLoadingAddress = true;
            $scope.isLoadingBanks = true;
            $scope.company = {};
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.saving = false;

            $scope.addresses = [];
            $scope.billAddresses = [];
            $scope.siteAddresses = [];
            $scope.mailAddresses = [];
            $scope.companyStatus = 0;
            $scope.isUnVerify = false;
            $scope.bankAccounts = [];

            $scope.attachmentSelect = [];

            $scope.statuses = [
                {name: 'UNVERIFIED_TEXT', value: -1, color: 'dark-gray', text: 'UNVERIFIED_TEXT'},
                {name: 'PENDING_REQUEST_TEXT', value: 0, color: 'yellow', text: 'PENDING_REQUEST_TEXT'},
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
                            $scope.companyStatus = res.data.status

                            $scope.company.statusSelected = $scope.statuses.find(o => o.value === $scope.company.status)

                            $scope.getListAddress(res.data.id)
                            $scope.getListBanks(res.data.uuid)

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

            $scope.getListAddress = (companyId) => {
                AppAddressService.getAddressList({
                    company_id: companyId
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
                // $event.preventDefault();
                // $event.stopPropagation();
                if ($scope.companyStatus == 0 && $scope.company.status == 1) {
                    $scope.isUnVerify = true
                }

                if ($scope.companyStatus == 1 && (!$scope.company.taxpayer_name || !$scope.company.address || !$scope.company.tax_number)) {
                    let mess = 'VERIFICATION_NOT_ALLOW_TEXT';

                    if (!$scope.company.tax_number) {
                        mess = 'TAX_NUMBER_IS_REQUIRED_TEXT'
                    }
                    if (!$scope.company.address) {
                        mess = 'ADMINISTRATIVE_ADDRESS_IS_REQUIRED_TEXT'
                    }

                    if (!$scope.company.taxpayer_name) {
                        mess = 'TAXPAYER_NAME_IS_REQUIRED_TEXT'
                    }

                    WaitingService.error(mess);
                    $scope.setTab(3)

                    return;
                }

                if ($scope.company.id > 0) {
                    if (!$scope.isUnVerify) {
                        let oldStatus = $scope.company.status;

                        if ($scope.company.status !== $scope.companyStatus) {
                            $scope.company.status = $scope.companyStatus
                        }

                        AppCompanyService.updateCompany($scope.company).then(function (res) {
                            $scope.saving = false;
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.closeThisDialog({company: res});
                            } else {
                                $scope.company.status = oldStatus
                                $scope.company.statusSelected = $scope.statuses.find(o => o.value === oldStatus)
                                WaitingService.error(res.message);
                            }
                        }, (err) => {
                            $scope.saving = false;
                            $scope.company.status = oldStatus
                            $scope.company.statusSelected = $scope.statuses.find(o => o.value === oldStatus)
                            WaitingService.error(err);
                        })

                        return
                    }

                    WaitingService.questionWithInputText('YOU_SHOULD_ENTER_CODE_TO_CONFIRM_ACTION_TEXT', 'ENTER_CODE_TO_CONFIRM_UNVERIFIED_TEXT', null,
                        function (confirmText) {
                            if ($scope.company.status !== $scope.companyStatus) {
                                $scope.company.status = $scope.companyStatus
                            }
                            $scope.company.confirmText = confirmText
                            AppCompanyService.updateCompany($scope.company).then(function (res) {
                                $scope.saving = false;
                                if (res.success) {
                                    WaitingService.popSuccess(res.message);
                                    $scope.isUnVerify = false

                                    $scope.closeThisDialog({company: res});
                                } else {
                                    $scope.company.status = 1
                                    $scope.companyStatus = 0
                                    $scope.isUnVerify = false

                                    WaitingService.error(res.message);
                                }
                            }, (err) => {
                                $scope.company.status = 1
                                $scope.companyStatus = 0
                                $scope.isUnVerify = false

                                $scope.saving = false;
                                WaitingService.error(err);
                            })
                        });
                } else {
                    AppCompanyService.createCompany($scope.company).then(function (res) {
                        $scope.saving = false;

                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({company: res});
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
                            AppCompanyService.deleteCompany(id, confirmText).then(function (res) {
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
                    template: urlBase.tplApp('app', 'company', 'address-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentCompany: ['AppDataService', function (AppDataService) {
                            return $scope.company;
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

                        $scope.getListAddress($scope.company.id);
                    }
                });
            }

            $scope.deleteAddressFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_ADDRESS_TEXT',
                    function (res) {
                        AppAddressService.deleteAddress(id).then(function (res) {
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.getListAddress($scope.company.id);
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
                    template: urlBase.tplApp('app', 'company', 'address-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentCompany: ['AppDataService', function (AppDataService) {
                            return $scope.company;
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

                        $scope.getListAddress($scope.company.id);
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

            $scope.changeStatus = (item, index) => {
                $scope.companyStatus = item.value

                $scope.saveFn()
                // $scope.company.status = item.value
            }

            $scope.selectedAttachment = function () {
                if (angular.isDefined($scope.attachmentSelect) && $scope.attachmentSelect.length > 0) {
                    let attachment_uuids = [];
                    let data = {};
                    data.isAttachFiles = false
                    angular.forEach($scope.attachmentSelect, function (item, index) {
                        attachment_uuids.push(item.media_attachment_uuid);
                    });

                    data.attachment_uuids = attachment_uuids;
                    WaitingService.begin();
                    AppMediaService.copyMultipleAttachments(data).then(function (res) {
                        WaitingService.end();
                        if (res.success) {
                            $scope.$evalAsync(function () {
                                $scope.onSelectItem({items: res.mediaList});
                            });
                            WaitingService.popSuccess('ATTACH_SUCCESS_TEXT');

                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.end();
                        WaitingService.popError(err.message);
                    });
                } else {
                    WaitingService.error('NO_FILE_SELECTED_TEXT');
                }
            }

            $scope.getListBanks = (uuid) => {
                $scope.isLoadingBanks = true

                AppCompanyService.getBankAccounts(uuid).then(
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
                    template: urlBase.tplApp('app', 'company', 'bank-account-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentCompany: ['AppDataService', function (AppDataService) {
                            return $scope.company;
                        }],
                        bank: ['AppDataService', function (AppDataService) {
                            return {};
                        }]
                    },
                    closeByDocument: true,
                    controller: 'BankAccountController'
                });

                $scope.createBankDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.bank) && data.value.bank) {
                        console.log('data.value', data.value);

                        $scope.getListBanks($scope.company.uuid);
                    }
                });
            }

            $scope.editBankAccount = (bank) => {
                $scope.editBankDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'company', 'bank-account-form-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    resolve: {
                        currentCompany: ['AppDataService', function (AppDataService) {
                            return $scope.company;
                        }],
                        bank: ['AppDataService', function (AppDataService) {
                            return bank;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'BankAccountController'
                });

                $scope.editBankDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.bank) && data.value.bank) {
                        console.log('data.value', data.value);

                        $scope.getListBanks($scope.company.uuid);
                    }
                });
            }

            $scope.deleteBankAccount = (uuid) => {
                $scope.saving = true;
                if ($scope.bankAccounts.length == 1 && $scope.company.status == 1) {
                    WaitingService.error('CRM_DELETE_BANK_ACCOUNT_NOT_ALLOWED_TEXT');
                    return;
                }

                WaitingService.questionSimple('QUESTION_DELETE_BANK_ACCOUNT_TEXT', function () {
                    AppCompanyService.removeBankAccount(uuid).then(function (res) {
                        $scope.saving = false;
                        if (res.success) {
                            WaitingService.popSuccess('DATA_DELETE_SUCCESS_TEXT');
                            $scope.getListBanks($scope.company.uuid);
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, (err) => {
                        $scope.saving = false;
                        WaitingService.error(err);
                    })
                })

            }
        }]);

})();