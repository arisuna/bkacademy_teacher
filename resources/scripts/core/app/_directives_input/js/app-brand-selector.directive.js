(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appBrandSelector', appBrandSelector);

    appBrandSelector.$inject = ['Utils', 'urlBase', 'AppMakeService', 'ngDialog'];

    function appBrandSelector(Utils, urlBase, AppMakeService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                brandId: '=ngModel',
                brand: '=?',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-brand-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'BRAND_TEXT';
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
                if (angular.isUndefined(scope.brand)) {
                    scope.brand = null;
                }

                scope.realName = "brand_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.brandId > 0) {
                        AppMakeService.detailMake($scope.brandId).then(function (res) {
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


                $scope.resetBrand = function () {
                    $scope.data.selected = angular.copy({id: null, uuid: null});
                    $scope.brand = null;
                    $scope.brandId = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectBrand = function (selectedBrand) {
                    $scope.data.selected = angular.copy(selectedBrand);
                    $scope.brandId = angular.copy(selectedBrand.id);
                    $scope.brand = angular.copy(selectedBrand);
                    if (angular.isDefined($scope.brandId) && $scope.brandId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('brandId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-brand-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'AppMakeService', 'Utils', function ($scope, $element, $timeout, AppMakeService, Utils) {

                            $scope.brandes = [];

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

                            $scope.selectItem = function (member) {
                                $scope.closeThisDialog(member);
                            }

                            $scope.initSearch = function () {
                                $scope.brandes = [];
                                $scope.currentPage = 0;
                                $scope.totalPages = 0;
                                $scope.isLoading = true;
                                AppMakeService.getList({
                                    query: $scope.searchConfig.query,
                                    page: 1
                                }).then(function (res) {
                                    $scope.brandes = res.data;
                                    $scope.isLoading = false;
                                    $scope.totalItems = res.total_items;
                                    $scope.totalPages = res.total_pages;
                                    $scope.currentPage = res.current;
                                }, function () {
                                    $scope.isLoading = false;
                                    $scope.brandes = [];
                                });
                            }

                            $scope.loadMore = function () {
                                if ($scope.totalPages > $scope.currentPage) {
                                    $scope.isLoadingMore = true;
                                    AppMakeService.getList({
                                        query: $scope.searchConfig.query,
                                        page: $scope.currentPage + 1
                                    }).then(function (res) {
                                        $scope.brandes = _.concat($scope.brandes, res.data);
                                        $scope.isLoadingMore = false;
                                        $scope.totalItems = res.total_items;
                                        $scope.totalPages = res.total_pages;
                                        $scope.currentPage = res.current;
                                    }, function () {
                                        $scope.isLoadingMore = false;
                                        $scope.brandes = [];
                                    });
                                }
                            };

                            $scope.initSearch();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.selectBrand(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
