(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appChapterSelector', appChapterSelector);

    appChapterSelector.$inject = ['Utils', 'urlBase', 'AppChapterService', 'ngDialog'];

    function appChapterSelector(Utils, urlBase, AppChapterService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                chapterId: '=ngModel',
                chapter: '=?',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                grade: '<?',
                isEditable: '<?',
                isDisable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-chapter-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'CHAPTER_TEXT';
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
                if (angular.isUndefined(scope.chapter)) {
                    scope.chapter = null;
                }

                scope.realName = "chapter_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.chapterId > 0) {
                        AppChapterService.detailChapter($scope.chapterId).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                                $scope.chapter =  angular.copy(res.data);
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetChapter = function () {
                    if(!$scope.isDisable){
                        $scope.data.selected = angular.copy({id: null, uuid: null});
                        $scope.chapter = null;
                        $scope.chapterId = null;
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                }

                $scope.$watch('grade', function () {
                    if ($scope.chapter!= null && angular.isDefined($scope.chapter.grade) && $scope.chapter.grade !=  $scope.grade) {
                        console.log($scope.chapter.grade, $scope.grade);
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                        $scope.chapter = null;
                        $scope.chapterId = null;
                    }
                });

                $scope.selectChapter = function (selectedChapter) {
                    $scope.data.selected = angular.copy(selectedChapter);
                    $scope.chapterId = angular.copy(selectedChapter.id);
                    $scope.chapter = angular.copy(selectedChapter);
                    if (angular.isDefined($scope.chapterId) && $scope.chapterId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('chapterId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {
                    if(!$scope.isDisable){

                        let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                        let searchDialog = ngDialog.open({
                            template: urlBase.tplApp('app', '_directives_input', 'app-chapter-selector-search-dialog'),
                            className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                            showClose: false,
                            closeByDocument: true,
                            disableAnimation: true,
                            cache: true,
                            width: 300,
                            data: dialogPosition,
                            resolve: {
                                grade: ['AppDataService', function (AppDataService) {
                                    return $scope.grade;
                                }],

                            },
                            controller: ['$scope', '$element', '$timeout', 'AppChapterService', 'Utils', 'grade', function ($scope, $element, $timeout, AppChapterService, Utils, grade) {

                                $scope.items = [];
                                $scope.grade = grade;

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
                                    $scope.chapteres = [];
                                    $scope.currentPage = 0;
                                    $scope.totalPages = 0;
                                    $scope.isLoading = true;
                                    if($scope.grade > 0){
                                        AppChapterService.getList({
                                            query: $scope.searchConfig.query,
                                            page: 1,
                                            grades: [{id:$scope.grade}]
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

                                    } else {
                                        AppChapterService.getList({
                                            query: $scope.searchConfig.query,
                                            page: 1
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
                                        if($scope.grade > 0){
                                            AppChapterService.getList({
                                                query: $scope.searchConfig.query,
                                                page: $scope.currentPage + 1,
                                                grades: [{id:$scope.grade}]
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
    
                                        } else {
                                            AppChapterService.getList({
                                                query: $scope.searchConfig.query,
                                                page: $scope.currentPage + 1
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
                                    }
                                };

                                $scope.initSearch();

                            }]
                        });

                        searchDialog.closePromise.then(function (returnData) {
                            if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                                $scope.selectChapter(returnData.value);
                            }
                        })
                    }
                };
            }
        };

        return directive;
    }

})();
