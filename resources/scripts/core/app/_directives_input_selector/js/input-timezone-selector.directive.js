(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputTimezoneSelector', inputTimezoneSelector);

    inputTimezoneSelector.$inject = ['ngDialog', 'GmsSystem', 'urlBase', 'DataService', 'AppDataService', 'Utils'];

    function inputTimezoneSelector(ngDialog, GmsSystem, urlBase, DataService, AppDataService, Utils) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<?',
                label: '@',
                showLabel: '<?',
                requiredMessage: '@',
                ngChange: '&?',
                isEditable: '<?',
                position: '@?'
            },

            templateUrl: urlBase.tplBase('base-modules/input-selector', 'timezone-item'),
            link: function (scope, element, attrs) {
                scope.realName = "CURRENCY_" + _.uniqueId();

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'CURRENCY_TEXT';
                }


                if (angular.isUndefined(scope.isRequired) || scope.isRequired == '' || _.isNull(scope.isRequired)) {
                    scope.isRequired = false;
                }

                if (angular.isUndefined(scope.showLabel)) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'TIMEZONE_REQUIRED_TEXT';
                }
            },

            controller: function ($scope, $element, $attrs) {

                $scope.uniqueId = _.uniqueId();

                $scope.data = {
                    selected: {
                        name: null,
                        id: null,
                    }
                };

                $scope.getCurrentTimeZone = function () {
                    AppDataService.getTimeZone($scope.model).then(
                        function (res) {
                            if (res.success) {
                                $scope.data.selected = angular.copy(res.data);
                            }
                        }
                    );
                }


                $scope.initFn = function () {
                    if (angular.isDefined($scope.model) && $scope.model != '' && $scope.model != undefined) {
                        $scope.getCurrentTimeZone();
                    } else {
                        $scope.$watch("uuid", function (newValue, oldValue) {
                            if (angular.isDefined($scope.model) && $scope.model != '' && $scope.model != undefined) {
                                $scope.getCurrentTimeZone();
                            }
                        });
                    }
                }

                $scope.initFn();


                $scope.removeItem = function () {
                    $scope.data.selected = {
                        name: null,
                        id: null,
                    }
                    $scope.model = null;
                };


                $scope.updateValue = function (timeZone) {
                    console.log(timeZone);
                    $scope.data.selected = angular.copy(timeZone);
                    $scope.model = angular.copy(timeZone.id);
                }


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 350);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/input-selector', 'timezone-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'GmsMemberService', 'Utils', function ($scope, $element, $timeout, GmsMemberService, Utils) {

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    id: null,
                                },
                                filterQuery: ""
                            };
                            $scope.timezones = [];
                            $scope.isLoading = true;

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (timeZone) {
                                $scope.closeThisDialog(timeZone);
                            }


                            $scope.getTimezoneList = function () {
                                $scope.timezones = [];
                                $scope.isLoading = true;
                                DataService.getTimezoneList().then(function (res) {
                                    if (res.success) {
                                        $scope.timezones = res.data;
                                    }
                                    $scope.isLoading = false;
                                });
                            }
                            $scope.getTimezoneList();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.id) && returnData.value.id > 0) {
                            $scope.updateValue(returnData.value);
                        }
                    })
                };
            }
        };
        return directive;
    }

})();
