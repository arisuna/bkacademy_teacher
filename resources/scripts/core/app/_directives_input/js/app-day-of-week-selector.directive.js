(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appDayOfWeekSelector', appDayOfWeekSelector);

        appDayOfWeekSelector.$inject = ['Utils', 'urlBase', 'ngDialog'];

    function appDayOfWeekSelector(Utils, urlBase, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                dayOfWeek: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-day-of-week-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'DAY_OF_WEEK_TEXT';
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
                if (angular.isUndefined(scope.dayOfWeek)) {
                    scope.dayOfWeek = null;
                }

                scope.realName = "day_of_week_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.items = [
                    {value : 1, label: 'MONDAY_TEXT'},
                    {value : 2, label: 'TUESDAY_TEXT'},
                    {value : 3, label: 'WEDNESDAY_TEXT'},
                    {value : 4, label: 'THURSDAY_TEXT'},
                    {value : 5, label: 'FRIDAY_TEXT'},
                    {value : 6, label: 'SATURDAY_TEXT'},
                    {value : 7, label: 'SUNDAY_TEXT'},
                ];

                $scope.resetItem = function () {
                    $scope.dayOfWeek = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.dayOfWeek = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    console.log("open");

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-day-of-week-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'Utils', function ($scope, $element, $timeout, Utils) {

                            $scope.items = [
                                {value : 1, label: 'MONDAY_TEXT'},
                                {value : 2, label: 'TUESDAY_TEXT'},
                                {value : 3, label: 'WEDNESDAY_TEXT'},
                                {value : 4, label: 'THURSDAY_TEXT'},
                                {value : 5, label: 'FRIDAY_TEXT'},
                                {value : 6, label: 'SATURDAY_TEXT'},
                                {value : 7, label: 'SUNDAY_TEXT'},
                            ];

                            $scope.totalItems = 7;
                            $scope.totalPages = 1;
                            $scope.currentPage = 1;
                            $scope.totalRestItems = 0;

                            $scope.isLoading = false;

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && returnData.value.value > 0) {
                            $scope.selectItem(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
