(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appDistrictSelector', appDistrictSelector);

    appDistrictSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', 'AppSystem', '$timeout', 'AppAddressService'];

    function appDistrictSelector(ngDialog, Utils, urlBase, DataService, AppSystem, $timeout, AppAddressService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                districtId: '=ngModel',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                provinceId: '<',
                isEditable: '<?',
                showLabel: '<',
                outputType: '@?', //iso, id
                name: '@',
                type: '@?',
                isCircle: '<?',
                placeholder: '@?',
                toolTipText: '@?',
                removeChange: '&?',
                ngChange: '&?',
                showRemoveLabel: '<?',
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'default-selector-item'),

            link: function (scope, element, attrs) {

                scope.name = 'district';

                if (angular.isUndefined(scope.showLabel) || !scope.showLabel) {
                    scope.showLabel = false;
                    scope.placeholder = 'SELECT_TEXT';
                } else {
                    scope.placeholder = '';
                }

                if (angular.isUndefined(scope.isEditable) || !scope.isEditable) {
                    scope.isEditable = false;
                } else {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || !scope.requiredMessage) {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }

                if (angular.isUndefined(scope.placeholder) || !scope.placeholder) {
                    scope.placeholder = 'SELECT_TEXT';
                }

                if (angular.isUndefined(scope.isCircle)) {
                    scope.isCircle = false;
                }

                if (angular.isUndefined(scope.isMandatory)) {
                    scope.isMandatory = false;
                }

                if (angular.isUndefined(scope.outputType)) {
                    scope.outputType = 'id';
                }

                if (angular.isUndefined(scope.showRemoveLabel)) {
                    scope.showRemoveLabel = true;
                }

            },
            controller: function ($scope, $element, $attrs) {
                $scope.highlight = false;
                $scope.data = {
                    selected: {
                        id: null,
                        name: null,
                    },
                };
                $scope.districts = []

                $scope.initFn = function () {
                    if (!$scope.provinceId){
                        return
                    }
                    AppAddressService.searchDistricts({
                        province_id: $scope.provinceId
                    }).then(function (res) {
                        if (!res.data || res.data.length <= 0) {
                            return;
                        }
                        let district = null;

                        $scope.districts = res.data
                        if (_.isString($scope.districtId) && Utils.isAlphabetic($scope.districtId)) {
                            console.log('is string');
                            district = _.findLast($scope.districts, function (o) {
                                return o.cio == $scope.districtId;
                            });
                        } else if (_.parseInt($scope.districtId) > 0) {
                            console.log('is number');
                            district = _.findLast($scope.districts, function (o) {
                                return o.id == $scope.districtId;
                            });
                        }

                        $scope.data.selected = angular.copy(district);
                    })
                };

                $scope.initFn()

                $scope.$watch('districtId', function () {
                    if (Utils.isNotEmpty($scope.districtId) || _.parseInt($scope.districtId) > 0) {
                        $scope.initFn();
                    } else {
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                    }
                });

                $scope.$watch('provinceId', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.initFn();
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                    }
                });

                $scope.removeItem = function () {
                    $scope.data.selected = angular.copy({
                        id: null,
                        name: null,
                    });

                    $scope.districtId = null;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: $scope.data.selected});
                        });
                    }
                }

                $scope.openSearchDialog = function ($event) {
                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let districtsData = angular.copy($scope.districts)

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'default-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: dialogPosition,
                        resolve: {
                            districts: ['AppDataService', function (AppDataService) {
                                return districtsData;
                            }],
                            districtSelected: ['AppDataService', function (AppDataService) {
                                return $scope.data.selected;
                            }],

                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', 'districts', 'districtSelected', function ($scope, $element, AppSystem, Utils, districts, districtSelected) {
                            $scope.items = districts;
                            $scope.totalItems = districts.length;
                            $scope.isLoading = false

                            console.log('districtSelected', districtSelected)

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: districtSelected,
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (district) {
                                $scope.closeThisDialog(district);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.id) && returnData.value.id > 0) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (districtData) {

                    $scope.data.selected = angular.copy(districtData);

                    $scope.districtId = angular.copy(districtData.id);

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: districtData});
                        });
                    }
                }
            }
        };
        return directive;
    }
})();
