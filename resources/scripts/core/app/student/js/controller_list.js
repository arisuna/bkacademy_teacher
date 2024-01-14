(function () {
    'use strict';
    App.controller('StudentListController', ['$scope', '$state', '$timeout', '$rootScope', '$translate', 'WaitingService', 'AppDataService', 'AppStudentService',
        function ($scope, $state, $timeout, $rootScope, $translate, WaitingService, AppDataService, AppStudentService) {
            $scope.params = {
                roles: [],
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
                $scope.params.page = $scope.currentPage + 1;
                $scope.params.length = 20;
                $scope.params.start = ($scope.loadCount - 1) * 20;
                $scope.params.orders = [$scope.sort];
                $scope.params.query = $scope.query;

                AppStudentService.getStudentList($scope.params).then(function (res) {
                    if (res.success) {
                        $scope.items = $scope.params.page > 1 ? $scope.items.concat(res.data) : res.data;
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
                if ($scope.isLoadingMore == false){
                    $scope.loadCount += 1;
                    $scope.getListMore();
                }
            };

            $scope.getListMore = function () {
                $scope.params.page = $scope.currentPage + 1;
                $scope.params.length = 20;
                $scope.params.start = ($scope.loadCount - 1) * 20;
                $scope.params.orders = [$scope.sort];
                $scope.params.query = $scope.query;
                if ($scope.params.page > 0 && $scope.params.page <= $scope.totalPages){
                    $scope.isLoadingMore = true;
                }

                if ($scope.params.page == 1 || $scope.params.page <= $scope.totalPages) {

                    AppStudentService.getStudentList($scope.params).then(function (res) {
                        if (res.success) {
                            $scope.items = $scope.params.page > 1 ? $scope.items.concat(res.data) : res.data;
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

                }else{
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 1000)
                }
            };

            $rootScope.$on('student_filter_update', function (event, data) {
                $scope.isLoading = true;
                $scope.loadCount = 0;
                if (data.years && data.years.length) {
                    $scope.params.years = data.years
                } else {
                    $scope.params.years = []
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
                $scope.loadItems();
                $scope.publish('clearFilter');
            };

            $scope.deleteFn = function (student, index) {
                WaitingService.questionSimple('QUESTION_DELETE_STUDENT_TEXT', function () {
                    AppStudentService.deleteStudent(student.id).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.loadItems();
                        } else {
                            WaitingService.error(msg);
                        }
                    });
                });
            };

            $scope.editStudentFn = function (student) {
                $state.go('app.student.edit', {id: student.id});
            };

            $scope.loadItems();
        }]);
})();
