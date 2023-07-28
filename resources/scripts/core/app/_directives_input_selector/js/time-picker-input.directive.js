/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('timePickerInput', timePickerInput);

    timePickerInput.$inject = ['urlBase', 'moment', '$filter', '$timeout'];

    function timePickerInput(urlBase, moment, $filter, $timeout) {
        var timePickerInputDirective = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=?ngModel',
                ngChange: '&?',
                outputType: '@',
                inputType: '@',
                options: '@?',
                showLabel: '<?',
                label: '@',
                isDisabled: '<?'
            },
            template: `
            <div class="form-group">
                <label
                    class="label-text-form text-dark-blue"
                    ng-show="showLabel == true">{{ label | translate }}</label>
                <div>
                    <div uib-dropdown uib-dropdown auto-close="outsideClick">
                        <a id="time-picker-button"
                                class="btn btn-flat btn-default text-dark-blue time-picker-button {{isDisabled ? 'relo-bg-grey-50' : 'relo-bg-bright-blue-10'}}"
                                uib-dropdown-toggle>
                            {{ displayTime ? displayTime : ('TIME_TEXT' | translate ) }} <em class="fa fa-clock-o text-dark-gray mr-sm" style="color:black;"></em>
                        </a>

                        <ul uib-dropdown-menu class="dropdown-menu" aria-labelledby="time-picker-button" role="menu">
                            <li>
                                <div uib-timepicker
                                     arrowkeys="true"
                                     mousewheel="false"
                                     ng-model="dt"
                                     name="{{ options.name }}"
                                     ng-change="timepick.changed()"
                                     hour-step="timepick.hstep"
                                     minute-step="timepick.mstep"
                                     show-meridian="timepick.ismeridian"
                                     show-spinners="true"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            `,

            link: function (scope, element, attrs, timeout) {
                if (angular.isUndefined(scope.options)) {
                    scope.options = {};
                }
                if (angular.isUndefined(scope.options.name)) {
                    scope.option = {
                        name: "time_" + Math.random()
                    }
                }

                if (angular.isUndefined(scope.inputType) || scope.inputType == '') {
                    scope.inputType = "date";
                }
                if (angular.isUndefined(scope.outputType) || scope.outputType == '') {
                    scope.outputType = "date";
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {

                $scope.displayTime = null;
                $scope.isChangedInside = false;

                $scope.$watch('model', function () {
                    if ($scope.isChangedInside == false) {
                        if (Number.isInteger($scope.model)) {
                            var temporary_date = new Date(0);
                            temporary_date.setUTCSeconds($scope.model);
                            $scope.dt = temporary_date;
                        } else {
                            if ($scope.model == null || $scope.model == undefined || $scope.model == '') {
                                $scope.dt = null;
                            } else {
                                $scope.dt = new Date($scope.model);
                            }
                        }
                    }


                    if ($scope.dt && $scope.dt != null && $scope.dt != 'Invalid Date' && !isNaN($scope.dt.getTime())) {
                        if (Number.isInteger($scope.model)) {
                            $scope.displayTime = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($filter('amFromUnix')($scope.model))), 'HH:mm');
                        } else {
                            $scope.displayTime = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.dt)), 'HH:mm');
                        }
                        /*
                        let hour = $scope.dt.getHours() - ($scope.dt.getHours() >= 12 ? 12 : 0),
                            period = $scope.dt.getHours() >= 12 ? 'PM' : 'AM',
                            minutes = $scope.dt.getMinutes();
                        $scope.displayTime = hour + ':' + minutes + ' ' + period
                        */
                    } else {
                        $scope.displayTime = null;
                    }

                    $scope.isChangedInside = false;
                });


                $scope.timepick = {};
                $scope.timepick.current_time = new Date();
                $scope.timepick.ismeridian = true;
                $scope.timepick.toggleMode = function () {
                    $scope.timepick.ismeridian = !$scope.timepick.ismeridian;
                };

                $scope.timepick.hstep = 1;
                $scope.timepick.mstep = 5;

                $scope.timepick.options = {
                    hstep: [1, 2, 3],
                    mstep: [1, 5, 10, 15, 25, 30]
                };

                $scope.timepick.changed = function () {
                    $scope.isChangedInside = true;

                    if ($scope.inputType == 'date') {
                        $scope.model = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.dt)), 'YYYY-MM-DD HH:mm:ss');
                    } else {
                        $scope.model = moment($scope.dt).unix();
                    }

                    $timeout(function () {
                        if (angular.isFunction($scope.ngChange)) {
                            $scope.$evalAsync(function () {
                                $scope.ngChange();
                            });
                        }
                    });

                };
                /*
                $scope.$watch('dt', function () {
                    if ($scope.dt != '' && $scope.dt != null && $scope.dt != undefined) {
                        $scope.model = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.dt)), 'YYYY-MM-DD HH:mm:ss');
                    }
                });
                */
            }
        };

        return timePickerInputDirective;
    }

})();
