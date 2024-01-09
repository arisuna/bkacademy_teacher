(function () {
    'use strict';
    App.controller('ExamTypeListApiController', ['$scope', '$state', '$timeout', '$rootScope', '$translate',
        'WaitingService', 'AppExamTypeService', 'ngDialog', 'urlBase', 'AppFilterConfigService',
        function ($scope, $state, $timeout, $rootScope, $translate,
                  WaitingService, AppExamTypeService, ngDialog, urlBase, AppFilterConfigService) {

            $scope.loading = true;
            $scope.items = [];
            $scope.totalPages = 0;
            $scope.totalItems = 0;
            $scope.current = 0;

            $scope.loadCount = 0;
            $scope.totalPages = 1;
            $scope.currentPage = 0;

            $scope.search = {};

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

                AppExamTypeService.getList($scope.params).then(function (res) {
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

                    AppExamTypeService.search($scope.params).then(function (res) {
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

            $scope.subscribe('apply_filter_config_EXAM_TYPE', function (filterConfigId) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = filterConfigId;
                $scope.search.isTmp = true;
                console.log('Execute filter');
                $scope.reloadInit();
            });

            $scope.subscribe('sort_by_column_and_order_EXAM_TYPE', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.orders = [data];
                $scope.sort = {};
                $scope.reloadInit();
            });

            $scope.subscribe('text_search_EXAM_TYPE', function (data) {
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
                WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_EXAM_TYPE_TEXT', function () {
                    AppExamTypeService.deleteExamType(item.uuid).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.reloadInit();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };


            $scope.createFn = function(){
                let exam_type = {
                    uuid: ""
                };
                $scope.createDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'exam-type', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        exam_type: exam_type,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppExamTypeService', '$state',
                    function ($scope, $element, $timeout, WaitingService, AppExamTypeService, $state) {
                        $scope.object = $scope.ngDialogData.exam_type;
                        $scope.saveFn = function(){
                            AppExamTypeService.createExamType($scope.object).then(function (res) {
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
                    $scope.reloadInit();

                });
            }

            $scope.editFn = function(exam_type){
                console.log('exam_type', exam_type);
                $scope.editDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'exam-type', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        exam_type: exam_type,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppExamTypeService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppExamTypeService, $state) {
                            $scope.object = $scope.ngDialogData.exam_type;
                            $scope.page_loading = true;

                            $scope.getDetailFn = function () {
                                AppExamTypeService.detailExamType($scope.object.uuid).then(
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
                                    AppExamTypeService.updateExamType($scope.object).then(function (res) {
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
                    $scope.reloadInit();
                });
            }

        }]);
})();
