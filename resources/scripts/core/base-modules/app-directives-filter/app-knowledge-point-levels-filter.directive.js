/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appKnowledgePointLevelsFilter', appKnowledgePointLevelsFilter);

    appKnowledgePointLevelsFilter.$inject = ['$window', '$timeout', 'ngDialog', 'urlBase', '$translate', '$rootScope', 'AppChapterService', 'WaitingService'];

    function appKnowledgePointLevelsFilter($window, $timeout, ngDialog, urlBase, $translate, $rootScope, AppChapterService, WaitingService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                name: '@?',
                model: '=',
                toLeft: '<?',
                float: '<?'
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-filter', 'knowledge-point-levels-filter'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.dropdownSize) || scope.dropdownSize == '') {
                    scope.dropdownSize = 'small';
                }

                if (angular.isUndefined(scope.toLeft) || scope.toLeft == true) {
                    scope.toLeft = true;
                } else {
                    scope.toLeft = false;
                }
            },
            controller: function ($scope, $element, $attrs) {

                $scope.initSearch = function () {
                    $scope.isLoading = true;
                    $scope.options = [
                        {value : 1, label: 'BASIC_TEXT'},
                        {value : 2, label: 'ADVANCE_TEXT'}
                    ];
                }

                $scope.initSearch();

                $scope.data = {
                    knowledge_point_levels_selected: []
                };

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                if ($scope.toLeft == true) {
                    $scope.position = 'right';
                }

                $scope.updateValue = function (knowledge_point_levels_selected) {
                    $scope.model = [];
                    angular.forEach(knowledge_point_levels_selected, function (o) {
                        if (o.selected) {
                            $scope.model.push(o);
                        }
                    });
                    $scope.data.knowledge_point_levels_selected = angular.copy(knowledge_point_levels_selected);
                    $scope.publish('applyFilter');
                };

                if (angular.isDefined($scope.model) && _.isArray($scope.model) && $scope.model.length > 0) {
                    $scope.data.knowledge_point_levels_selected = angular.copy($scope.model);
                }


                $scope.openSearchDialog = function ($event) {
                    let options = $scope.options;
                    let element = $event.currentTarget;
                    var place = element.getBoundingClientRect();
                    let dialogTop, dialogBottom = "";
                    if ($window.innerHeight / 2 < place.y) {
                        dialogBottom = ($window.innerHeight - _.parseInt(place.y)).toString() + 'px';
                        dialogTop = 'inherit';
                    } else {
                        dialogTop = (_.parseInt(place.y) + 33).toString() + 'px';
                        dialogBottom = 'inherit';
                    }
                    let dialogLeft = (_.parseInt(place.x) - 33).toString() + 'px';
                    let dialogRight = ($window.innerWidth - parseInt(place.right) - 10).toString() + 'px';
                    if ($scope.toLeft) {
                        dialogLeft = (_.parseInt(place.x) - 33).toString() + 'px';
                        dialogRight = ($window.innerWidth - parseInt(place.right) - 10).toString() + 'px';
                    }
                    let dialogHeight = 0;
                    let dialogWidth = 0;

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-directives-filter', 'app-knowledge-point-levels-filter-dialog'),
                        className: 'ngdialog-custom-position custom-bottom no-background',
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        width: 340,
                        data: {
                            top: dialogTop,
                            left: dialogLeft,
                            height: dialogHeight,
                            width: dialogWidth,
                            position: $scope.position,
                        },
                        resolve: {
                            knowledge_point_levels_selected: function () {
                                return $scope.data.knowledge_point_levels_selected;
                            }
                        },
                        controller: ['$scope', '$element', '$rootScope', 'AppDataService', 'AppSystem', 'knowledge_point_levels_selected', function ($scope, $element, $rootScope, AppDataService, AppSystem, knowledge_point_levels_selected) {
                            document.documentElement.style.setProperty('--ng-dialog-custom-position-top', dialogTop);
                            if ($scope.ngDialogData.position === 'right') {
                                console.log('right dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', dialogRight);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', 'inherit');
                            } else {
                                console.log('default dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', dialogLeft);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', 'inherit');
                            }

                            $scope.knowledge_point_levels = options.map((item) => {
                                item.selected = false
                                if (knowledge_point_levels_selected && knowledge_point_levels_selected.length > 0) {
                                    let _index = _.findIndex(knowledge_point_levels_selected, o => o.value == item.value);

                                    item.selected = _index > -1
                                }

                                return item;
                            });

                            $scope.showSelectedItems = false;
                            $scope.isLoading = false;
                            $scope.totalRestItems = 0;
                            $scope.knowledge_point_levels_selected = angular.copy(knowledge_point_levels_selected);


                            $scope.showShowHideSelectedItems = function () {
                                $scope.showSelectedItems = !$scope.showSelectedItems;
                            }


                            $scope.addItem = function (item) {
                                let _index = _.findIndex($scope.knowledge_point_levels, function (o) {
                                    return o.value == item.value;
                                });

                                if (_index < 0) {
                                    return
                                }
                                $scope.knowledge_point_levels[_index].selected = !item.selected

                                $timeout(function () {
                                    $scope.knowledge_point_levels_selected = $scope.knowledge_point_levels.filter(o => o.selected);
                                }, 500)
                            };

                            $scope.removeItem = function (item) {

                                let indexToRemove = _.findIndex($scope.knowledge_point_levels_selected, function (o) {
                                    return o.value == item.value;
                                });

                                if (indexToRemove >= 0) {
                                    $scope.knowledge_point_levels_selected.splice(indexToRemove, 1);
                                }

                                let indexToUpdate = _.findIndex($scope.knowledge_point_levels, function (o) {
                                    return o.value == item.value;
                                });

                                if (indexToUpdate >= 0) {
                                    $scope.knowledge_point_levels[indexToUpdate].selected = false;
                                }
                            };


                            $scope.clearFn = function () {
                                let items_selected = angular.copy($scope.knowledge_point_levels_selected);
                                $scope.knowledge_point_levels_selected = angular.copy([]);
                                if (items_selected.length > 0) {
                                    angular.forEach(items_selected, function (item) {
                                        $scope.removeItem(item);
                                    });
                                }
                            }


                            $scope.confirmSelect = function () {
                                $scope.closeThisDialog({knowledge_point_levels_selected: $scope.knowledge_point_levels_selected});
                            }

                            $scope.updateSelected = function () {
                                angular.forEach($scope.knowledge_point_levels_selected, function (item) {
                                    item.selected = true;
                                    let _index = _.findIndex($scope.knowledge_point_levels, function (o) {
                                        return o.value == item.value
                                    });
                                    if (_index != -1) {
                                        $scope.knowledge_point_levels[_index].selected = true;
                                    }

                                });
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.knowledge_point_levels_selected)) {
                            $scope.updateValue(returnData.value.knowledge_point_levels_selected);
                        } else {
                            // $scope.updateValue([]);
                        }
                    })
                };

                $scope.clearThisFilter = function () {
                    $scope.data.knowledge_point_levels_selected = angular.copy([]);
                    $scope.model = [];
                };

                $scope.subscribe('clearFilter', function () {
                    $scope.options = $scope.options.map(o => {
                        o.selected = false
                        return o
                    })

                    $scope.clearThisFilter();
                });
            }
        };

        return directive;
    }

})();
