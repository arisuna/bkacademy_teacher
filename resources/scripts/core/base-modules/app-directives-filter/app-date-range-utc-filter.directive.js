/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appDateRangeUtcFilter', appDateRangeUtcFilter);

    appDateRangeUtcFilter.$inject = ['urlBase', '$timeout', '$translate', '$rootScope', 'moment', '$window'];

    function appDateRangeUtcFilter(urlBase, $timeout, $translate, $rootScope, moment, $window) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                name: '@?',
                model: '=ngModel',
                float: '=?',
                inlineList: '=?',
                dropdownSize: '@?',
                isLastMonth: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-filter', 'app-date-range-utc-filter'),

            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.dropdownSize) || scope.dropdownSize == '') {
                    scope.dropdownSize = 'small';
                }
            },

            controller: function ($scope, $element, $attrs) {
                $scope.promise = null;
                $scope.filter_text = '';
                $scope.filtered_options = [];
                $scope.companyDateFormat = 'DD/MM/YYYY';

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                $scope.subscribe('clearFilter', function () {

                    $scope.filter_text = '';
                    $scope.filtered_options = [];
                    $scope.model = null;
                });

                $rootScope.$on('clearFilter', function () {
                    $scope.filter_text = '';
                    $scope.filtered_options = [];
                    $scope.model = null;
                });

                $scope.openCloseSwitch = function () {


                }


                $scope.dateRangePicker = {
                    date: {
                        startDate: null, endDate: null
                    },
                    picker: null, // daterangepicker initialized on this prop
                    toggle: function () {
                        // need to use $timeout here to avoid $apply errors for digest cycle
                        $timeout(() => {
                            this.picker.toggle();
                        });
                    },
                    options: {
                        // options here
                        pickerClasses: 'custom-display', //angular-daterangepicker extra
                        buttonClasses: 'btn',
                        applyButtonClasses: 'btn-primary',
                        cancelButtonClasses: 'btn-danger',
                        locale: {
                            firstDay: 1,
                            applyLabel: "Apply",
                            cancelLabel: 'Cancel',
                            customRangeLabel: 'Custom',
                            separator: ' - ',
                            format: $scope.companyDateFormat,
                        },
                        ranges: {
                            'Last 7 Days': [moment().subtract(6, 'days').utcOffset(0, true), moment().utcOffset(0, true)],
                            'Last 30 Days': [moment().subtract(29, 'days').utcOffset(0, true), moment().utcOffset(0, true)]
                        },
                        eventHandlers: {
                            'apply.daterangepicker': function (event, picker) {
                                $scope.changeDateOld();
                            },
                            'show.daterangepicker': function (event, picker) {
                                // console.log('event', event);
                                // console.log('picker', picker);
                                // console.log('show.dateRangePicker');
                            }
                        },
                        changeCallback: function (startDate, endDate, label) {
                            // $scope.changeDateOld();
                        }
                    }
                };

                if ($scope.isLastMonth == true){
                    $scope.dateRangePicker.picker = {
                        startDate: moment().subtract(29, 'days').utcOffset(0, true),
                        endDate: moment().utcOffset(0, true),
                    }

                    $scope.dateRangePicker.date = {
                        startDate: moment().subtract(29, 'days').utcOffset(0, true),
                        endDate: moment().utcOffset(0, true),
                    }
                }


                $scope.init = function () {
                    var placePosition = $element[0].getBoundingClientRect();
                    if ($window.innerHeight / 2 < placePosition.y) {
                        $scope.dateRangePicker.options.drops = 'up';
                    } else {
                        $scope.dateRangePicker.options.drops = 'down';
                    }

                    let _ranges = {};
                    _ranges[$translate.instant('LAST_7_DAY_TEXT')] = [moment().subtract(6, 'days'), moment()];
                    _ranges[$translate.instant('LAST_30_DAY_TEXT')] = [moment().subtract(29, 'days'), moment()];

                    $scope.dateRangePicker.options.ranges = _ranges;

                    $scope.dateRangePicker.options.locale.applyLabel = $translate.instant('APPLY_TEXT');
                    $scope.dateRangePicker.options.locale.cancelLabel = $translate.instant('CANCEL_BTN_TEXT');
                    $scope.dateRangePicker.options.locale.customRangeLabel = $translate.instant('CUSTOM_TEXT');

                    $scope.dateRangePicker.options.locale.daysOfWeek = [
                        $translate.instant('SUNDAY_SHORT_TEXT'),
                        $translate.instant('MONDAY_SHORT_TEXT'),
                        $translate.instant('TUESDAY_SHORT_TEXT'),
                        $translate.instant('WEDNESDAY_SHORT_TEXT'),
                        $translate.instant('THURSDAY_SHORT_TEXT'),
                        $translate.instant('FRIDAY_SHORT_TEXT'),
                        $translate.instant('SATURDAY_SHORT_TEXT'),
                    ];

                    $scope.dateRangePicker.options.locale.monthNames = [
                        $translate.instant('JANUARY_TEXT'),
                        $translate.instant('FEBRUARY_TEXT'),
                        $translate.instant('MARCH_TEXT'),
                        $translate.instant('APRIL_TEXT'),
                        $translate.instant('MAY_TEXT'),
                        $translate.instant('JUNE_TEXT'),
                        $translate.instant('JULY_TEXT'),
                        $translate.instant('AUGUST_TEXT'),
                        $translate.instant('SEPTEMBER_TEXT'),
                        $translate.instant('OCTOBER_TEXT'),
                        $translate.instant('NOVEMBER_TEXT'),
                        $translate.instant('DECEMBER_TEXT'),
                    ];
                };



                $scope.changeDateOld = function () {

                    if (_.isObject($scope.dateRangePicker.picker) && angular.isDefined($scope.dateRangePicker.picker.startDate) && angular.isDefined($scope.dateRangePicker.picker.endDate)) {
                        $scope.model = {
                            startDate: moment.utc(moment($scope.dateRangePicker.picker.startDate).utcOffset(0, true).format('YYYY-MM-DD')).unix(),
                            endDate: moment.utc(moment($scope.dateRangePicker.picker.endDate).utcOffset(0, true).format('YYYY-MM-DD')).unix(),
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

                $timeout(function(){
                    $scope.init();
                }, 200);
            }
        };

        return directive;
    }

})();
