(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appTopicSelector', appTopicSelector);

    appTopicSelector.$inject = ['Utils', 'urlBase', 'AppTopicService', 'ngDialog'];

    function appTopicSelector(Utils, urlBase, AppTopicService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                topicId: '=ngModel',
                topic: '=?',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                grade: '<?',
                isEditable: '<?',
                isDisable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-topic-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'TOPIC_TEXT';
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
                if (angular.isUndefined(scope.topic)) {
                    scope.topic = null;
                }

                scope.realName = "topic_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.topicId > 0) {
                        AppTopicService.detailTopic($scope.topicId).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                                $scope.topic =  angular.copy(res.data);
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetTopic = function () {
                    if(!$scope.isDisable){
                        $scope.data.selected = angular.copy({id: null, uuid: null});
                        $scope.topic = null;
                        $scope.topicId = null;
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                }

                $scope.$watch('grade', function () {
                    if ($scope.topic!= null && angular.isDefined($scope.topic.grade) && $scope.topic.grade !=  $scope.grade) {
                        console.log($scope.topic.grade, $scope.grade);
                        $scope.data.selected = angular.copy({
                            id: null,
                            name: null,
                        });
                        $scope.topic = null;
                        $scope.topicId = null;
                    }
                });

                $scope.selectTopic = function (selectedTopic) {
                    $scope.data.selected = angular.copy(selectedTopic);
                    $scope.topicId = angular.copy(selectedTopic.id);
                    $scope.topic = angular.copy(selectedTopic);
                    if (angular.isDefined($scope.topicId) && $scope.topicId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('topicId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {
                    if(!$scope.isDisable){

                        let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                        let searchDialog = ngDialog.open({
                            template: urlBase.tplApp('app', '_directives_input', 'app-topic-selector-search-dialog'),
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
                            controller: ['$scope', '$element', '$timeout', 'AppTopicService', 'Utils', 'grade', function ($scope, $element, $timeout, AppTopicService, Utils, grade) {

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
                                    $scope.topices = [];
                                    $scope.currentPage = 0;
                                    $scope.totalPages = 0;
                                    $scope.isLoading = true;
                                    if($scope.grade > 0){
                                        AppTopicService.getList({
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
                                        AppTopicService.getList({
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
                                            AppTopicService.getList({
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
                                            AppTopicService.getList({
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
                                $scope.selectTopic(returnData.value);
                            }
                        })
                    }
                };
            }
        };

        return directive;
    }

})();
