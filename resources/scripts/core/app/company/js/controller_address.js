/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('AddressController', ['$scope', '$http', '$stateParams', '$state', '$translate', '$timeout', 'WaitingService', 'AppDataService', 'AppSystem', 'AppCompanyService', 'AppAddressService', 'ngDialog', 'urlBase', 'currentCompany',
        function ($scope, $http, $stateParams, $state, $timeout, $translate, WaitingService, AppDataService, AppSystem, AppCompanyService, AppAddressService, ngDialog, urlBase, currentCompany) {
            $scope.isLoading = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.saving = false;
            $scope.company = currentCompany;
            $scope.address = {
                company_id: $scope.company.id ? $scope.company.id : null,
                vn_district_id: null,
                vn_ward_id: null,
                vn_province_id: null,
                name: null,
                address1: null,
                address2: null,
                latitude: null,
                longitude: null,
                ward_name: null,
                district_name: null,
                province_name: null,
                postal: null,
                city: null,
                country: null,
                telephone: null,
                phone: null,
                is_default: null,
                address_type: null,
                country_id: null,
            };

            console.log("currentCompany", currentCompany)

            $scope.saveFn = function ($event) {
                // $event.preventDefault();
                // $event.stopPropagation();

                if ($scope.address.id > 0) {
                    AppAddressService.updateAddress($scope.address).then(function (res) {
                        $scope.saving = false;
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({company: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, (err) => {
                        $scope.saving = false;
                        WaitingService.error(err);
                    })
                } else {
                    AppAddressService.createAddress($scope.address).then(function (res) {
                        $scope.saving = false;

                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({address: res.data});
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
        }]);

})();