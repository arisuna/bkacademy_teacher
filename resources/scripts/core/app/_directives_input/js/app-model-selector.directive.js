(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appModelSelector', appModelSelector);

    appModelSelector.$inject = ['Utils', 'urlBase', 'AppModelService', 'ngDialog'];

    function appModelSelector(Utils, urlBase, AppModelService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                modelId: '=ngModel',
                model: '=?',
                brandId: '<',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-model-selector-item'),

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
                    if ($scope.modelId > 0) {
                        AppModelService.detailModel($scope.modelId).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                                $scope.model =  angular.copy(res.data);
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetModel = function () {
                    $scope.data.selected = angular.copy({id: null, uuid: null});
                    $scope.model = null;
                    $scope.modelId = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.$watch('brandId', function () {
                    if ($scope.model!= null && angular.isDefined($scope.model.brand_id) && $scope.model.brand_id !=  $scope.brandId) {
                        console.log($scope.model.brand_id, $scope.brandId);
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                        $scope.model = null;
                        $scope.modelId = null;
                    }
                });

                $scope.selectModel = function (selectedModel) {
                    $scope.data.selected = angular.copy(selectedModel);
                    $scope.modelId = angular.copy(selectedModel.id);
                    $scope.model = angular.copy(selectedModel);
                    if (angular.isDefined($scope.modelId) && $scope.modelId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('modelId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-model-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        resolve: {
                            brandId: ['AppDataService', function (AppDataService) {
                                return $scope.brandId;
                            }],

                        },
                        controller: ['$scope', '$element', '$timeout', 'AppModelService', 'Utils', 'brandId', function ($scope, $element, $timeout, AppModelService, Utils, brandId) {

                            $scope.items = [];
                            $scope.brandId = brandId;

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
                                AppModelService.getList({
                                    query: $scope.searchConfig.query,
                                    page: 1,
                                    brand_id: $scope.brandId
                                }).then(function (res) {
                                    $scope.items = res.data;
                                    $scope.isLoading = false;
                                    $scope.totalItems = res.total_items;
                                    $scope.totalPages = res.total_pages;
                                    $scope.currentPage = res.current;
                                }, function () {
                                    $scope.isLoading = false;
                                    $scope.modeles = [];
                                });
                            }

                            $scope.loadMore = function () {
                                if ($scope.totalPages > $scope.currentPage) {
                                    $scope.isLoadingMore = true;
                                    AppModelService.getList({
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
                            $scope.selectModel(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
