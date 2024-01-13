(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appClassroomSelector', appClassroomSelector);

    appClassroomSelector.$inject = ['Utils', 'urlBase', 'ngDialog', 'AppClassroomService'];

    function appClassroomSelector(Utils, urlBase, ngDialog, AppClassroomService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                classroom: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-classroom-selector-item'),

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
                if (angular.isUndefined(scope.classroom)) {
                    scope.classroom = null;
                }

                scope.realName = "classroom_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {

                $scope.data = {
                    selected: {
                        id: null,
                        name: null
                    }
                };

                $scope.initFn = function () {
                    if ($scope.classroom > 0) {
                        AppClassroomService.getClassroomDetail($scope.classroom).then(function (res) {
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

                $scope.initFn();


                $scope.resetItem = function () {
                    $scope.classroom = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.classroom = angular.copy(selectedItem.id);
                    $scope.data.selected = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-classroom-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'Utils', 'AppClassroomService', function ($scope, $element, $timeout, Utils, AppClassroomService) {

                            $scope.classrooms = [];

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
                                $scope.classrooms = [];
                                AppClassroomService.getClassroomList().then(function (res) {
                                    if (res.success == true) {
                                        $scope.classrooms = res.data;
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
