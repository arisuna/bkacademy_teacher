(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appBankSelector', appBankSelector);

    appBankSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', 'AppSystem', '$timeout'];

    function appBankSelector(ngDialog, Utils, urlBase, DataService, AppSystem, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                bankIdCode: '=ngModel',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                isEditable: '<?',
                showLabel: '<',
                name: '@',
                type: '@?',
                isCircle: '<?',
                placeHolder: '@?',
                toolTipText: '@?',
                removeChange: '&?',
                ngChange: '&?',
                showRemoveLabel: '<?',
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'bank-selector-item'),
            
            link: function (scope, element, attrs) {

                scope.name = 'bank';

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

                $scope.banks = AppSystem.getBanks();

                $scope.initFn = function () {
                    let bank = null;

                    if ($scope.bankIdCode) {
                        bank = _.find($scope.banks, function (o) {
                            return o.code == $scope.bankIdCode;
                        });
                    }

                    $scope.data.selected = angular.copy(bank);

                };

                $scope.$watch('bankIdCode', function () {

                    if (Utils.isNotEmpty($scope.bankIdCode) || _.parseInt($scope.bankIdCode) > 0) {
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

                    $scope.bankIdCode = null;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: $scope.data.selected});
                        });
                    }
                }

                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'bank-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', function ($scope, $element, AppSystem, Utils) {

                            $scope.banks = AppSystem.getBanks();

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

                            $scope.selectItem = function (bank) {
                                $scope.closeThisDialog(bank);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.code) && returnData.value.code) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (bankData) {
                    console.log("bank", bankData)

                    $scope.data.selected = angular.copy(bankData);

                    $scope.bankIdCode = angular.copy(bankData.code);

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange({item: $scope.data.selected});
                        });
                    }
                }
            }
        };
        return directive;
    }
})();
