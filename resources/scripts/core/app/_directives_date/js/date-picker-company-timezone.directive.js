/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.date-picker-input')
        .directive('datePickerCompanyTimezone', datePickerCompanyTimezone);

    datePickerCompanyTimezone.$inject = ['urlBase', 'moment', '$filter', '$rootScope', 'Utils', 'AppAuthService'];

    function datePickerCompanyTimezone(urlBase, moment, $filter, $rootScope, Utils, AppAuthService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                showLabel: '<?',
                isGray: '<?',
                label: '@?',
                name: '<?',
                inputType: '@?',
                outputType: '@',
                isRequired: '<?',
                isDisabled: '<?',
                onAfterSave: '&?onAfterSave',
                isFullWidth: '<?',
                isMandatory: '<?',
                placeholder: '@?',
                toolTipText: '@?',
                isInitToday: '<?'
            },
            template: `
            <div class="form-group {{ (isFullWidth && isFullWidth == true) ? 'w-100' : 'm-w-200' }}">


                <div ng-show="showLabel">
                    <label ng-show="showLabel" class="label-text-form pull-left" ng-class="{'text-gray': isGray == true, 'text-dark-blue': isGray != true}">
                        {{ label | translate }}
                        <asterik-red ng-if="isRequired">
                    </label>

                     <tooltip text="{{ toolTipText  }}" ng-if="toolTipText != '' && toolTipText != undefined" class="pull-right"></tooltip>

                    <div class="clearfix"></div>
                </div>

                <div class="input-group date-picker">
                    <input class="form-control"
                           ng-class="{'form-highlight' : highlight}"
                           type="text" name="{{ name }}"
                           placeholder="{{placeholder ? placeholder : _companyDateFormat}}"
                           ng-model="dt"
                           is-open="dpick.dateOpened"
                           tabindex="1"
                           uib-datepicker-popup="{{ dpick.format}}"
                           uib-datepicker-options="dpick.dateOptions"
                           datepicker-append-to-body="true"
                           date-disabled="dpick.disabled(date, mode)"
                           ng-model-options="ngModelOpts"
                           ng-disabled="isDisabled"
                           ng-change="changeDate()"
                           clear-text="{{'CLEAR_TEXT' | translate}}"
                           current-text="{{'TODAY_TEXT' | translate}}"
                           close-text="{{'CLOSE_TEXT' | translate}}"/>
                    <span class="input-group-btn">
                        <button class="btn btn-default btn-flat"
                                 tabindex="1"
                                type="button" ng-disabled="isDisabled" ng-click="dpick.dateOpen($event)">
                            <em class="fa fa-calendar"></em>
                        </button>
                    </span>
                    <div class="clearfix"></div>
                </div>
                <input class="text" ng-show="false" ng-model="model" ng-required="isRequired"
                       data-parsley-required-message="{{'DATE_REQUIRED_TEXT' | translate}}">
            </div>
            `,
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

                if (angular.isDefined(scope.isDisabled) && scope.isDisabled == true) {
                    scope.isDisabled = true;
                } else {
                    scope.isDisabled = false;
                }

                if (angular.isUndefined(scope.isMandatory)) {
                    scope.isMandatory = false;
                }

                if (angular.isUndefined(scope.isInitToday)) {
                    scope.isInitToday = false;
                }

            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.isOpen = false;
                $scope.isChangedInside = false;
                $scope.isInitialized = false;
                $scope.companyDateFormat = 'dd/MM/yyyy';
                $scope.highlight = false;
                $scope.companyTimezoneOffset = AppAuthService.getCompanyTimezoneOffset();
                $scope.companyTimezoneUtc = AppAuthService.getCompanyTimezoneUtc();

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

                $scope.companyDateFormatSetting = AppAuthService.getCompanyDateFormat();

                $scope.placeholder = angular.isDefined($scope.placeholder) ? $scope.placeholder : '';

                $scope.ngModelOpts = {
                    timezone: $scope.companyTimezoneUtc
                };

                $scope.dpick = {
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
                            null,
                        maxDate:
                            null,
                        ngModelOptions: $scope.ngModelOpts
                    }
                    ,
                    formats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'],
                    format: $scope._datePickerFormat
                }


                $rootScope.$on('hide_date_picker', function (event, data) {
                    if (angular.isDefined(data.name) && data.name != $scope.name) {
                        $scope.dpick.close();
                    }
                });


                $scope.changeDate = function () {

                    if ($scope.dt != '' && $scope.dt != null && $scope.dt != undefined) {
                        if (Utils.isDateValid($scope.dt)) {
                            if ($scope.inputType == 'date') {
                                $scope.model = $filter('amDateFormat')($scope.dt, 'YYYY-MM-DD');
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
                        }, 500);

                    }
                }

                $scope.initValue = function () {
                    if ($scope.isInitialized == false) {
                        if ($scope.inputType == 'date') {
                            if (($scope.model != '' && $scope.model != null)) {
                                $scope.dt = moment($scope.model, $scope._companyDateFormat).toDate();
                            } else {
                                $scope.dt = '';
                            }
                        } else {

                            let modelInt = 0;
                            if (_.isInteger($scope.model) && $scope.model > 0) {
                                modelInt = angular.copy($scope.model);
                            } else {
                                modelInt = _.parseInt($scope.model);
                            }
                            if (modelInt > 0) {
                                var temporary_date = new Date(0);
                                temporary_date.setUTCSeconds($scope.model);
                                $scope.dt = temporary_date;
                            } else {
                                if($scope.isInitToday){
                                    let _date = moment().format($scope._companyDateFormat);
                                    let _time = moment(_date).utcOffset(0, true).unix();
                                    $scope.model = _time;
                                    var _temporary_date = new Date(0);
                                    _temporary_date.setUTCSeconds(_time);
                                    $scope.dt = _temporary_date;
                                }else{
                                    $scope.dt = '';
                                }
                            }
                        }

                        $scope.isInitialized = true;
                    }
                };


                $scope.$watch('model', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.isInitialized = false;
                        $scope.initValue();
                    }
                    if ((_.isNull(newValue) || newValue == null || newValue == '') && $scope.isMandatory == true) {
                        $scope.highlight = true;
                    } else {
                        $scope.highlight = false;
                    }
                });


                $timeout(function () {
                    $scope.isInitialized = false;
                    $scope.initValue();
                });

            }
        };

        return directive;
    }

})();
