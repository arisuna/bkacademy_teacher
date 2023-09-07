(function () {
    'use strict';
    App.controller('ProductModelListApiController', ['$scope', '$state', '$timeout', '$rootScope', '$translate',
        'WaitingService', 'AppModelService', 'ngDialog', 'urlBase',
        function ($scope, $state, $timeout, $rootScope, $translate, WaitingService, AppModelService, ngDialog, urlBase) {


            $scope.module_name = 'models';

            $scope.column_array = [
                {
                    "name": "created_at",
                    "datatype": "datetime",
                    "label": "",
                    'descending': false,
                    "sortText": $translate.instant("FIRST_CREATED_ORDER_TEXT"),
                },
                {
                    "name": "created_at",
                    "datatype": "datetime",
                    "label": "",
                    'descending': true,
                    "sortText": $translate.instant("LAST_CREATED_ORDER_TEXT")
                },
                {
                    "name": "name",
                    "datatype": "string",
                    "label" : "NAME_TEXT",
                    'descending': false,
                    "sortText" : $translate.instant("ALPHABET_UP_TEXT"),
                },
                {
                    "name": "name",
                    "datatype": "string",
                    "label" : "NAME_TEXT",
                    'descending': true,
                    "sortText" : $translate.instant("ALPHABET_DOWN_TEXT")
                },
            ];
            $scope.loading = true;
            $scope.items = [];
            $scope.totalPages = 0;
            $scope.totalItems = 0;
            $scope.current = 0;

            $scope.loadingMore = false;
            $scope.isInitialLoading = false;

            $scope.loadCount = 0;
            $scope.totalPages = 1;
            $scope.currentPage = 0;

            $scope.search = {
                query: null,
                filterConfigId: null,
                isTmp: false,
                orders: {},
            };

            $scope.loadList = function () {
                $scope.params = {};
                $scope.params.page = 0;
                $scope.params.brand_id = $scope.object.id;
                $scope.params.query = $scope.search.query;
                $scope.params.limit = 20;
                $scope.params.orders = $scope.search.orders;
                if (!_.isEmpty($scope.sort)){
                    $scope.params.orders = [$scope.sort];
                }
                $scope.params.filter_config_id = $scope.search.filterConfigId;
                $scope.params.is_tmp = $scope.search.isTmp;


                AppModelService.getList($scope.params).then(function (res) {
                    if (res.success) {
                        $scope.items = res.data;
                        $scope.totalPages = res.total_pages;
                        $scope.currentPage = res.current;
                    } else {
                        WaitingService.expire();
                    }
                    $timeout(function () {
                        $scope.loadingMore = false;
                        $scope.isInitialLoading = false;
                    }, 1000)
                }, function () {
                    WaitingService.expire();
                    $timeout(function () {
                        $scope.loadingMore = false;
                        $scope.isInitialLoading = false;
                    }, 1000)
                });
            }

            $scope.loadMore = function () {
                if ($scope.loadingMore === false && $scope.currentPage < $scope.totalPages) {
                    $scope.loadingMore = true;
                    $scope.params = {};
                    $scope.params.limit = 20;
                    $scope.params.page = $scope.currentPage + 1;
                    $scope.params.orders = $scope.search.orders;
                    if (!_.isEmpty($scope.sort)){
                        $scope.params.orders = [$scope.sort];
                    }
                    $scope.params.filter_config_id = $scope.search.filterConfigId;
                    $scope.params.is_tmp = $scope.search.isTmp;

                    AppModelService.getList($scope.params).then(function (res) {
                        if (res.success) {
                            $scope.items = $scope.items.concat(res.data);
                            $scope.totalPages = res.total_pages;
                            $scope.currentPage = res.current;
                        } else {
                            WaitingService.expire();
                        }
                        $timeout(function () {
                            $scope.loadingMore = false;
                            $scope.isInitialLoading = false;
                        }, 1000)
                    }, function () {
                        WaitingService.expire();
                        $timeout(function () {
                            $scope.loadingMore = false;
                            $scope.isInitialLoading = false;
                        }, 1000)
                    });
                }
            };

            $scope.reloadInit = function () {
                $scope.isInitialLoading = true;
                $scope.loadCount = 0;
                $scope.totalPages = 1;
                $scope.currentPage = 1;
                $scope.currentPage = 1;
                $scope.items = [];
                $scope.loadList();
            };

            if($scope.object && $scope.object.id){
                console.log('$scope.object.id', $scope.object.id);
                $scope.reloadInit();
            }

            $scope.subscribe('apply_filter_config_models', function (filterConfigId) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = filterConfigId;
                $scope.search.isTmp = true;
                console.log('Execute filter');
                $scope.reloadInit();
            });

            $scope.subscribe('sort_by_column_and_order_models', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.orders = [data];
                $scope.sort = {};
                $scope.reloadInit();
            });

            $scope.subscribe('text_search_models', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.query = data;
                // GmsFilterConfigService.setFilterQuery($scope.module_name, $scope.currentUser.uuid, data);
                $scope.reloadInit();
            });

            $scope.subscribe('clear_filter_config', function () {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = null;
                $scope.search.isTmp = false;
                $scope.search.orders = {};
                $scope.sort = {};
                $scope.search.query = null;
                $scope.reloadInit();
            });

            $scope.deleteFn = function (item, index) {
                WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_PRODUCT_MODEL_TEXT', function () {
                    AppModelService.deleteModel(item.uuid).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.reloadInit();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };

            $scope.cloneFn = function(productModel){
                $scope.cloneDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'make', 'form-product-model-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        productModel: productModel,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppModelService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppModelService, $state) {
                            $scope.productModel = $scope.ngDialogData.productModel;
                            $scope.page_loading = true;
                            $scope.isClone = true;
                            $scope.getDetailFn = function () {
                                AppModelService.detailModel($scope.productModel.uuid).then(
                                    function (res) {
                                        if (res.success) {
                                            $scope.productModel = res.data;
                                        } else {
                                            WaitingService.error(res.msg);
                                        }
                                        $scope.page_loading = false;
                                    },
                                    function (error) {
                                        WaitingService.expire(error);
                                        $scope.page_loading = false;
                                    }
                                );
                            };
                            $scope.getDetailFn();


                            $scope.saveFn = function () {
                                let object = angular.copy($scope.productModel);
                                object.id = 0;
                                object.uuid = 0;

                                AppModelService.createModel(object).then(function (res) {
                                    if (res.success) {
                                        $scope.closeThisDialog(res.data);
                                        WaitingService.popSuccess('DATA_CLONE_SUCCESS_TEXT');
                                    } else {
                                        WaitingService.popError(res.message);
                                    }
                                    $scope.saving = false;
                                }, function (err) {
                                    WaitingService.popError(err);
                                })

                            }

                        }]
                });
                $scope.cloneDialog.closePromise.then(function (data) {
                    if(data && data.value && data.value.uuid){
                        $scope.items.unshift(data.value);
                    }
                });
            }


            $scope.createFn = function(){
                let productModel = {
                    uuid: "",
                    brand_id: $scope.object.id,
                    status: 1,
                };

                console.log('object', $scope.object.id);
                $scope.createDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'make', 'form-product-model-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        productModel: productModel,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppModelService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppModelService, $state) {
                            $scope.productModel = $scope.ngDialogData.productModel;
                            $scope.saveFn = function(){
                                AppModelService.createModel($scope.productModel).then(function (res) {
                                    if (res.success) {
                                        $scope.closeThisDialog(res.data);
                                        WaitingService.popSuccess(res.message);
                                    } else {
                                        WaitingService.popError(res.message);
                                    }
                                    $scope.saving = false;
                                }, function (err) {
                                    WaitingService.popError(err);
                                })
                            }

                        }]
                });
                $scope.createDialog.closePromise.then(function (data) {
                    console.log('data', data);
                    if(data && data.value && data.value.uuid){
                        $scope.items.unshift(data.value);
                    }

                });
            }

            $scope.editFn = function(productModel){
                console.log('productModel', productModel);
                $scope.editDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'make', 'form-product-model-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        productModel: productModel,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppModelService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppModelService, $state) {
                            $scope.productModel = $scope.ngDialogData.productModel;
                            $scope.page_loading = true;

                            $scope.getDetailFn = function () {
                                AppModelService.detailModel($scope.productModel.uuid).then(
                                    function (res) {
                                        if (res.success) {
                                            $scope.productModel = res.data;
                                        } else {
                                            WaitingService.error(res.msg);
                                        }
                                        $scope.page_loading = false;
                                    },
                                    function (error) {
                                        WaitingService.expire(error);
                                        $scope.page_loading = false;
                                    }
                                );
                            };
                            $scope.getDetailFn();

                            $scope.saveFn  = function(){
                                if($scope.productModel.id > 0){
                                    AppModelService.updateModel($scope.productModel).then(function (res) {
                                        if (res.success) {
                                            $scope.closeThisDialog(res.data);

                                            WaitingService.popSuccess(res.message);
                                        } else {
                                            WaitingService.popError(res.message);
                                        }
                                        $scope.saving = false;
                                    }, function (err) {
                                        WaitingService.popError(err);
                                    })
                                }

                            }



                        }]
                });
                $scope.editDialog.closePromise.then(function (data) {
                    if(data && data.value && data.value.uuid){
                        let _index = _.findIndex($scope.items, function(o){
                            return o.uuid == data.value.uuid;
                        })
                        console.log('data.value', data.value)
                        if (_index != 1){
                            $scope.$evalAsync(function(){
                                $scope.items[_index] = _.cloneDeep(data.value);
                            })
                        }
                    }
                });
            }
        }]);
})();
