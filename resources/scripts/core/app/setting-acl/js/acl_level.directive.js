(function () {
    'use strict';

    App.directive('appAclLevelList', appAclLevelList);

    appAclLevelList.$inject = ['urlBase', 'ngDialog', 'AppAclService', 'WaitingService', '$state'];

    function appAclLevelList(urlBase, ngDialog, AppAclService, WaitingService, $state) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: urlBase.tplApp('app', 'setting-acl', 'acl_level_list'),
            scope: {
                aclParent: "=",
                aclSelected: "=",
                aclChildrenItems: "=?",
                title: "@?"
            },
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {

                $scope.isLoading = false;

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
                        AppAclService.setAclPosition(stepsWithPosition).then(function (res) {
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


                $scope.$watchGroup(['aclParent'], function () {
                    $scope.getAclChildrenItems();
                    $scope.aclSelected = angular.copy({id: null});
                });

                $scope.getAclChildrenItems = function () {
                    if ($scope.aclParent.id > 0) {
                        $scope.isLoading = true;
                        AppAclService.getAclChilrenItems($scope.aclParent.id).then(
                            function (res) {
                                if (res.success) {
                                    $scope.aclChildrenItems = res.data;
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
                    } else if ($scope.aclParent.id == 0) {
                        $scope.isLoading = true;
                        $scope.aclChildrenItems = [];
                        AppAclService.getAclLevel1Items().then(
                            function (res) {
                                if (res.success) {
                                    $scope.aclChildrenItems = res.data;
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
                    } else if (_.isNull($scope.aclParent) || _.isUndefined($scope.aclParent) || _.isNull($scope.aclParent.id)) {
                        $scope.aclChildrenItems = [];
                    }
                };


                $scope.selectAclItem = function (acl) {
                    $scope.aclSelected = acl;
                };


                $scope.deleteFn = function (aclItem) {
                    WaitingService.question('QUESTION_DELETE_ACL_TEXT', function () {
                        AppAclService.deleteAclItem(aclItem.id).then(function (res) {
                            if (res.success) {
                                let findIndex = _.findIndex($scope.aclChildrenItems, function (e) {
                                    return e.id == aclItem.id;
                                });

                                if (findIndex >= 0) {
                                    $scope.aclChildrenItems.splice(findIndex, 1);
                                    $scope.aclSelected = angular.copy({id: null});
                                }
                            } else {
                                WaitingService.error(res.message);
                            }
                        });
                    });
                };


                $scope.openCreateDialog = function () {
                    let createDialog = ngDialog.open({
                        template: urlBase.tplApp('app', 'setting-acl', 'create.dialog'),
                        className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                        resolve: {
                            aclParent: function () {
                                return $scope.aclParent
                            }
                        },
                        controller: ['$scope', 'aclParent', 'AppAclService', 'WaitingService', function ($scope, aclParent, AppAclService, WaitingService) {
                            $scope.aclParent = aclParent;
                            $scope.aclConfig = {
                                is_active: 1,
                                is_admin_only: 0,
                                name: '',
                                label: '',
                                summary_label: '',
                                controller: '',
                                action: '',
                                acl_id: $scope.aclParent.id > 0 ? $scope.aclParent.id : null
                            };

                            $scope.createFn = function () {
                                WaitingService.begin();
                                AppAclService.createAclItem($scope.aclConfig).then(function (res) {
                                    if (res.success) {
                                        WaitingService.success(res.message);
                                        $scope.aclConfig = angular.copy(res.data);
                                        $scope.closeThisDialog($scope.aclConfig);
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
                                $scope.aclChildrenItems.push(dialogData.value);
                            }
                        }
                    });
                };


                $scope.openEditDialog = function (aclConfig) {
                    let editDialog = ngDialog.open({
                        template: urlBase.tplApp('app', 'setting-acl', 'edit.dialog'),
                        className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                        resolve: {
                            aclConfig: ['AppAclService', function (AppAclService) {
                                WaitingService.begin();
                                return AppAclService.getAclItem(aclConfig.id).then(function (res) {
                                    WaitingService.end();
                                    if (res.success) {
                                        return res.data;
                                    }
                                }, function () {
                                    WaitingService.error();
                                });
                            }]
                        },
                        controller: ['$scope', 'aclConfig', 'AppAclService', 'WaitingService', function ($scope, aclConfig, AppAclService, WaitingService) {
                            $scope.aclParent = {id: null};
                            console.log('aclConfig', aclConfig);
                            if (angular.isDefined(aclConfig.parent)) {
                                $scope.aclParent = aclConfig.parent;
                                $scope.aclConfig = aclConfig;
                                delete aclConfig.parent;
                            } else {
                                $scope.aclParent = {id: null};
                                $scope.aclConfig = aclConfig;
                            }

                            $scope.updateFn = function () {
                                WaitingService.begin();
                                AppAclService.updateAclItem($scope.aclConfig).then(function (res) {
                                    if (res.success) {
                                        WaitingService.success(res.message);
                                        $scope.aclConfig = angular.copy(res.data);
                                        $scope.closeThisDialog($scope.aclConfig);
                                    } else {
                                        WaitingService.error(res.message);
                                    }
                                }, function () {
                                    WaitingService.expire();
                                });
                            }

                            $scope.updateAclFn = function () {
                                WaitingService.begin();
                                AppAclService.updateAclItem($scope.aclConfig).then(function (res) {
                                    if (res.success) {
                                        WaitingService.success(res.message);
                                        $scope.aclConfig = angular.copy(res.data);
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

                                let findIndex = _.findIndex($scope.aclChildrenItems, function (o) {
                                    return o.id == dialogData.value.id;
                                });

                                if (findIndex >= 0) {
                                    $scope.aclChildrenItems[findIndex] = angular.copy(dialogData.value);
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
