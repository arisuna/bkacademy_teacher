/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('hourMinuteInput', hourMinuteInput);

    hourMinuteInput.$inject = ['urlBase', 'moment', 'Utils', '$timeout', 'ngDialog'];

    function hourMinuteInput(urlBase, moment, Utils, $timeout, ngDialog) {
        var timePickerInputDirective = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                ngChange: '&?',
                showLabel: '<?',
                label: '@',
                isEditable: '<?',
                requiredMessage: '@',
                isNotShowClear: '<?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'hour-minute-selector'),

            link: function (scope, element, attrs, timeout) {
            },
            controller: function ($scope, $element, $attrs, $timeout) {

                $scope.data = {
                    selected: {
                        hour: null,
                        minute: null,
                        value: null
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: 'hourMinuteDialog.tpl',
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'Utils', function ($scope, $element, $timeout, Utils) {

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.hour = null;
                            $scope.minute = null;

                            $scope.hourList = _.range(0, 24);
                            $scope.minuteList = _.range(0, 60);

                            $scope.selectMinute = function (minute) {
                                $scope.minute = minute;
                            };

                            $scope.selectHour = function (hour) {
                                $scope.hour = hour;
                            };

                            $scope.confirmSelect = function () {
                                $scope.closeThisDialog({
                                    hour: $scope.hour,
                                    minute: $scope.minute
                                });
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        console.log('returnData.value.minute', returnData.value.minute);
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.hour) && _.isNumber(returnData.value.hour) && returnData.value.hour >= 0
                            && angular.isDefined(returnData.value.minute) && _.isNumber(returnData.value.minute) && returnData.value.minute >= 0) {
                            $scope.setValue(returnData.value.hour, returnData.value.minute);
                        }
                    });

                };

                $scope.setValue = function (hour, minute) {
                    $scope.data.selected.value = hour + ":" + minute;
                    $scope.data.selected.hour = hour;
                    $scope.data.selected.minute = minute;
                    $scope.model = $scope.data.selected.value;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange();
                        })
                    }
                };

                $scope.$watch('model', function (newValue, oldValue) {

                    if (_.isString($scope.model) && $scope.model != '' && newValue != oldValue ) {

                        let hourMinute = _.split($scope.model, ":");

                        if (_.size(hourMinute) > 1) {
                            $scope.data.selected.value = $scope.model;
                            $scope.data.selected.hour = _.first(hourMinute);
                            $scope.data.selected.minute = _.last(hourMinute);
                        } else {
                            $scope.data.selected.value = null;
                            $scope.data.selected.hour = null;
                            $scope.data.selected.minute = null;
                        }
                    }
                });

                $scope.removeItem = function () {
                    $scope.data.selected.value = null;
                    $scope.data.selected.hour = null;
                    $scope.data.selected.minute = null;
                    $scope.model = null;

                    if (angular.isFunction($scope.ngChange)) {
                        $timeout(function () {
                            $scope.ngChange();
                        })
                    }
                }


            }
        };

        return timePickerInputDirective;
    }

})();
