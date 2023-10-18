(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appYearSelector', appYearSelector);

    appYearSelector.$inject = ['Utils', 'urlBase', 'AppProductService', 'ngDialog'];

    function appYearSelector(Utils, urlBase, AppProductService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                year: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-year-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'YEAR_TEXT';
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
                if (angular.isUndefined(scope.year)) {
                    scope.year = null;
                }

                scope.realName = "year_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {


                $scope.resetItem = function () {
                    $scope.year = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.year = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-year-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'AppProductService', 'Utils', function ($scope, $element, $timeout, AppProductService, Utils) {

                            $scope.years = [];

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
                                $scope.years = [];
                                var currentYear=new Date().getFullYear();
                                console.log(currentYear);
                                for(var i = 1979; i <= currentYear; i++)  $scope.years.push(i);
                                console.log($scope.years);
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
