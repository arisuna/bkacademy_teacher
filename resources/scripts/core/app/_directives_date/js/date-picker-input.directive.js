/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.date-picker-input')
        .directive('datePickerInput', datePickerInput);

    datePickerInput.$inject = ['urlBase', 'moment', '$filter', '$rootScope', 'Utils', 'WaitingService',
        'AppAuthService', 'tmhDynamicLocale', 'AppSystem', '$translate', 'uibDatepickerPopupConfig', '$locale'];

    function datePickerInput(urlBase, moment, $filter, $rootScope, Utils, WaitingService,
                             AppAuthService, tmhDynamicLocale, AppSystem, $translate, uibDatepickerPopupConfig, $locale) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                observedModel: '=?',
                showLabel: '<?',
                isGray: '<?',
                label: '@?',
                name: '<',
                inputType: '@?',
                outputType: '@',
                required: '<?',
                disabled: '<?',
                onAfterSave: '&?onAfterSave',
                fullWidth: '<?',
                noMargin: '<?',
                appendBody: '<?',
                fromNow: '<?',
                isCompanyTimezone: '<?',
                className: '@?',
                buttonClassName: '@?',
                noMarginBottom: '<?',
                isServiceModal: '<?',
            },
            templateUrl: urlBase.tplApp('gms', '_directives_date', 'date-picker-input'),
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
                $scope.companyTimezoneOffset = AppAuthService.getCompanyTimezoneOffset();

                uibDatepickerPopupConfig.currentText = $translate.instant('TODAY_TEXT');
                uibDatepickerPopupConfig.closeText = $translate.instant('CLOSE_TEXT');
                uibDatepickerPopupConfig.clearText = $translate.instant('CLEAR_TEXT');
                tmhDynamicLocale.set(AppSystem.getUserSettingVariable('display_language') ? AppSystem.getUserSettingVariable('display_language') : 'en');

                $scope._companyDateFormat = AppAuthService.getCompanyDateFormat() ? AppAuthService.getCompanyDateFormat() : 'DD/MM/YYYY';

                $scope._datePickerFormat = 'dd/MM/yyyy';

                switch ($scope._companyDateFormat){
                    case 'DD/MM/YYYY':
                        $scope._datePickerFormat = 'dd/MM/yyyy';
                        break;
                    case 'MM/DD/YYYY':
                        $scope._datePickerFormat = 'MM/dd/yyyy';
                        break;
                    case 'YYYY/MM/DD':
                        $scope._datePickerFormat = 'yyyy/MM/dd';
                        break;
                    default:
                        $scope._datePickerFormat = 'dd/MM/yyyy';
                        break;
                }

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
                        formatYear: 'yyyy',
                        initDate:
                            null,
                        minDate:
                            $scope.fromNow ? (new Date()).setDate(new Date().getDate() + 1) : null,
                        maxDate:
                            null
                    }
                    ,
                    formats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'],
                    format:
                        $scope._datePickerFormat,
                };

                $scope.minDate = $scope.fromNow ? (new Date()).setDate(new Date().getDate() + 1) : null;

                $rootScope.$on('hide_date_picker', function (event, data) {
                    if (angular.isDefined(data.name) && data.name != $scope.name) {
                        $scope.dpick.close();
                    }
                });


                $scope.changeDate = function () {
                    if ($scope.dt != '' && $scope.dt != null && $scope.dt != undefined) {
                        if (Utils.isDateValid($scope.dt)) {
                            if ($scope.fromNow) {
                                let checkModel = moment($scope.dt).unix();
                                $scope.current_date = new Date();
                                if (checkModel <= Math.floor($scope.current_date / 1000)) {
                                    WaitingService.error('MUST_CHOOSE_FROM_TOMORROW_TEXT');
                                    $scope.initValue();
                                    return;
                                } else {
                                    let check_date = new Date(checkModel * 1000);
                                    let difference = checkModel * 1000 - $scope.current_date;
                                    if (difference < 1000 * 3600 * 24 && check_date.getDate() == $scope.current_date.getDate()) {
                                        WaitingService.error('MUST_CHOOSE_FROM_TOMORROW_TEXT');
                                        $scope.initValue();
                                        return;
                                    }
                                }
                            }
                            if ($scope.inputType == 'date') {
                                $scope.model = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.dt)), 'YYYY-MM-DD');
                            } else {
                                $scope.model = moment($scope.dt).unix();
                            }
                            $scope.isChangedInside = true;
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
                    if ($scope.inputType == 'date') {
                        if (($scope.model != '' && $scope.model != null) && ($scope.dt == '' || $scope.dt == null)) {
                            $scope.dt = moment($scope.model, 'YYYY-MM-DD').toDate();
                        } else {
                            $scope.dt = '';
                        }
                    } else {
                        if (_.isInteger($scope.model) && $scope.model > 0) {
                            var temporary_date = new Date(0);
                            temporary_date.setUTCSeconds($scope.model);
                            $scope.dt = temporary_date;
                        } else {
                            $scope.dt = '';
                        }
                    }

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
