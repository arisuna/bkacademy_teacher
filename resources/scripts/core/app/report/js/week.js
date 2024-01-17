(function () {
    'use strict';

    App.controller('ReportByWeekController', ['$rootScope', '$scope', '$window', '$http', 'FileSaver', 'Blob', '$translate',
        '$timeout', '$interval', 'DTOptionsBuilder', 'WaitingService', 'AppReportService', '$filter',
        function ($rootScope, $scope, $window, $http, FileSaver, Blob, $translate, $timeout, $interval, DTOptionsBuilder, WaitingService,
                  AppReportService, $filter) {

                    $scope.step = 1;
           

                    $scope.params = {
                        week_types: [],
                        date:{
                            startDate: null,
                            endDate: null
                        }
                    };
                    $scope.isLoadingMore = false;
                    $scope.isLoading = true;
                    $scope.loadCount = 0;
                    $scope.currentPage = 0;
                    $scope.items = [];
                    $scope.totalPages = 1;
        
                    $scope.columns = [
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
                        $scope.isFiltered = false;

                        if(angular.isDefined( $scope.params.date.startDate) &&  $scope.params.date.startDate > 0){
                            $scope.isFiltered = true;
                        }
    
                        if(angular.isDefined($scope.params.date.endDate) && $scope.params.date.endDate  > 0){
                            $scope.isFiltered = true;
                        }
                        if( ! $scope.isFiltered){
                            WaitingService.error('MUST_CHOOSE_DATE_TEXT');
                            return;
                        }
        
                        AppReportService.getReportByWeek($scope.params).then(function (res) {
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

                    $rootScope.$on('week_filter_update', function (event, data) {
                        $scope.step = 2;
                        $scope.isLoading = true;
                        $scope.loadCount = 0;
                        if (data.grades && data.grades.length) {
                            $scope.params.grades = data.grades
                        } else {
                            $scope.params.grades = []
                        }
                        if (data.weeks && data.weeks.length) {
                            $scope.params.weeks = data.weeks
                        } else {
                            $scope.params.weeks = []
                        }
                        if (data.classrooms && data.classrooms.length) {
                            $scope.params.classrooms = data.classrooms
                        } else {
                            $scope.params.classrooms = []
                        }
                        if (data.week_types && data.week_types.length) {
                            $scope.params.week_types = data.week_types
                        } else {
                            $scope.params.week_types = []
                        }
                        if(data.date != undefined && data.date != null && data.date != ''){
                            if(angular.isDefined(data.date.startDate) && data.date.startDate > 0){
                                $scope.isFiltered = true;
                                $scope.params.date.startDate = data.date.startDate;
                            }
        
                            if(angular.isDefined(data.date.endDate) && data.date.endDate > 0){
                                $scope.isFiltered = true;
                                $scope.params.date.endDate = data.date.endDate;
                            }
                        }
                        if( ! $scope.isFiltered){
                            WaitingService.error('MUST_CHOOSE_DATE_TEXT');
                            return;
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
                        $scope.params = {
                            week_types: [],
                            date:{
                                startDate: null,
                                endDate: null
                            }
                        };
                        $scope.publish('clearFilter');
                    };

        }]);

})();
