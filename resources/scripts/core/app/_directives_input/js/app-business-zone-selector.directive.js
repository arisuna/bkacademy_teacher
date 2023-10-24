(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appBusinessZoneSelector', appBusinessZoneSelector);

    appBusinessZoneSelector.$inject = ['Utils', 'urlBase', 'AppBusinessZoneService', 'ngDialog'];

    function appBusinessZoneSelector(Utils, urlBase, AppBusinessZoneService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-business-zone-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'MODEL_TEXT';
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
                if (angular.isUndefined(scope.model)) {
                    scope.model = null;
                }

                scope.realName = "model_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.uuid) {
                        AppBusinessZoneService.detailBusinessZone($scope.uuid).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetFn = function () {
                    $scope.data.selected = angular.copy({id: null, uuid: null});
                    $scope.uuid = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectFn = function (selected) {
                    $scope.data.selected = angular.copy(selected);
                    $scope.uuid = angular.copy(selected.uuid);
                    if (angular.isDefined($scope.uuid) && $scope.uuid) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('uuid', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-business-zone-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,

                        controller: ['$scope', '$element', '$timeout', 'AppBusinessZoneService', 'Utils',
                            function ($scope, $element, $timeout, AppBusinessZoneService, Utils) {

                            $scope.items = [];

                            $scope.totalItems = 0;
                            $scope.totalPages = 0;
                            $scope.currentPage = 0;
                            $scope.totalRestItems = 0;

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    id: null,
                                },
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                            $scope.initSearch = function () {
                                $scope.modeles = [];
                                $scope.currentPage = 0;
                                $scope.totalPages = 0;
                                $scope.isLoading = true;
                                AppBusinessZoneService.search({
                                    query: $scope.searchConfig.query,
                                    page: 1,
                                }).then(function (res) {
                                    $scope.items = res.data;
                                    $scope.isLoading = false;
                                    $scope.totalItems = res.total_items;
                                    $scope.totalPages = res.total_pages;
                                    $scope.currentPage = res.current;
                                }, function () {
                                    $scope.isLoading = false;
                                    $scope.items = [];
                                });
                            }

                            $scope.loadMore = function () {
                                if ($scope.totalPages > $scope.currentPage) {
                                    $scope.isLoadingMore = true;
                                    AppBusinessZoneService.search({
                                        query: $scope.searchConfig.query,
                                        page: $scope.currentPage + 1,
                                        brand_id: $scope.brandId
                                    }).then(function (res) {
                                        $scope.items = _.concat($scope.items, res.data);
                                        $scope.isLoadingMore = false;
                                        $scope.totalItems = res.total_items;
                                        $scope.totalPages = res.total_pages;
                                        $scope.currentPage = res.current;
                                    }, function () {
                                        $scope.isLoadingMore = false;
                                        $scope.items = [];
                                    });
                                }
                            };

                            $scope.initSearch();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.selectFn(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
