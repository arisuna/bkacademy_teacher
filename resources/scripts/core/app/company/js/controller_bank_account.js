/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('BankAccountController', ['$scope', '$http', '$stateParams', '$state', '$translate', '$timeout', 'WaitingService', 'AppDataService', 'AppSystem', 'AppCompanyService', 'AppAddressService', 'ngDialog', 'urlBase', 'currentCompany', 'bank',
        function ($scope, $http, $stateParams, $state, $timeout, $translate, WaitingService, AppDataService, AppSystem, AppCompanyService, AppAddressService, ngDialog, urlBase, currentCompany, bank) {
            $scope.isLoading = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.saving = false;
            $scope.company = currentCompany;
            $scope.bank = {
                company_uuid: $scope.company.uuid ? $scope.company.uuid : null,
                object_uuid: $scope.company.uuid ? $scope.company.uuid : null,
                bank_id: null,
                account_name: null,
                bank_name: null,
                bank_code: null,
                currency: null,
                iban: null,
                branch: null,
                bin: null,
                swift_code: null,
                account_number: null
            };

            if (angular.isDefined(bank) && bank && bank.id) {
                $scope.bank = bank
            }

            console.log("currentbank", bank)

            $scope.saveFn = function ($event) {

                console.log("$scope.bank", $scope.bank)

                if ($scope.bank.id > 0) {
                    AppCompanyService.updateAddress($scope.bank).then(function (res) {
                        $scope.saving = false;
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({bank: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, (err) => {
                        $scope.saving = false;
                        WaitingService.error(err);
                    })
                } else {
                    AppCompanyService.createBankAccount($scope.bank).then(function (res) {
                        $scope.saving = false;

                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({bank: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, function (err) {
                        $scope.saving = false;

                        $scope.closeThisDialog();
                        WaitingService.error(err);
                    })
                }

            };

            $scope.changeBank = function (item) {
                console.log("item", item)
                $scope.bank.bank_id = item.id
                $scope.bank.bank_name = item.short_name
                $scope.bank.bank_code = item.code
                $scope.bank.swift_code = item.swift_code
                $scope.bank.bin = item.bin
            }
        }]);

})();