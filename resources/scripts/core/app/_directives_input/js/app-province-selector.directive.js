(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appProvinceSelector', appProvinceSelector);

    appProvinceSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', 'AppSystem', '$timeout', 'AppAddressService'];

    function appProvinceSelector(ngDialog, Utils, urlBase, DataService, AppSystem, $timeout, AppAddressService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                provinceId: '=ngModel',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
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

                scope.name = 'province';

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
                $scope.provinces = []

                $scope.initFn = function () {

                    AppAddressService.searchProvinces({}).then(function (res) {
                        if (!res.data || res.data.length <= 0) {
                            return;
                        }
                        let province = null;

                        $scope.provinces = res.data
                        if (_.isString($scope.provinceId) && Utils.isAlphabetic($scope.provinceId)) {
                            console.log('is string');
                            province = _.findLast($scope.provinces, function (o) {
                                return o.cio == $scope.provinceId;
                            });
                        } else if (_.parseInt($scope.provinceId) > 0) {
                            console.log('is number');
                            province = _.findLast($scope.provinces, function (o) {
                                return o.id == $scope.provinceId;
                            });
                        }

                        $scope.data.selected = angular.copy(province);
                    })
                };

                $scope.initFn()


                $scope.$watch('provinceId', function () {

                    if (Utils.isNotEmpty($scope.provinceId) || _.parseInt($scope.provinceId) > 0) {
                        $scope.initFn();
                    } else {
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

                    $scope.provinceId = null;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: $scope.data.selected});
                        });
                    }
                }

                $scope.openSearchDialog = function ($event) {
                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let provincesData = angular.copy($scope.provinces)

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
                            provinces: ['AppDataService', function (AppDataService) {
                                return provincesData;
                            }],
                            provinceSelected: ['AppDataService', function (AppDataService) {
                                return $scope.data.selected;
                            }],

                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', 'provinces', 'provinceSelected', function ($scope, $element, AppSystem, Utils, provinces, provinceSelected) {
                            $scope.items = provinces;
                            $scope.totalItems = provinces.length;
                            $scope.isLoading = false

                            console.log('provinceSelected', provinceSelected)

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: provinceSelected,
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (province) {
                                $scope.closeThisDialog(province);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.id) && returnData.value.id > 0) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (provinceData) {

                    $scope.data.selected = angular.copy(provinceData);

                    $scope.provinceId = angular.copy(provinceData.id);

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: provinceData});
                        });
                    }
                }
            }
        };
        return directive;
    }
})();
