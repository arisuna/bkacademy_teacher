(function () {
    'use strict';
    App.controller('ClassroomsListController', ['$scope', '$state', '$timeout', '$rootScope', '$translate', 'ngDialog', 'urlBase', 'WaitingService', 'AppDataService', 'AppClassroomService',
        function ($scope, $state, $timeout, $rootScope, $translate, ngDialog, urlBase, WaitingService, AppDataService, AppClassroomService) {
            $scope.params = {
                statuses: [],
            };
            $scope.isLoadingMore = false;
            $scope.isLoading = true;
            $scope.loadCount = 0;
            $scope.currentPage = 0;
            $scope.items = [];
            $scope.totalPages = 1;

            $scope.columns = [
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
                    "label": "NAME_TEXT",
                    'descending': false,
                    "sortText": $translate.instant("ALPHABET_UP_TEXT"),
                },
                {
                    "name": "name",
                    "datatype": "string",
                    "label": "NAME_TEXT",
                    'descending': true,
                    "sortText": $translate.instant("ALPHABET_DOWN_TEXT")
                },
            ];

            $scope.sort = {
                column: '',
                descending: undefined
            };

            $scope.loadPage = function () {
                $timeout(function () {
                    $scope.loadItems();
                }, 100);
            };

            $scope.loadItems = function () {
                $scope.items = [];
                $scope.loadCount = 1;
                $scope.currentPage = 0;
                $scope.isLoading = true;
                $scope.initItems();
            };

            $scope.initItems = function () {
                $scope.params.draw = $scope.loadCount;
                $scope.params.length = 20;
                $scope.params.start = ($scope.loadCount - 1) * 20;
                $scope.params.orders = [$scope.sort];
                $scope.params.query = $scope.query;

                AppClassroomService.getClassroomList($scope.params).then(function (res) {
                    if (res.success) {
                        $scope.items = $scope.loadCount > 1 ? $scope.dataList.concat(res.data) : res.data;
                        $scope.totalPages = res.total_pages;
                        $scope.currentPage = res.page;

                    } else {
                        WaitingService.expire();
                    }
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                }, function (err) {
                    WaitingService.expire();
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                });
            };

            $scope.loadMore = function () {
                console.log('loadMore');
                if ($scope.isLoadingMore == false) {
                    $scope.loadCount += 1;
                    $scope.getListMore();
                }
            };

            $scope.getListMore = function () {
                $scope.params.draw = $scope.loadCount;
                $scope.params.length = 20;
                $scope.params.start = ($scope.loadCount - 1) * 20;
                $scope.params.orders = [$scope.sort];
                $scope.params.query = $scope.query;
                if ($scope.currentPage > 0 && $scope.loadCount <= $scope.totalPages) {
                    $scope.isLoadingMore = true;
                }

                //console.log($scope.loadCount);
                if ($scope.loadCount == 1 || $scope.loadCount <= $scope.totalPages) {

                    AppClassroomService.getClassroomList($scope.params).then(function (res) {
                        if (res.success) {
                            $scope.dataList = $scope.loadCount > 1 ? $scope.dataList.concat(res.data) : res.data;
                            $scope.totalPages = res.total_pages;
                            $scope.currentPage = res.page;

                        } else {
                            WaitingService.expire();
                        }
                        $timeout(function () {
                            $scope.isLoadingMore = false;
                            $scope.isLoading = false;
                        }, 1000)
                    }, function (err) {
                        WaitingService.expire();
                        $timeout(function () {
                            $scope.isLoadingMore = false;
                            $scope.isLoading = false;
                        }, 1000)
                    });

                } else {
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                }
            };


            $rootScope.$on('classroom_filter_update', function (event, data) {
                $scope.isLoading = true;
                $scope.loadCount = 0;
                console.log("data", data, data.statuses)
                if (data.statuses && data.statuses.length) {
                    $scope.params.statuses = data.statuses.map(o => o.value)
                } else {
                    $scope.params.statuses = []
                }

                $timeout(function () {
                    $scope.items = [];
                    $scope.loadItems();
                }, 1000);

            });

            $scope.sortByColumnAndOrder = function (columnName, isDescending) {
                $scope.sort = {
                    column: columnName.toUpperCase(),
                    descending: isDescending
                };
                $scope.loadItems();
            };

            $scope.clearFilter = function () {
                $scope.query = "";
                $scope.sort = {};
                $scope.items = [];
                $scope.loadCount = 1;
                $scope.currentPage = 0;
                $scope.isLoading = true;
                $scope.publish('clearFilter');

                // $scope.initItems();
            };

            $scope.deleteFn = function (classroom, index) {
                WaitingService.questionWithInputText('YOU_SHOULD_ENTER_CODE_TO_CONFIRM_ACTION_TEXT', 'ENTER_CODE_TO_CONFIRM_DELETE_TEXT', null,
                    function (confirmText) {
                        if (confirmText) {
                            AppClassroomService.deleteClassroom(classroom.id, confirmText).then(function (res) {
                                if (res.success) {
                                    WaitingService.popSuccess(res.message);
                                    $scope.loadItems()
                                } else {
                                    WaitingService.error(res.message);
                                }
                            }, function (err) {
                                WaitingService.error(err);
                            });
                        }
                    });
            };

            $scope.editClassroomFn = function (classroom) {
                $scope.currentClassroom = classroom

                $scope.editClassroomDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'classroom', 'form', '_=' + Math.random()),
                    className: 'ngdialog-theme-default md-box',
                    scope: $scope,
                    resolve: {
                        currentClassroom: ['AppDataService', function (AppDataService) {
                            return $scope.currentClassroom;
                        }]
                    },
                    closeByDocument: true,
                    controller: 'ClassroomFormController'
                });

                $scope.editClassroomDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.classroom)) {
                        console.log('data.value', data.value);
                        $scope.loadItems()
                    }
                });
            };

            $scope.editFn = function (item) {
                $state.go('app.classroom.edit', {uuid: item.uuid});
            };

            $scope.openCreateClassroomDialog = function () {
                $scope.currentClassroom = {id: 0};
                $scope.createClassroomDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'classroom', 'add-classroom-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    closeByDocument: true,
                    controller: 'ClassroomFormController'
                });

                $scope.createClassroomDialog.closePromise.then(function (data) {
                    if (data && angular.isDefined(data.value.classroom)) {
                        console.log('data.value', data.value);
                        $scope.loadItems();
                    }
                });
            }

            $scope.loadItems();
        }]);
})();
