(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appAddressSelector', appAddressSelector);

    appAddressSelector.$inject = ['Utils', 'urlBase', 'AppAddressService', 'ngDialog'];

    function appAddressSelector(Utils, urlBase, AppAddressService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                addressId: '=ngModel',
                address: '=?',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                companyId: '<?',
                type: '<?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-address-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'ADDRESS_TEXT';
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == null) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == null) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }
                if (angular.isUndefined(scope.address)) {
                    scope.address = null;
                }

                if (angular.isUndefined(scope.subAddressOnly)) {
                    scope.subAddressOnly = false;
                }

                scope.realName = "address_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.addressId > 0) {
                        AppAddressService.getAddressDetail($scope.addressId).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                                $scope.address =  angular.copy(res.data);
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetAddress = function () {
                    $scope.data.selected = angular.copy({id: null, uuid: null});
                    $scope.address = null;
                    $scope.addressId = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.$watch('companyId', function () {
                    if ($scope.address!= null && angular.isDefined($scope.address.company_id) && $scope.address.company_id !=  $scope.companyId) {
                        console.log($scope.address.company_id, $scope.companyId);
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                        $scope.address = null;
                        $scope.addressId = null;
                    }
                });

                $scope.selectAddress = function (selectedAddress) {
                    $scope.data.selected = angular.copy(selectedAddress);
                    $scope.addressId = angular.copy(selectedAddress.id);
                    $scope.address = angular.copy(selectedAddress);
                    if (angular.isDefined($scope.addressId) && $scope.addressId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('addressId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-address-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        resolve: {
                            companyId: ['AppDataService', function (AppDataService) {
                                return $scope.companyId;
                            }],
                            type: ['AppDataService', function (AppDataService) {
                                return $scope.type;
                            }],

                        },
                        controller: ['$scope', '$element', '$timeout', 'AppAddressService', 'Utils', 'companyId', 'type', function ($scope, $element, $timeout, AppAddressService, Utils, companyId, type) {

                            $scope.items = [];
                            $scope.companyId = companyId;
                            $scope.type = type;

                            $scope.totalItems = 0;
                            $scope.totalPages = 0;
                            $scope.currentPage = 0;
                            $scope.totalRestItems = 0;

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    id: null,
                                },
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                            $scope.initSearch = function () {
                                $scope.addresses = [];
                                $scope.currentPage = 0;
                                $scope.totalPages = 0;
                                $scope.isLoading = true;
                                    AppAddressService.getAddressList({
                                        company_id: $scope.companyId,
                                        address_type: $scope.type
                                    }).then(function (res) {
                                        $scope.items = res.data;
                                        $scope.isLoading = false;
                                        $scope.totalItems = res.total_items;
                                        $scope.totalPages = res.total_pages;
                                        $scope.currentPage = res.current;
                                    }, function () {
                                        $scope.isLoading = false;
                                        $scope.items = [];
                                    });
                            }

                            $scope.loadMore = function () {
                                if ($scope.totalPages > $scope.currentPage) {
                                    $scope.isLoadingMore = true;
                                    AppAddressService.getAddressList({
                                        company_id: $scope.companyId,
                                        address_type: $scope.type
                                    }).then(function (res) {
                                        $scope.items = _.concat($scope.items, res.data);
                                        $scope.isLoadingMore = false;
                                        $scope.totalItems = res.total_items;
                                        $scope.totalPages = res.total_pages;
                                        $scope.currentPage = res.current;
                                    }, function () {
                                        $scope.isLoadingMore = false;
                                        $scope.items = [];
                                    });
                                }
                            };

                            $scope.initSearch();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.selectAddress(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
