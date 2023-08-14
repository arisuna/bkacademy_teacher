(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputZoneLang', inputZoneLang);

    inputZoneLang.$inject = ['$translate', 'Utils', 'urlBase', 'DataService', 'AppDataService', 'ngDialog'];

    function inputZoneLang($translate, Utils, urlBase, DataService, AppDataService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                isEditable: '<?',
                isRequired: '<?',
                label: '@',
                showLabel: '<?',
                requiredMessage: '@'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'zone-lang-selector-item'),
            link: function (scope, element, attrs) {
                scope.realName = "_zone_lang_" + _.uniqueId();

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'LANGUAGE_REGION_TEXT';
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == '') {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'LANGUAGE_REGION_TEXT';
                }
            },

            controller: function ($scope, $element, $attrs) {

                $scope.data = {
                    selected: {
                        code: null
                    }
                };

                $scope.removeItem = function () {
                    $scope.data.selected = {
                        code: null,
                    }
                    $scope.model = null;
                };

                $scope.initFn = function () {
                    if (_.isString($scope.model) && $scope.model != '') {
                        AppDataService.getZoneLangItem($scope.model).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = angular.copy(res.data);
                            }
                        });
                    }
                };

                $scope.initFn();

                $scope.$watch('model', function () {
                    $scope.initFn();
                });


                $scope.updateValue = function (zone_lang) {
                    $scope.data.selected = angular.copy(zone_lang);
                    $scope.model = angular.copy(zone_lang.code);
                }


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input_selector', 'zone-lang-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'GmsWorkersService', 'Utils', function ($scope, $element, $timeout, AppMemberService, Utils) {

                            $scope.zone_langs = [];

                            Utils.setPositionDropdownDialog(dialogPosition)

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    code: null,
                                },
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }


                            $scope.searchItems = function () {
                                $scope.isLoading = true;
                                DataService.getZoneLangList().then(function (res) {
                                    $scope.isLoading = false;
                                    if (res.success) {
                                        $scope.zone_langs = res.data;
                                    }
                                }, function () {
                                    $scope.isLoading = false;
                                });
                            };

                            $scope.searchItems();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.code) && returnData.value.code != '') {
                            $scope.updateValue(returnData.value);
                        }
                    })
                };
            }
        };
        return directive;
    }

})();
