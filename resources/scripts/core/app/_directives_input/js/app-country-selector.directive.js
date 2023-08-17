(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appCountrySelector', appCountrySelector);

    appCountrySelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', 'AppSystem', '$timeout'];

    function appCountrySelector(ngDialog, Utils, urlBase, DataService, AppSystem, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                countryIdCode: '=ngModel',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                isEditable: '<?',
                showLabel: '<',
                outputType: '@?', //iso, id
                name: '@',
                type: '@?',
                isCircle: '<?',
                placeHolder: '@?',
                toolTipText: '@?',
                removeChange: '&?',
                ngChange: '&?',
                showRemoveLabel: '<?',
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'country-selector-item'),

            link: function (scope, element, attrs) {

                scope.name = 'country';

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == false) {
                    scope.showLabel = false;
                    scope.placeholder = 'SELECT_TEXT';
                } else {
                    scope.placeholder = '';
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == false) {
                    scope.isEditable = false;
                } else {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }

                if (angular.isUndefined(scope.placeHolder) || scope.placeHolder == '') {
                    scope.placeHolder = 'SELECT_NATIONALITY_TEXT';
                }


                // if (angular.isUndefined(scope.isEditable) || scope.isEditable == null || scope.isEditable == '') {
                //     scope.isEditable = true;
                // }

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
                        iso2: null,
                    },
                };

                $scope.countries = AppSystem.getCountries();

                $scope.initFn = function () {

                    let country = null;

                    if (_.isString($scope.countryIdCode) && Utils.isAlphabetic($scope.countryIdCode)) {
                        console.log('is string');
                        country = _.findLast($scope.countries, function (o) {
                            return o.cio == $scope.countryIdCode;
                        });
                    } else if (_.parseInt($scope.countryIdCode) > 0) {
                        console.log('is number');
                        country = _.findLast($scope.countries, function (o) {
                            return o.id == $scope.countryIdCode;
                        });
                    }

                    $scope.data.selected = angular.copy(country);

                };

                $scope.$watch('countryIdCode', function () {

                    if (Utils.isNotEmpty($scope.countryIdCode) || _.parseInt($scope.countryIdCode) > 0) {
                        $scope.initFn();
                    } else {
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                            iso2: null,
                        });
                    }
                });

                $scope.removeItem = function () {
                    $scope.data.selected = angular.copy({
                        id: null,
                        name: null,
                        iso2: null,
                    });

                    $scope.countryIdCode = null;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange();
                        });
                    }
                }

                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'country-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', function ($scope, $element, AppSystem, Utils) {

                            $scope.countries = AppSystem.getCountries();

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

                            $scope.selectItem = function (country) {
                                $scope.closeThisDialog(country);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.id) && returnData.value.id > 0) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (countryData) {

                    $scope.data.selected = angular.copy(countryData);

                    if ($scope.outputType == 'iso') {
                        $scope.countryIdCode = angular.copy(countryData.iso2);
                    } else if ($scope.outputType == 'id') {
                        $scope.countryIdCode = angular.copy(countryData.id);
                    } else {
                        $scope.countryIdCode = angular.copy(countryData.id);
                    }

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange();
                        });
                    }
                }
            }
        };
        return directive;
    }
})();
