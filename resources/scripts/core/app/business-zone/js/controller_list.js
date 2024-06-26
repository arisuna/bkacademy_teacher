(function () {
    'use strict';
    App.controller('BusinessZoneListApiController', ['$scope', '$state', '$timeout', '$rootScope', '$translate',
        'WaitingService', 'AppBusinessZoneService', 'ngDialog', 'urlBase', 'AppFilterConfigService',
        function ($scope, $state, $timeout, $rootScope, $translate,
                  WaitingService, AppBusinessZoneService, ngDialog, urlBase, AppFilterConfigService) {


            $scope.module_name = 'business_zones';

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
            $scope.isInitialisInitialLoading = false;
            $scope.list_statuses = AppFilterConfigService.getBusinessZoneStatusList();

            $scope.loadCount = 0;
            $scope.totalPages = 1;
            $scope.currentPage = 0;

            $scope.search = {
                query: null,
                filterConfigId: null,
                selected_statuses: [],
                isTmp: false,
                orders: {},
            };

            $scope.loadList = function () {
                $scope.params = {};
                $scope.params.page = 0;
                $scope.params.query = $scope.search.query;
                $scope.params.limit = 20;
                $scope.params.orders = $scope.search.orders;
                if (!_.isEmpty($scope.sort)){
                    $scope.params.orders = [$scope.sort];
                }
                $scope.params.filter_config_id = $scope.search.filterConfigId;
                $scope.params.is_tmp = $scope.search.isTmp;
                if (_.size($scope.search.selected_statuses) > 0) {
                    $scope.params.statuses = _.map($scope.search.selected_statuses, 'id');
                }

                AppBusinessZoneService.search($scope.params).then(function (res) {
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
                    if (_.size($scope.search.selected_statuses) > 0) {
                        $scope.params.statuses = _.map($scope.search.selected_statuses, 'id');
                    }

                    AppBusinessZoneService.search($scope.params).then(function (res) {
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
                $scope.items = [];
                $scope.loadList();
            };

            $scope.reloadInit();

            $scope.clearFilter = function(){
                $scope.search = {
                    query: null,
                    filterQuery: null,
                    selected_statuses: [],
                    filterConfigId: null,
                    isTmp: false,
                    orders: {},
                };

                $scope.publish('clearFilter');
                $scope.reloadInit();
            };

            $scope.$watchGroup(['search.selected_statuses'], function(){
                $scope.reloadInit();
            });

            $scope.applyFilter = function(){
                $scope.reloadInit();
            };

            $scope.subscribe('apply_filter_config_business_zones', function (filterConfigId) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = filterConfigId;
                $scope.search.isTmp = true;
                console.log('Execute filter');
                $scope.reloadInit();
            });

            $scope.subscribe('sort_by_column_and_order_business_zones', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.orders = [data];
                $scope.sort = {};
                $scope.reloadInit();
            });

            $scope.subscribe('text_search_business_zones', function (data) {
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
                WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_BUSINESS_PARK_TEXT', function () {
                    AppBusinessZoneService.deleteBusinessZone(item.uuid).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.reloadInit();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };


            $scope.cloneFn = function(business_zone){
                $scope.cloneDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'business-zone', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        business_zone: business_zone,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppBusinessZoneService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppBusinessZoneService, $state) {
                            $scope.object = $scope.ngDialogData.business_zone;
                            $scope.page_loading = true;
                            $scope.isClone = true;
                            $scope.getDetailFn = function () {
                                AppBusinessZoneService.detailBusinessZone($scope.object.uuid).then(
                                    function (res) {
                                        if (res.success) {
                                            $scope.object = res.data;
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
                                let object = angular.copy($scope.object);
                                object.id = 0;
                                object.uuid = 0;

                                AppBusinessZoneService.createBusinessZone(object).then(function (res) {
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
                let business_zone = {
                    uuid: ""
                };
                $scope.createDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'business-zone', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        business_zone: business_zone,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppBusinessZoneService', '$state',
                    function ($scope, $element, $timeout, WaitingService, AppBusinessZoneService, $state) {
                        $scope.object = $scope.ngDialogData.business_zone;
                        $scope.saveFn = function(){
                            AppBusinessZoneService.createBusinessZone($scope.object).then(function (res) {
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

            $scope.editFn = function(business_zone){
                console.log('business_zone', business_zone);
                $scope.editDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'business-zone', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        business_zone: business_zone,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppBusinessZoneService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppBusinessZoneService, $state) {
                            $scope.object = $scope.ngDialogData.business_zone;
                            $scope.page_loading = true;

                            $scope.getDetailFn = function () {
                                AppBusinessZoneService.detailBusinessZone($scope.object.uuid).then(
                                    function (res) {
                                        if (res.success) {
                                            $scope.object = res.data;
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
                                if($scope.object.id > 0){
                                    AppBusinessZoneService.updateBusinessZone($scope.object).then(function (res) {
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
