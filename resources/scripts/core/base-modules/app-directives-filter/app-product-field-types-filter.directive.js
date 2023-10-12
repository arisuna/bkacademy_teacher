/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appProductFieldTypesFilter', appProductFieldTypesFilter);

    appProductFieldTypesFilter.$inject = ['$window', '$timeout', 'ngDialog', 'urlBase', '$translate', '$rootScope', 'AppDataService', 'WaitingService'];

    function appProductFieldTypesFilter($window, $timeout, ngDialog, urlBase, $translate, $rootScope, AppDataService, WaitingService) {
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
            templateUrl: urlBase.tplBase('base-modules/app-directives-filter', 'product-field-types-filter'),
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
                    product_field_types_selected: []
                };

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                if ($scope.toLeft == true) {
                    $scope.position = 'right';
                }

                $scope.updateValue = function (product_field_types_selected) {
                    $scope.model = [];
                    angular.forEach(product_field_types_selected, function (o) {
                        if (o.selected) {
                            $scope.model.push(o);
                        }
                    });
                    $scope.data.product_field_types_selected = angular.copy(product_field_types_selected);
                    $scope.publish('applyFilter');
                };

                if (angular.isDefined($scope.model) && _.isArray($scope.model) && $scope.model.length > 0) {
                    $scope.data.product_field_types_selected = angular.copy($scope.model);
                }

                $scope.openSearchDialog = function ($event) {

                    let element = $event.currentTarget;
                    let options = $scope.options;

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
                        template: urlBase.tplBase('base-modules/app-directives-filter', 'app-product-field-types-filter-dialog'),
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
                            product_field_types_selected: function () {
                                return $scope.data.product_field_types_selected;
                            }
                        },
                        controller: ['$scope', '$element', '$rootScope', 'AppDataService', 'AppSystem', 'product_field_types_selected', function ($scope, $element, $rootScope, AppDataService, AppSystem, product_field_types_selected) {


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

                            $scope.types = options.map((item) => {
                                item.selected = false
                                if (product_field_types_selected && product_field_types_selected.length > 0) {
                                    let _index = _.findIndex(product_field_types_selected, o => o.value == item.value);

                                    item.selected = _index > -1
                                }

                                return item;
                            });


                            $scope.showSelectedItems = false;
                            $scope.isLoading = false;
                            $scope.totalRestItems = 0;
                            $scope.product_field_types_selected = angular.copy(product_field_types_selected);

                            $scope.showShowHideSelectedItems = function () {
                                $scope.showSelectedItems = !$scope.showSelectedItems;
                            }

                            $scope.addItem = function (item) {

                                let _index = _.findIndex($scope.types, function (o) {
                                    return o.value == item.value;
                                });

                                if (_index < 0) {
                                    return
                                }
                                $scope.types[_index].selected = !item.selected

                                $timeout(function () {
                                    $scope.product_field_types_selected = $scope.types.filter(o => o.selected);
                                }, 500)
                            };

                            $scope.removeItem = function (item) {

                                let indexToRemove = _.findIndex($scope.product_field_types_selected, function (o) {
                                    return o.value == item.value;
                                });

                                if (indexToRemove >= 0) {
                                    $scope.product_field_types_selected.splice(indexToRemove, 1);
                                }

                                let indexToUpdate = _.findIndex($scope.types, function (o) {
                                    return o.value == item.value;
                                });

                                if (indexToUpdate >= 0) {
                                    $scope.types[indexToUpdate].selected = false;
                                }
                            };


                            $scope.clearFn = function () {
                                let items_selected = angular.copy($scope.product_field_types_selected);
                                $scope.product_field_types_selected = angular.copy([]);
                                if (items_selected.length > 0) {
                                    angular.forEach(items_selected, function (item) {
                                        $scope.removeItem(item);
                                    });
                                }
                            }

                            $scope.confirmSelect = function () {
                                $scope.closeThisDialog({product_field_types_selected: $scope.product_field_types_selected});
                            }

                            $scope.updateSelected = function () {
                                angular.forEach($scope.product_field_types_selected, function (item) {
                                    let _index = _.findIndex($scope.types, function (o) {
                                        return o.value == item.value
                                    });

                                    if (_index != -1) {
                                        $scope.types[_index].selected = true;
                                    }

                                });
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.product_field_types_selected)) {
                            $scope.updateValue(returnData.value.product_field_types_selected);
                        } else {
                            // $scope.updateValue([]);
                        }
                    })
                };

                $scope.subscribe('clearFilter', function () {
                    $scope.clearThisFilter();
                });

                $scope.clearThisFilter = function () {
                    $scope.options = $scope.options.map(o => {
                        o.selected = false
                        return o
                    })

                    $scope.data.product_field_types_selected = angular.copy([]);
                    $scope.model = [];
                };


                $scope.$watch('selected_roles', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.broadcastFilter();
                    }
                });

            }
        };

        return directive;
    }

})();
