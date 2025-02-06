(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appScheduleSelector', appScheduleSelector);

    appScheduleSelector.$inject = ['Utils', 'urlBase', 'ngDialog'];

    function appScheduleSelector(Utils, urlBase, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                schedule: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-schedule-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'GRADE_TEXT';
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == null) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == null) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }
                scope.day_of_weeks = [
                    {value : 1, label: 'MONDAY_TEXT'},
                    {value : 2, label: 'TUESDAY_TEXT'},
                    {value : 3, label: 'WEDNESDAY_TEXT'},
                    {value : 4, label: 'THURSDAY_TEXT'},
                    {value : 5, label: 'FRIDAY_TEXT'},
                    {value : 6, label: 'SATURDAY_TEXT'},
                    {value : 7, label: 'SUNDAY_TEXT'},
                ];
                if (angular.isUndefined(scope.schedule)) {
                    scope.schedule = [];
                } else {
                    angular.forEach(scope.schedule, function(item){
                        angular.forEach(scope.day_of_weeks, function(day){
                            if(item.day_of_week == day.value){
                                item.day_of_week = day;
                            }
                        });
                    });
                }

                scope.realName = "schedule_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {


                $scope.add = function () {
                    let createDialog = ngDialog.open({
                        template: 'dialogPersonForm',
                        className: 'ngdialog-theme-default sm-box',
                        scope: $scope,
                        closeByDocument: false,
                        showClose: true,
                        controller: ['$rootScope', '$scope', '$http', '$q', 'AppDataService', 'WaitingService', 'HistoryService', '$filter', 'ngDialog',
                            function ($rootScope, $scope, $http, $q,  AppDataService, WaitingService, HistoryService, $filter, ngDialog) {
                                $scope.new_schedule = {
                                    day_of_week: {value : 1, label: 'MONDAY_TEXT'},
                                    from: 1738713647,
                                    to: 1738717247
                                }

                                /** createTaskFn **/
                                $scope.createUserTag = function () {
                                    $scope.closeThisDialog($scope.new_schedule);
                                }
                            }]
                    });
                    createDialog.closePromise.then(function (returnData) {
                        console.log(returnData);
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.day_of_week) && returnData.value.day_of_week.value > 0) {
                            console.log(returnData.value);
                            $scope.schedule.push(returnData.value);
                        }
                    });
                    
                }

                $scope.removeItem = function (item, index) {
                    $scope.schedule.splice(index, 1);
                };
            }
        };

        return directive;
    }

})();
