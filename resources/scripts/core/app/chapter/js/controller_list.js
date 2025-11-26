(function () {
    'use strict';
    App.controller('ChapterListApiController', ['$scope', '$state', '$timeout', '$rootScope', '$translate',
        'WaitingService', 'AppChapterService', 'ngDialog', 'urlBase', 'AppFilterConfigService',
        function ($scope, $state, $timeout, $rootScope, $translate,
                  WaitingService, AppChapterService, ngDialog, urlBase, AppFilterConfigService) {

            $scope.loading = true;
            $scope.items = [];
            $scope.totalPages = 0;
            $scope.totalItems = 0;
            $scope.current = 0;

            $scope.loadCount = 0;
            $scope.totalPages = 1;
            $scope.currentPage = 0;
            $scope.params = {
                chapter_types: [],
            };

            $scope.search = {};

            $scope.loadList = function () {
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

                AppChapterService.getList($scope.params).then(function (res) {
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

                    AppChapterService.search($scope.params).then(function (res) {
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

            $scope.subscribe('apply_filter_config_CHAPTER', function (filterConfigId) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.filterConfigId = filterConfigId;
                $scope.search.isTmp = true;
                console.log('Execute filter');
                $scope.reloadInit();
            });

            $scope.subscribe('sort_by_column_and_order_CHAPTER', function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.search.orders = [data];
                $scope.sort = {};
                $scope.reloadInit();
            });

            $scope.subscribe('text_search_CHAPTER', function (data) {
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

            $rootScope.$on('chapter_filter_update', function (event, data) {
                $scope.isLoading = true;
                $scope.loadCount = 0;
                if (data.grades && data.grades.length) {
                    $scope.params.grades = data.grades
                } else {
                    $scope.params.grades = []
                }
                if (data.chapter_types && data.chapter_types.length) {
                    $scope.params.chapter_types = data.chapter_types
                } else {
                    $scope.params.chapter_types = []
                }
                $timeout(function () {
                    $scope.items = [];
                    $scope.loadList();
                }, 1000);
            });

            $scope.deleteFn = function (item, index) {
                WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_CHAPTER_TEXT', function () {
                    AppChapterService.deleteChapter(item.uuid).then(function (res) {
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
                let chapter = {
                    uuid: ""
                };
                $scope.createDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'chapter', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        chapter: chapter,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppChapterService', '$state',
                    function ($scope, $element, $timeout, WaitingService, AppChapterService, $state) {
                        $scope.object = $scope.ngDialogData.chapter;
                        $scope.saveFn = function(){
                            AppChapterService.createChapter($scope.object).then(function (res) {
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

            $scope.editFn = function(chapter){
                console.log('chapter', chapter);
                $scope.editDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'chapter', 'form-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    showClose: true,
                    data: {
                        chapter: chapter,
                        view: false
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', 'AppChapterService', '$state',
                        function ($scope, $element, $timeout, WaitingService, AppChapterService, $state) {
                            $scope.object = $scope.ngDialogData.chapter;
                            $scope.page_loading = true;

                            $scope.getDetailFn = function () {
                                AppChapterService.detailChapter($scope.object.uuid).then(
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
                                    AppChapterService.updateChapter($scope.object).then(function (res) {
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
