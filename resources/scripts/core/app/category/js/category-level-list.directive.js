(function () {
    'use strict';

    App.directive('appCategoryLevelList', appCategoryLevelList);

    appCategoryLevelList.$inject = ['urlBase', 'ngDialog', 'AppCategoryService', 'WaitingService', '$state'];

    function appCategoryLevelList(urlBase, ngDialog, AppCategoryService, WaitingService, $state) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                itemParent: "=",
                parent: "=",
                itemSelected: "=",
                itemChildrenItems: "=?",
                columnTitle: "@?"
            },
            templateUrl: urlBase.tplApp('app', 'category', 'category-level-list'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {

                $scope.isLoading = false;
                console.log('parent', $scope.parent);
                console.log('itemParent', $scope.itemParent);
                console.log('itemSelected', $scope.itemSelected);

                $scope.sortItemsListener = {
                    accept: function (sourceItemHandleScope, destSortableScope) {
                        //will be called when you drag anything in the outer sortable
                        return (sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id);
                        //this return means we can only sort when the destination is stricly the same as the source
                    },// ==>if you comment this callback, the blue items can be dragged in the green scope (try it)
                    orderChanged: function (eventObject) {
                        //change position of field group
                        let steps = eventObject.dest.sortableScope.modelValue;
                        let stepsWithPosition = [];
                        angular.forEach(steps, function (step, position) {
                            stepsWithPosition.push({
                                id: step.id,
                                position: position
                            });
                        });
                        AppCategoryService.setCategoryPosition(stepsWithPosition).then(function (res) {
                            if (res.success == true) {
                                //nothing;
                            }
                        });
                    },
                    itemMoved: function (eventObject) {
                        var moveSuccess, moveFailure;
                        moveSuccess = function () {
                            console.log('Move Success' + eventObject.dest.index);
                        }
                    }
                };


                $scope.$watchGroup(['itemParent'], function () {
                    $scope.getCategoryChildrenItems();
                    $scope.itemSelected = angular.copy({id: null});
                });

                $scope.getCategoryChildrenItems = function () {
                    if ($scope.itemParent && $scope.itemParent.id > 0) {
                        $scope.isLoading = true;
                        AppCategoryService.getChildrenItems($scope.itemParent.id).then(
                            function (res) {
                                if (res.success) {
                                    $scope.itemChildrenItems = res.data;
                                } else {
                                    WaitingService.error(res.message);
                                }
                                $scope.isLoading = false;
                            },
                            function (res) {
                                WaitingService.error(res.message);
                                $scope.isLoading = false;
                            }
                        );
                    } else if (!$scope.itemParent || $scope.itemParent.id == 0) {
                        $scope.isLoading = true;
                        $scope.itemChildrenItems = [];
                        AppCategoryService.getLevel1Items().then(
                            function (res) {
                                if (res.success) {
                                    $scope.itemChildrenItems = res.data;
                                } else {
                                    WaitingService.error(res.message);
                                }
                                $scope.isLoading = false;
                            },
                            function (res) {
                                WaitingService.error(res.message);
                                $scope.isLoading = false;
                            }
                        );
                    } else if (_.isNull($scope.itemParent) || _.isUndefined($scope.itemParent) || _.isNull($scope.itemParent.id)) {
                        $scope.itemChildrenItems = [];
                    }
                };


                $scope.selectCategoryItem = function (item) {
                    $scope.itemSelected = item;
                };


                $scope.deleteFn = function (item) {
                    WaitingService.question('QUESTION_DELETE_ACL_TEXT', function () {
                        AppCategoryService.deleteCategory(item.uuid).then(function (res) {
                            if (res.success) {
                                let findIndex = _.findIndex($scope.itemChildrenItems, function (e) {
                                    return e.uuid == item.uuid;
                                });

                                if (findIndex >= 0) {
                                    $scope.itemChildrenItems.splice(findIndex, 1);
                                    $scope.itemSelected = angular.copy({id: null});
                                }
                            } else {
                                WaitingService.error(res.message);
                            }
                        });
                    });
                };


                $scope.openCreateDialog = function () {
                    let createDialog = ngDialog.open({
                        template: urlBase.tplApp('app', 'category', 'create.dialog'),
                        className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                        resolve: {
                            itemParent: function () {
                                return $scope.itemParent
                            }
                        },
                        controller: ['$scope', 'itemParent', 'AppCategoryService', 'WaitingService', function ($scope, itemParent, AppCategoryService, WaitingService) {
                            $scope.itemParent = itemParent;
                            $scope.categoryConfig = {
                                name: '',
                                description: '',
                                parent_category_id: $scope.itemParent.id > 0 ? $scope.itemParent.id : null
                            };

                            $scope.createFn = function () {
                                WaitingService.begin();
                                AppCategoryService.createCategory($scope.categoryConfig).then(function (res) {
                                    if (res.success) {
                                        WaitingService.success(res.message);
                                        $scope.categoryConfig = angular.copy(res.data);
                                        $scope.closeThisDialog($scope.categoryConfig);
                                    } else {
                                        WaitingService.error(res.message);
                                    }
                                }, function (res) {
                                    WaitingService.error(res.message);
                                });
                            }
                        }],
                        closeByDocument: false,
                    });

                    createDialog.closePromise.then(function (dialogData) {
                        if (angular.isDefined(dialogData.value)) {
                            if (angular.isDefined(dialogData.value.id) && dialogData.value.id > 0) {
                                $scope.itemChildrenItems.push(dialogData.value);
                            }
                        }
                    });
                };


                $scope.openEditDialog = function (categoryConfig) {
                    let editDialog = ngDialog.open({
                        template: urlBase.tplApp('app', 'category', 'edit.dialog'),
                        className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                        resolve: {
                            categoryConfig: ['AppCategoryService', function (AppCategoryService) {
                                WaitingService.begin();
                                return AppCategoryService.detailCategory(categoryConfig.uuid).then(function (res) {
                                    WaitingService.end();
                                    if (res.success) {
                                        return res.data;
                                    }
                                }, function () {
                                    WaitingService.error();
                                });
                            }]
                        },
                        controller: ['$scope', 'categoryConfig', 'AppCategoryService', 'WaitingService', function ($scope, categoryConfig, AppCategoryService, WaitingService) {
                            $scope.itemParent = {id: null};
                            console.log('categoryConfig', categoryConfig);
                            if (angular.isDefined(categoryConfig.parent)) {
                                $scope.itemParent = categoryConfig.parent;
                                $scope.categoryConfig = categoryConfig;
                                delete categoryConfig.parent;
                            } else {
                                $scope.itemParent = {id: null};
                                $scope.categoryConfig = categoryConfig;
                            }

                            $scope.updateFn = function () {
                                WaitingService.begin();
                                AppCategoryService.updateCategoryItem($scope.categoryConfig).then(function (res) {
                                    if (res.success) {
                                        WaitingService.success(res.message);
                                        $scope.categoryConfig = angular.copy(res.data);
                                        $scope.closeThisDialog($scope.categoryConfig);
                                    } else {
                                        WaitingService.error(res.message);
                                    }
                                }, function () {
                                    WaitingService.expire();
                                });
                            }

                            $scope.updateCategoryFn = function () {
                                WaitingService.begin();
                                AppCategoryService.updateCategory($scope.categoryConfig).then(function (res) {
                                    if (res.success) {
                                        WaitingService.success(res.message);
                                        $scope.categoryConfig = angular.copy(res.data);
                                        $scope.closeThisDialog('refresh');
                                    } else {
                                        WaitingService.error(res.message);
                                    }
                                }, function () {
                                    WaitingService.expire();
                                });
                            }
                        }],
                        closeByDocument: false,
                    });

                    editDialog.closePromise.then(function (dialogData) {
                        if (angular.isDefined(dialogData.value)) {
                            if (angular.isDefined(dialogData.value.id) && dialogData.value.id > 0) {

                                let findIndex = _.findIndex($scope.itemChildrenItems, function (o) {
                                    return o.id == dialogData.value.id;
                                });

                                if (findIndex >= 0) {
                                    $scope.itemChildrenItems[findIndex] = angular.copy(dialogData.value);
                                }
                            }else if (angular.isDefined(dialogData.value) && dialogData.value == 'refresh'){
                                $state.reload();
                            }
                        }
                    });
                };


            },
        };

    }

})();
