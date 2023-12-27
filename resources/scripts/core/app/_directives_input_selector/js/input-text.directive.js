(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputText', inputText);

    inputText.$inject = ['$translate', '$timeout', 'urlBase', '$filter', 'Utils'];

    function inputText($translate, $timeout, urlBase, $filter, Utils) {

        var directive = {
            restrict: 'AE',
            require: 'ngModel',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<ngRequired',
                placeholder: '@?',
                requiredMessage: '@?',
                maxLengthMessage: '@?',
                isRequired: '<?',
                isShowErrorMessage: '<?',
                currencyCode: '<?',
                type: '@?',
                errorMessage: '@?',
                isEditable: '<?',
                isUpperCase: '<?',
                isLowerCase: '<?',
                isNumeric: '<?',
                step: '<?',
                isAlphabetic: '<?',
                isDateUtc: '<?',
                isAlphabeticAndSpace: '<?',
                isDigits: '<?',
                isLabel: '<?',
                isUrl: '<?',
                isEmail: '<?',
                isTelephone: '<?',
                isAmount: '<?',
                isMobile: '<?',
                isFax: '<?',
                isCity: '<?',
                isCountry: '<?',
                isAddress: '<?',
                isPerson: '<?',
                isDocument: '<?',
                isWebsite: '<?',
                isJobTitle: '<?',
                isInfo: '<?',
                isText: '<?',
                isDate: '<?',
                isPassword: '<?',
                isPasswordEmpty: '<?',
                isLocation: '<?',
                toolTipText: '@',
                label: '@label',
                noMargin: '<?',
                isDisabled: '<?',
                isLongViewText: '<?',
                ngChange: '&?',
                maxLength: '<?',
                min: '<?',
                pattern: '@?',
                patternErrorMessage: '@?',
                hasPattern: '<?',
                showLabel: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'text'),
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.required = scope.required || scope.isRequired;
                if (angular.isUndefined(scope.requiredMessage)) {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }

                if (angular.isUndefined(scope.hasPattern)) {
                    scope.hasPattern = false;
                }

                if (angular.isDefined(scope.label) && angular.isUndefined(scope.showLabel)) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.min)) {
                    scope.min = 0;
                }

                if (angular.isUndefined(scope.isShowErrorMessage)) {
                    scope.isShowErrorMessage = true;
                }

            },
            controller: function ($scope, $element, $attrs) {

                $scope.changeValue = function () {
                    if (angular.isDefined($scope.isUpperCase) && $scope.isUpperCase == true && $scope.model) {
                        $scope.model = $scope.model.toUpperCase();
                    }

                    if (angular.isDefined($scope.isLowerCase) && $scope.isLowerCase == true && $scope.model) {
                        $scope.model = $scope.model.toLowerCase();
                    }

                    // if (angular.isDefined($scope.isNumeric) && $scope.isNumeric == true && $scope.model) {
                    //     if (_.isString($scope.model)) {
                    //         var inputNumber = $scope.model.toString().replace(/[^0-9]/g, '');
                    //         inputNumber = _.toNumber(inputNumber);
                    //         $scope.model = inputNumber;
                    //     }
                    // }

                    if (angular.isDefined($scope.isAlphabetic) && $scope.isAlphabetic == true && $scope.model) {
                        var inputNumber = $scope.model.toString().replace(/[^A-Za-z]/g, '');
                        $scope.model = inputNumber;
                    }

                    if (angular.isDefined($scope.isAlphabeticAndSpace) && $scope.isAlphabeticAndSpace == true && $scope.model) {
                        var inputNumber = $scope.model.toString().replace(/[^A-Za-z\p{L} ]/g, '');
                        $scope.model = inputNumber;
                    }

                    if (angular.isDefined($scope.isLabel) && $scope.isLabel == true && $scope.model) {
                        if (angular.isDefined($scope.isUpperCase) && $scope.isUpperCase == true && $scope.model) {
                            $scope.model = $scope.model.toUpperCase();
                        }
                        var inputNumber = $scope.model.toString().replace(/[^A-Za-z0-9\_]/g, '');
                        $scope.model = inputNumber.toUpperCase();
                    }

                    if (angular.isDefined($scope.isDate) && $scope.isDate == true && $scope.model) {
                        var inputDate = '';
                        if (_.isNumber($scope.model)) {
                            if ($scope.isDateUtc == true) {
                                inputDate = $filter('utcRawDate')($scope.model);
                            } else {
                                inputDate = $filter('utcLocalDate')($scope.model);
                            }
                        } else {
                            inputDate = $filter('companyDateFormat')($scope.model);
                        }
                        $scope.modelFormatted = inputDate;
                    }

                    $timeout(function () {
                        if (angular.isFunction($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    });
                };


                $scope.changeValueDate = function () {
                    if (angular.isDefined($scope.isDate) && $scope.isDate == true && $scope.model) {
                        var inputDate = '';
                        if (_.isNumber($scope.model)) {
                            if ($scope.isDateUtc == true) {
                                inputDate = $filter('utcRawDate')($scope.model);
                            } else {
                                inputDate = $filter('utcLocalDate')($scope.model);
                            }
                        } else {
                            inputDate = $filter('companyDateFormat')($scope.model);
                        }
                        $scope.modelFormatted = inputDate;
                    }
                }

                $scope.$watch('model', function () {
                    $scope.changeValueDate();
                });


                $scope.init = function () {
                    $scope.changeValue();
                }

                $timeout(function () {
                    $scope.init();
                });
            }
        };
        return directive;
    }


})();
