(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appTeacherSelector', appTeacherSelector);

    appTeacherSelector.$inject = ['Utils', 'urlBase', 'ngDialog', 'AppUserService'];

    function appTeacherSelector(Utils, urlBase, ngDialog, AppUserService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                teacher: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-teacher-selector-item'),

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
                if (angular.isUndefined(scope.teacher)) {
                    scope.teacher = null;
                }

                scope.realName = "teacher_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {

                $scope.data = {
                    selected: {
                        id: null,
                        name: null
                    }
                };

                $scope.initFn = function () {
                    if ($scope.teacher > 0) {
                        AppUserService.getUserDetail($scope.teacher).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            name: null
                        };
                    }
                };

                $scope.initFn();

                $scope.$watch('teacher', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.initFn();
                    }
                });


                $scope.resetItem = function () {
                    $scope.teacher = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.teacher = angular.copy(selectedItem.id);
                    $scope.data.selected = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-teacher-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'Utils', 'AppUserService', function ($scope, $element, $timeout, Utils, AppUserService) {

                            $scope.teachers = [];

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
                                $scope.teachers = [];
                                AppUserService.getTeacherList().then(function (res) {
                                    if (res.success == true) {
                                        $scope.teachers = res.data;
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
