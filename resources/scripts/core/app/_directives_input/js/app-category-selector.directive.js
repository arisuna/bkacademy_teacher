(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appCategorySelector', appCategorySelector);

    appCategorySelector.$inject = ['Utils', 'urlBase', 'AppCategoryService', 'ngDialog'];

    function appCategorySelector(Utils, urlBase, AppCategoryService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                categoryId: '=ngModel',
                category: '=?',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                parentId: '<?',
                subCategoryOnly: '<?',
                level1Only: '<?',
                isEditable: '<?',
                isDisable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-category-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'CATEGORY_TEXT';
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
                if (angular.isUndefined(scope.category)) {
                    scope.category = null;
                }

                if (angular.isUndefined(scope.subCategoryOnly)) {
                    scope.subCategoryOnly = false;
                }

                scope.realName = "category_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.categoryId > 0) {
                        AppCategoryService.detailCategory($scope.categoryId).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                                $scope.category =  angular.copy(res.data);
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetCategory = function () {
                    if(!$scope.isDisable){
                        $scope.data.selected = angular.copy({id: null, uuid: null});
                        $scope.category = null;
                        $scope.categoryId = null;
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                }

                $scope.$watch('parentId', function () {
                    if ($scope.category!= null && angular.isDefined($scope.category.parent_category_id) && $scope.category.parent_category_id !=  $scope.parentId) {
                        console.log($scope.category.parent_category_id, $scope.parentId);
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                        $scope.category = null;
                        $scope.categoryId = null;
                    }
                });

                $scope.selectCategory = function (selectedCategory) {
                    $scope.data.selected = angular.copy(selectedCategory);
                    $scope.categoryId = angular.copy(selectedCategory.id);
                    $scope.category = angular.copy(selectedCategory);
                    if (angular.isDefined($scope.categoryId) && $scope.categoryId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('categoryId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {
                    if(!$scope.isDisable){

                        let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                        let searchDialog = ngDialog.open({
                            template: urlBase.tplApp('app', '_directives_input', 'app-category-selector-search-dialog'),
                            className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                            showClose: false,
                            closeByDocument: true,
                            disableAnimation: true,
                            cache: true,
                            width: 300,
                            data: dialogPosition,
                            resolve: {
                                parentId: ['AppDataService', function (AppDataService) {
                                    return $scope.parentId;
                                }],
                                level1Only: ['AppDataService', function (AppDataService) {
                                    return $scope.level1Only;
                                }],

                            },
                            controller: ['$scope', '$element', '$timeout', 'AppCategoryService', 'Utils', 'parentId', 'level1Only', function ($scope, $element, $timeout, AppCategoryService, Utils, parentId, level1Only) {

                                $scope.items = [];
                                $scope.parentId = parentId;
                                $scope.level1Only = level1Only;

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
                                    $scope.categoryes = [];
                                    $scope.currentPage = 0;
                                    $scope.totalPages = 0;
                                    $scope.isLoading = true;
                                    if($scope.level1Only){
                                        AppCategoryService.getLevel1Items().then(function (res) {
                                            $scope.items = res.data;
                                            $scope.isLoading = false;
                                            $scope.totalItems = res.total_items;
                                            $scope.totalPages = res.total_pages;
                                            $scope.currentPage = res.current;
                                        }, function () {
                                            $scope.isLoading = false;
                                            $scope.items = [];
                                        });

                                    } else if($scope.parentId > 0){
                                        AppCategoryService.getChildrenItems($scope.parentId).then(function (res) {
                                            $scope.items = res.data;
                                            $scope.isLoading = false;
                                            $scope.totalItems = res.total_items;
                                            $scope.totalPages = res.total_pages;
                                            $scope.currentPage = res.current;
                                        }, function () {
                                            $scope.isLoading = false;
                                            $scope.items = [];
                                        });

                                    } else  {
                                        AppCategoryService.getList({
                                            query: $scope.searchConfig.query,
                                            page: 1,
                                            brand_id: $scope.parentId
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
                                }

                                $scope.loadMore = function () {
                                    if ($scope.totalPages > $scope.currentPage) {
                                        $scope.isLoadingMore = true;
                                        AppCategoryService.getList({
                                            query: $scope.searchConfig.query,
                                            page: $scope.currentPage + 1,
                                            brand_id: $scope.parentId
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
                                $scope.selectCategory(returnData.value);
                            }
                        })
                    }
                };
            }
        };

        return directive;
    }

})();
