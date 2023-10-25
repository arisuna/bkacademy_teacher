/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.date-picker-input')
        .directive('datePickerInputMda', datePickerInputMda);

    datePickerInputMda.$inject = ['urlBase', 'moment', '$filter', '$mdDateLocale'];

    function datePickerInputMda(urlBase, moment, $filter, $mdDateLocale) {

        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                label: '@?',
                name: '<?',
                showLabel: '<?',
                inputType: '@?',
                outputType: '@',
                onAfterSave: '&?onAfterSave',
            },
            templateUrl: urlBase.tplApp('gms', '_directives_date', 'mda'),
            link: function (scope, element, attrs, timeout, mdDateLocale) {
                if (angular.isUndefined(scope.name) || scope.name == '') {
                    scope.name = "date" + Math.random();
                }
                if (angular.isUndefined(scope.showLabel) || scope.showLabel == true) {
                    scope.showLabel = true;
                } else {
                    scope.showLabel = false;
                }

                if (angular.isUndefined(scope.outputType) || scope.outputType == '') {
                    scope.outputType = "date";
                }

                if (angular.isUndefined(scope.inputType) || scope.inputType == '') {
                    scope.inputType = "date";
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
            controller: function ($scope, $element, $attrs, $timeout, $mdDateLocale) {
                $scope.currentDate = null;
                $attrs.$observe('ngModel', function (passedValue) {});
                $mdDateLocale.formatDate = function (date) {
                    return $filter('date')(date, "dd/MM/yyyy");
                };
                $scope.changeValue = function () {
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
