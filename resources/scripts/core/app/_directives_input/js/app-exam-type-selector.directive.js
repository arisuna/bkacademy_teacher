(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appExamTypeSelector', appExamTypeSelector);

    appExamTypeSelector.$inject = ['Utils', 'urlBase', 'ngDialog', 'AppExamTypeService'];

    function appExamTypeSelector(Utils, urlBase, ngDialog, AppExamTypeService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                examType: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-exam-type-selector-item'),

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
                if (angular.isUndefined(scope.examType)) {
                    scope.examType = null;
                }

                scope.realName = "examType_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {

                $scope.data = {
                    selected: {
                        id: null,
                        name: null
                    }
                };

                $scope.initFn = function () {
                    if ($scope.examType > 0) {
                        AppExamTypeService.detailExamType($scope.examType).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                                $scope.address =  angular.copy(res.data);
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            name: null
                        };
                    }
                };
                $scope.$watch('examType', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.initFn();
                    }
                });

                $scope.initFn();

                $scope.resetItem = function () {
                    $scope.examType = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.examType = angular.copy(selectedItem.id);
                    $scope.data.selected = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-exam-type-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'Utils', 'AppExamTypeService', function ($scope, $element, $timeout, Utils, AppExamTypeService) {

                            $scope.examTypes = [];

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
                                $scope.examTypes = [];
                                AppExamTypeService.getList().then(function (res) {
                                    if (res.success == true) {
                                        $scope.examTypes = res.data;
                                    }
                                    $scope.isLoading = false;
                                });
                                
                            }

                            $scope.initSearch();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && returnData.value.id > 0) {
                            $scope.selectItem(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
