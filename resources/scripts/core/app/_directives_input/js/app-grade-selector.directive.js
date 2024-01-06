(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appGradeSelector', appGradeSelector);

    appGradeSelector.$inject = ['Utils', 'urlBase', 'AppProductService', 'ngDialog'];

    function appGradeSelector(Utils, urlBase, AppProductService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                grade: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-grade-selector-item'),

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
                if (angular.isUndefined(scope.grade)) {
                    scope.grade = null;
                }

                scope.realName = "grade_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {


                $scope.resetItem = function () {
                    $scope.grade = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.grade = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-grade-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'AppProductService', 'Utils', function ($scope, $element, $timeout, AppProductService, Utils) {

                            $scope.grades = [];

                            $scope.totalItems = 0;
                            $scope.totalPages = 0;
                            $scope.currentPage = 0;
                            $scope.totalRestItems = 0;

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                            $scope.initSearch = function () {
                                $scope.isLoading = true;
                                $scope.grades = [];
                                for(var i = 1; i <= 12; i++)  $scope.grades.push(i);
                                $scope.isLoading = false;
                            }

                            $scope.initSearch();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && returnData.value > 0) {
                            $scope.selectItem(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
