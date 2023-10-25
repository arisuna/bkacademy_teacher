/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.date-picker-input')
        .directive('dateTimePickerInputMda', dateTimePickerInputMda);

    dateTimePickerInputMda.$inject = ['urlBase', 'moment', '$filter', '$mdpDatePicker', '$mdpTimePicker','$mdDateLocale'];

    function dateTimePickerInputMda(urlBase, moment, $filter, $mdpDatePicker, $mdpTimePicker, $mdDateLocale) {

        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                label: '@?',
                name: '<?',
                inputType: '@?',//date or milisecondes
                outputType: '@',//date or milisecondes,
                onAfterSave: '&?onAfterSave',

            },
            templateUrl: urlBase.tplApp('gms', '_directives_date', 'date-time-mda'),
            link: function (scope, element, attrs, timeout, $mdpDatePicker, $mdpTimePicker) {
                if (angular.isUndefined(scope.name) || scope.name == '') {
                    scope.name = "date" + Math.random();
                }

                if (angular.isUndefined(scope.type) || scope.type == '') {
                    scope.type = "date";
                }

                if (angular.isUndefined(scope.outputType) || scope.outputType == '') {
                    scope.outputType = "timestamp";
                }

                if (angular.isUndefined(scope.inputType) || scope.inputType == '') {
                    scope.inputType = "timestamp";
                }

                scope.currentDate = null;
                scope.initValue = function () {
                    if (scope.inputType == 'date') {
                        if (scope.model != '' && ( scope.currentDate == '' || scope.currentDate == null )) {
                            scope.currentDate = new Date(scope.model);
                        }
                    } else {
                        if (scope.model > 0 && ( scope.currentDate == '' || scope.currentDate == null )) {
                            if (Number.isInteger(scope.model)) {
                                scope.currentDate = moment(scope.model * 1000).local().toDate();
                            }
                        }
                    }
                    if (scope.model == null) {
                        scope.currentDate = null;
                    }
                };
                scope.$watch('model', function( value ){
                    scope.initValue()
                })

            },
            controller: function ($scope, $element, $attrs, $timeout, $mdpDatePicker, $mdpTimePicker) {
                $scope.currentDate = null;
                $scope.initValue = function () {
                    if ($scope.inputType == 'date') {
                        if ($scope.model != '' && ( $scope.currentDate == '' || $scope.currentDate == null )) {
                            $scope.currentDate = new Date($scope.model);
                        }
                    } else {
                        if ($scope.model > 0 && ( $scope.currentDate == '' || $scope.currentDate == null )) {
                            if (Number.isInteger($scope.model)) {
                                $scope.currentDate = moment($scope.model * 1000).local().toDate();
                            }
                        }
                    }
                    if ($scope.model == null) {
                        $scope.currentDate = null;
                    }
                };
                $timeout(function () {
                    $scope.initValue();
                });

                $attrs.$observe('ngModel', function (passedValue) {});
                $mdDateLocale.formatDate = function (date) {
                    return $filter('date')(date, "dd/MM/yyyy");
                };


                $scope.changeValue = function () {
                    console.log(' change value');
                    if ($scope.outputType == 'date') {
                        if ($scope.currentDate != '' && $scope.currentDate != null && $scope.currentDate != undefined) {
                            $scope.model = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.currentDate)), 'YYYY-MM-DD HH:mm:ss');
                        } else {
                            $scope.model = null;
                        }
                    } else {
                        if ($scope.currentDate != '' && $scope.currentDate != null && $scope.currentDate != undefined) {
                            $scope.model = moment($scope.currentDate).utc().valueOf();
                        } else {
                            $scope.model = null;
                        }
                    }

                    if (angular.isDefined($scope.onAfterSave)) {
                        // Debounce
                        if ($scope.promise) {
                            $timeout.cancel($scope.promise);
                        }
                        $scope.promise = $timeout(function () {
                            $scope.onAfterSave();
                            $timeout.cancel($scope.promise);
                        });
                    }
                }
            }
        };

        return directive;
    }

})();
