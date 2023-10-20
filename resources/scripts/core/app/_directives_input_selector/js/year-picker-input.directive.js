/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('yearPickerInput', yearPickerInput);

    yearPickerInput.$inject = ['urlBase', 'moment', '$filter', '$rootScope', 'Utils', 'WaitingService',
        'tmhDynamicLocale', '$translate', 'uibDatepickerPopupConfig', '$locale'];

    function yearPickerInput(urlBase, moment, $filter, $rootScope, Utils, WaitingService,
                              tmhDynamicLocale, $translate, uibDatepickerPopupConfig, $locale) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                showLabel: '<?',
                label: '@?',
                required: '<?',
                disabled: '<?',
                onAfterSave: '&?onAfterSave',
                fullWidth: '<?',
                noMargin: '<?',
                appendBody: '<?',
                className: '@?',
                noMarginBottom: '<?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'year-picker-input'),
            link: function (scope, element, attrs, timeout) {

                function parseISO(s) {
                    if (_.isString(s)) {
                        var b = s.split(/\D/);
                        if (s.length > 10) {
                            return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
                        } else {
                            return new Date(b[0], b[1] - 1, b[2], b[3]);
                        }
                    }
                }

                if (angular.isUndefined(scope.name) || scope.name == '') {
                    scope.name = "date" + Math.random();
                }
                if (angular.isUndefined(scope.inputType) || scope.inputType == '') {
                    scope.inputType = "date";
                }
                if (angular.isUndefined(scope.outputType) || scope.outputType == '') {
                    scope.outputType = "date";
                }
                if (angular.isDefined(scope.showLabel) && scope.showLabel == true) {
                    scope.showLabel = true;
                } else {
                    scope.showLabel = false;
                }
                if (angular.isDefined(scope.required) && scope.required == true) {
                    scope.required = true;
                } else {
                    scope.required = false;
                }

                if (angular.isDefined(scope.disabled) && scope.disabled == true) {
                    scope.disabled = true;
                } else {
                    scope.disabled = false;
                }
                if (angular.isUndefined(scope.noMargin) || scope.noMargin == undefined) {
                    scope.noMargin = false;
                }

                if (angular.isUndefined(scope.appendBody) || scope.appendBody == undefined) {
                    scope.appendBody = false;
                }

                if (angular.isDefined(scope.fromNow) && scope.fromNow == true) {
                    scope.fromNow = true;
                } else {
                    scope.fromNow = false;
                }

                if(angular.isUndefined(scope.isCompanyTimezone)){
                    scope.isCompanyTimezone = false;
                }

                if (angular.isUndefined(scope.noMarginBottom)) {
                    scope.noMarginBottom = false;
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.isOpen = false;
                $scope.isChangedInside = false;
                $scope.dt = '';

                uibDatepickerPopupConfig.currentText = $translate.instant('TODAY_TEXT');
                uibDatepickerPopupConfig.closeText = $translate.instant('CLOSE_TEXT');
                uibDatepickerPopupConfig.clearText = $translate.instant('CLEAR_TEXT');
                // tmhDynamicLocale.set(GmsSystem.getUserSettingVariable('display_language') ? GmsSystem.getUserSettingVariable('display_language') : 'en');

                $scope._companyDateFormat = 'YYYY'

                $scope._datePickerFormat = 'yyyy';


                $scope.dpick = {
                    appendBody: angular.isUndefined($scope.appendBody) ? $scope.appendBody = false : $scope.appendBody,
                    dateOpened: false,
                    hireOpened: false,
                    dateOpen: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        this.dateOpened = true;
                        $rootScope.$broadcast('hide_date_picker', {name: $scope.name});
                    },
                    hireOpen: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        this.hireOpened = true;
                    },
                    close: function () {
                        this.dateOpened = false;
                    },
                    disabled: function (date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    }
                    ,
                    clear: function () {
                        $scope.dt = null;
                    }
                    ,
                    dateOptions: {
                        datepickerMode:"year",
                        minMode:"year",
                        minDate:"minDate",
                        showWeeks:"false",
                    }
                    ,
                    formats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'],
                    format:
                        $scope._datePickerFormat,
                };

                $scope.dateOptions = {
                    datepickerMode:"year",
                    minMode:"year",
                    minDate:"minDate",
                    showWeeks:"false",
                };

                $scope.minDate = $scope.fromNow ? (new Date()).setDate(new Date().getDate() + 1) : null;

                $rootScope.$on('hide_date_picker', function (event, data) {
                    if (angular.isDefined(data.name) && data.name != $scope.name) {
                        $scope.dpick.close();
                    }
                });


                $scope.changeDate = function () {
                    if ($scope.dt != '' && $scope.dt != null && $scope.dt != undefined) {
                        console.log('changeDate', $scope.dt);
                        if (Utils.isDateValid($scope.dt)) {
                            $scope.model = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.dt)), 'YYYY');

                        }
                    } else {
                        $scope.model = null;
                    }


                    if (angular.isFunction($scope.onAfterSave)) {
                        $timeout(function () {
                            if ($scope.promise) {
                                $timeout.cancel($scope.promise);
                            }
                            $scope.promise = $timeout(function () {
                                $scope.onAfterSave();
                                $timeout.cancel($scope.promise);
                            });
                        }, 1000);

                    }
                }

                $scope.initValue = function () {
                    $scope.dt = moment($scope.model, 'YYYY-MM-DD').toDate();

                };

                $timeout(function () {
                    $scope.initValue();
                });


                $scope.$watch('model', function (newValue, oldValue) {
                    if ((angular.isUndefined(oldValue) || _.isEmpty(oldValue) || oldValue == '') && newValue != '' && newValue != undefined) {
                        // $scope.initValue();
                    }

                    if (angular.isUndefined(oldValue) && _.isEmpty(oldValue)) {
                        $scope.initValue();
                    } else {
                        if (angular.isUndefined(newValue) || newValue == null) {
                            $scope.dt = null;
                        }
                    }
                });
                $scope.$watch('observedModel', function (newValue, oldValue) {
                    if (newValue != undefined && newValue != null && ($scope.dt == null || $scope.dt == '' || $scope.dt == undefined)) {
                        $scope.initValue();
                    }
                });
            }
        };

        return directive;
    }

})();
