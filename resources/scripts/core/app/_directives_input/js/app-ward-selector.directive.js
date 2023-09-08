(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appWardSelector', appWardSelector);

    appWardSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', 'AppSystem', '$timeout', 'AppAddressService'];

    function appWardSelector(ngDialog, Utils, urlBase, DataService, AppSystem, $timeout, AppAddressService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                wardId: '=ngModel',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                districtId: '<',
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

                scope.name = 'ward';

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
                $scope.wards = []

                $scope.initFn = function () {
                    if (!$scope.districtId) {
                        return
                    }
                    AppAddressService.searchWards({
                        district_id: $scope.districtId
                    }).then(function (res) {
                        if (!res.data || res.data.length <= 0) {
                            return;
                        }
                        let ward = null;

                        $scope.wards = res.data
                        if (_.isString($scope.wardId) && Utils.isAlphabetic($scope.wardId)) {
                            console.log('is string');
                            ward = _.findLast($scope.wards, function (o) {
                                return o.cio == $scope.wardId;
                            });
                        } else if (_.parseInt($scope.wardId) > 0) {
                            console.log('is number');
                            ward = _.findLast($scope.wards, function (o) {
                                return o.id == $scope.wardId;
                            });
                        }

                        $scope.data.selected = angular.copy(ward);
                    })
                };

                $scope.initFn()

                $scope.$watch('wardId', function () {

                    if (Utils.isNotEmpty($scope.wardId) || _.parseInt($scope.wardId) > 0) {
                        $scope.initFn();
                    } else {
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                    }
                });

                $scope.$watch('districtId', function (newValue, oldValue) {
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

                    $scope.wardId = null;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: $scope.data.selected});
                        });
                    }
                }

                $scope.openSearchDialog = function ($event) {
                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let wardsData = angular.copy($scope.wards)

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
                            wards: ['AppDataService', function (AppDataService) {
                                return wardsData;
                            }],
                            wardSelected: ['AppDataService', function (AppDataService) {
                                return $scope.data.selected;
                            }],

                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', 'wards', 'wardSelected', function ($scope, $element, AppSystem, Utils, wards, wardSelected) {
                            $scope.items = wards;
                            $scope.totalItems = wards.length;
                            $scope.isLoading = false

                            console.log('wardSelected', wardSelected)

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: wardSelected,
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (ward) {
                                $scope.closeThisDialog(ward);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.id) && returnData.value.id > 0) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (wardData) {

                    $scope.data.selected = angular.copy(wardData);

                    $scope.wardId = angular.copy(wardData.id);

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: wardData});
                        });
                    }
                }
            }
        };
        return directive;
    }
})();
