/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('UserAddressController', ['$scope', '$http', '$stateParams', '$state', '$translate', '$timeout', 'WaitingService', 'AppDataService', 'AppSystem', 'AppCompanyService', 'AppAddressService', 'ngDialog', 'urlBase', 'currentUser', 'type', 'address',
        function ($scope, $http, $stateParams, $state, $timeout, $translate, WaitingService, AppDataService, AppSystem, AppCompanyService, AppAddressService, ngDialog, urlBase, currentUser, type, address) {
            $scope.isLoading = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.saving = false;
            $scope.user = currentUser;
            $scope.address = {
                end_user_id: $scope.user.id ? $scope.user.id : null,
                vn_district_id: null,
                vn_ward_id: null,
                vn_province_id: null,
                name: '',
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
                address_type: type ? (type) : null,
                country_id: null,
            };

            if (angular.isDefined(address) && address && address.id) {
                $scope.address = address
            }

            console.log("currentCompany", address)

            $scope.saveFn = function ($event) {
                // $event.preventDefault();
                // $event.stopPropagation();

                console.log("$scope.address", $scope.address)

                if (!$scope.address.name && !$scope.address.vn_province_id || !$scope.address.vn_district_id || !$scope.address.vn_ward_id) {
                    WaitingService.error('PLEASE_SELECT_AND_FILL_FIELDS_REQUIRED_TEXT');
                    return;
                }

                if ($scope.address.id > 0) {
                    AppAddressService.updateAddress($scope.address).then(function (res) {
                        $scope.saving = false;
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({address: res.data});
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

            $scope.ngChangeProvince = function (item) {
                console.log("item", item.name)

                $scope.address.vn_province_id = item.id
                $scope.address.province_name = item.name
            }

            $scope.ngChangeCountry = function (item) {
                console.log("item", item.name)

                $scope.address.country_id = item.id
                $scope.address.country = item.name
            }

            $scope.ngChangeDistrict = function (item) {
                console.log("item", item)
                $scope.address.vn_district_id = item.id
                $scope.address.district_name = item.name
            }

            $scope.ngChangeWard = function (item) {
                console.log("item", item)
                $scope.address.vn_ward_id = item.id
                $scope.address.ward_name = item.name
            }
        }]);

})();