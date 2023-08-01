/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appRolesFilter', appRolesFilter);

    appRolesFilter.$inject = ['$window', '$timeout', 'ngDialog', 'urlBase', '$translate', '$rootScope', 'AppDataService', 'WaitingService'];

    function appRolesFilter($window, $timeout, ngDialog, urlBase, $translate, $rootScope, AppDataService, WaitingService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                name: '@?',
                model: '=',
                options: '=?',
                toLeft: '<?',
                float: '<?'
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-filter', 'roles-filter'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.dropdownSize) || scope.dropdownSize == '') {
                    scope.dropdownSize = 'small';
                }
                if (angular.isUndefined(scope.options)) {
                    scope.options = [];
                }

                if (angular.isUndefined(scope.toLeft) || scope.toLeft == true) {
                    scope.toLeft = true;
                } else {
                    scope.toLeft = false;
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    roles_selected: []
                };

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                if($scope.toLeft == true){
                    $scope.position = 'right';
                }

                $scope.updateValue = function (roles_selected) {
                    $scope.model = [];
                    angular.forEach(roles_selected, function (o) {
                        if (o.selected) {
                            $scope.model.push(o);
                        }
                    });
                    $scope.data.roles_selected = angular.copy(roles_selected);
                    $scope.publish('applyFilter');
                };

                if (angular.isDefined($scope.model) && _.isArray($scope.model) && $scope.model.length > 0) {
                    $scope.data.roles_selected = angular.copy($scope.model);
                }


                $scope.openSearchDialog = function ($event) {

                    let element = $event.currentTarget;
                    var place = element.getBoundingClientRect();
                    let dialogTop, dialogBottom = "";
                    if ($window.innerHeight / 2 < place.y){
                        dialogBottom = ($window.innerHeight - _.parseInt(place.y)).toString() + 'px';
                        dialogTop = 'inherit';
                    }else{
                        dialogTop = (_.parseInt(place.y) + 33).toString() + 'px';
                        dialogBottom = 'inherit';
                    }
                    let dialogLeft = (_.parseInt(place.x) - 33).toString() + 'px';
                    let dialogRight = ($window.innerWidth - parseInt(place.right) - 10).toString() + 'px';
                    if($scope.toLeft){
                         dialogLeft = (_.parseInt(place.x) - 33).toString() + 'px';
                         dialogRight = ($window.innerWidth - parseInt(place.right) - 10).toString() + 'px';
                    }
                    let dialogHeight = 0;
                    let dialogWidth = 0;


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-directives-filter', 'app-roles-filter-dialog'),
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
                            roles_selected: function () {
                                return $scope.data.roles_selected;
                            }
                        },
                        controller: ['$scope', '$element', '$rootScope', 'AppDataService', 'AppSystem', 'roles_selected', function ($scope, $element, $rootScope, AppDataService, AppSystem,roles_selected) {


                            document.documentElement.style.setProperty('--ng-dialog-custom-position-top', dialogTop);
                            document.documentElement.style.setProperty('--ng-dialog-custom-position-bottom', dialogBottom);
                            if ($scope.ngDialogData.position === 'right') {
                                console.log('right dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', dialogRight);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', 'inherit');
                            } else {
                                console.log('default dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', dialogLeft);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', 'inherit');
                            }

                            $scope.roles = AppSystem.getSettingUserGroups();

                            $scope.showSelectedItems = false;
                            $scope.isLoading = false;
                            $scope.totalRestItems = 0;
                            $scope.roles_selected = angular.copy(roles_selected);


                            $scope.showShowHideSelectedItems = function () {
                                $scope.showSelectedItems = !$scope.showSelectedItems;
                            }


                            $scope.addItem = function (item) {

                                if (item.selected == true) {
                                    item.selected = false;
                                } else {
                                    item.selected = true;
                                }

                                if (item.selected == true) {
                                    $scope.roles_selected.push(item);
                                } else {
                                    let indexToRemove = _.findIndex($scope.roles_selected, function (o) {
                                        return o.id == item.id;
                                    });

                                    if (indexToRemove >= 0) {
                                        $scope.roles_selected.splice(indexToRemove, 1);
                                    }
                                }
                            };

                            $scope.removeItem = function (item) {

                                let indexToRemove = _.findIndex($scope.roles_selected, function (o) {
                                    return o.id == item.id;
                                });

                                if (indexToRemove >= 0) {
                                    $scope.roles_selected.splice(indexToRemove, 1);
                                }

                                let indexToUpdate = _.findIndex($scope.roles, function (o) {
                                    return o.id == item.id;
                                });

                                if (indexToUpdate >= 0) {
                                    $scope.roles[indexToUpdate].selected = false;
                                }
                            };


                            $scope.clearFn = function () {
                                let items_selected = angular.copy($scope.roles_selected);
                                $scope.roles_selected = angular.copy([]);
                                if (items_selected.length > 0) {
                                    angular.forEach(items_selected, function (item) {
                                        $scope.removeItem(item);
                                    });
                                }
                            }


                            $scope.confirmSelect = function () {
                                $scope.closeThisDialog({roles_selected: $scope.roles_selected});
                            }

                            $scope.updateSelected = function () {
                                angular.forEach($scope.roles_selected, function (item) {
                                    item.selected = true;
                                    let _index = _.findIndex($scope.roles, function (o) {
                                        return o.id == item.id
                                    });
                                    if (_index != -1){
                                        $scope.roles[_index].selected = true;
                                    }

                                });
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.roles_selected)) {
                            $scope.updateValue(returnData.value.roles_selected);
                        } else {
                            $scope.updateValue([]);
                        }
                    })
                };


                $scope.subscribe('clearFilter', function () {
                    $scope.clearThisFilter();
                });

                $scope.clearThisFilter = function () {
                    $scope.data.roles_selected = angular.copy([]);
                    $scope.model = [];
                };
            }
        };

        return directive;
    }

})();
