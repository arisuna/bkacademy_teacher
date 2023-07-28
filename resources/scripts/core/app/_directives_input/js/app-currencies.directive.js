(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appCurrency', appCurrency);


    angular
        .module('app.app-directives')
        .directive('appCurrencySelector', appCurrency);

    appCurrency.$inject = ['$translate', '$window', '$timeout', 'urlBase', 'ngDialog', 'Utils', 'GmsSystem', 'GmsAuthService'];

    function appCurrency($translate, $window, $timeout, urlBase, ngDialog, Utils, GmsSystem, GmsAuthService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
                isRequired: '<?',
                label: '@',
                showLabel: '<?',
                noMargin: '<?',
                isRemove: '<?',
                requiredMessage: '@',
                ngChange: '&?',
                isEditable: '<?',
                position: '@?',
                showRemoveLabel: '<?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'currency'),
            link: function (scope, element, attrs) {
                scope.realName = "CURRENCY_" + _.uniqueId();

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'CURRENCY_TEXT';
                }


                if (angular.isUndefined(scope.isRequired) || scope.isRequired == '' || _.isNull(scope.isRequired)) {
                    scope.isRequired = false;
                }

                if (angular.isUndefined(scope.showLabel)) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.isRemove)) {
                    scope.isRemove = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'CURRENCY_REQUIRED_TEXT';
                }

                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.noMargin)) {
                    scope.noMargin = false;
                }

                if (angular.isUndefined(scope.showRemoveLabel)) {
                    scope.showRemoveLabel = true;
                }
            },

            controller: function ($scope, $element, $attrs) {

                $scope.currencies = [];
                $scope.current_currency = GmsAuthService.getCompanyCurrency();

                $scope.highlight = false;
                $scope.data = {
                    selected: {
                        code: null,
                        name: null,
                    },
                };

                $scope.currencies = GmsSystem.getCurrencies();

                $scope.initFn = function () {
                    let currency = null;
                    if (_.isString($scope.model) && Utils.isAlphabetic($scope.model)) {
                        currency = _.findLast($scope.currencies, function (o) {
                            return o.code == $scope.model;
                        });
                    }
                    $scope.data.selected = angular.copy(currency);
                };

                $scope.$watch('model', function (newValue) {
                    if (Utils.isNotEmpty($scope.model) || $scope.model != '') {
                        $scope.initFn();
                    } else {
                        $scope.data.selected = angular.copy({
                            code: null,
                            name: null,
                        });
                    }

                    if ((_.isNull(newValue) || newValue == null || newValue == '') && $scope.isMandatory == true) {
                        $scope.highlight = true;
                    } else {
                        $scope.highlight = false;
                    }
                });

                $scope.removeItem = function () {
                    $scope.data.selected = angular.copy({
                        code: null,
                        name: null,
                    });
                    $scope.model = null;
                    if (angular.isFunction($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }


                $scope.openSearchDialog = function ($event) {

                    // let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let element = $event.currentTarget;
                    var place = element.getBoundingClientRect();

                    let dialogTop, dialogBottom = "";
                    if ($window.innerHeight / 2 < place.y) {
                        dialogBottom = ($window.innerHeight - _.parseInt(place.y)).toString() + 'px';
                        dialogTop = 'inherit';
                    } else {
                        dialogTop = (_.parseInt(place.y) + 33).toString() + 'px';
                        dialogBottom = 'inherit';
                    }


                    let dialogLeft = (_.parseInt(place.x) - 33).toString() + 'px';
                    let dialogRight = ($window.innerWidth - parseInt(place.right) - 10).toString() + 'px';
                    let dialogHeight = 0;
                    let dialogWidth = 0;


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'currency-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background custom-bottom',
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: {
                            position: $scope.position
                        },
                        controller: ['$scope', '$element', 'GmsSystem', 'Utils', function ($scope, $element, GmsSystem, Utils) {

                            $scope.currencies = GmsSystem.getCurrencies();
                            document.documentElement.style.setProperty('--ng-dialog-custom-position-top', dialogTop);
                            if ($scope.ngDialogData.position === 'right') {
                                console.log('right dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', dialogRight);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', 'inherit');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-bottom', dialogBottom);
                            } else {
                                console.log('default dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', dialogLeft);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', 'inherit');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-bottom', dialogBottom);
                            }
                            // Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    code: null,
                                },
                                filterQuery: ""
                            };


                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (currency) {
                                console.info('selectItem', currency);
                                $scope.closeThisDialog(currency);
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.code) && returnData.value.code != '') {
                            if ($scope.model != returnData.value.code) {
                                $scope.data.selected = angular.copy(returnData.value);
                                $scope.model = returnData.value.code;
                                if (angular.isFunction($scope.ngChange)) {
                                    $scope.ngChange();
                                }
                            }

                        }
                    })
                }


            }
        };
        return directive;
    }

})();
