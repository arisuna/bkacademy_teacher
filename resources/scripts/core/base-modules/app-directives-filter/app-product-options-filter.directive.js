/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appProductOptionsFilter', appProductOptionsFilter);

    appProductOptionsFilter.$inject = ['$window', '$timeout', 'ngDialog', 'urlBase', '$translate', '$rootScope', 'AppProductService', 'WaitingService'];

    function appProductOptionsFilter($window, $timeout, ngDialog, urlBase, $translate, $rootScope, AppProductService, WaitingService) {
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
            templateUrl: urlBase.tplBase('base-modules/app-directives-filter', 'product-options-filter'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.dropdownSize) || scope.dropdownSize == '') {
                    scope.dropdownSize = 'small';
                }
                if (angular.isUndefined(scope.options)) {
                    scope.options = AppProductService.getOptionList();
                }

                if (angular.isUndefined(scope.toLeft) || scope.toLeft == true) {
                    scope.toLeft = true;
                } else {
                    scope.toLeft = false;
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    product_options_selected: []
                };

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                if ($scope.toLeft == true) {
                    $scope.position = 'right';
                }

                $scope.updateValue = function (product_options_selected) {
                    $scope.model = [];
                    angular.forEach(product_options_selected, function (o) {
                        if (o.selected) {
                            $scope.model.push(o);
                        }
                    });
                    $scope.data.product_options_selected = angular.copy(product_options_selected);
                    $scope.publish('applyFilter');
                };

                if (angular.isDefined($scope.model) && _.isArray($scope.model) && $scope.model.length > 0) {
                    $scope.data.product_options_selected = angular.copy($scope.model);
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
                        template: urlBase.tplBase('base-modules/app-directives-filter', 'app-product-options-filter-dialog'),
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
                            product_options_selected: function () {
                                return $scope.data.product_options_selected;
                            }
                        },
                        controller: ['$scope', '$element', '$rootScope', 'AppProductService', 'AppSystem', 'product_options_selected', function ($scope, $element, $rootScope, AppProductService, AppSystem, product_options_selected) {
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

                            $scope.product_options = options.map((item) => {
                                item.selected = false
                                if (product_options_selected && product_options_selected.length > 0) {
                                    let _index = _.findIndex(product_options_selected, o => o.id == item.id);

                                    item.selected = _index > -1
                                }

                                return item;
                            });

                            $scope.showSelectedItems = false;
                            $scope.isLoading = false;
                            $scope.totalRestItems = 0;
                            $scope.product_options_selected = angular.copy(product_options_selected);


                            $scope.showShowHideSelectedItems = function () {
                                $scope.showSelectedItems = !$scope.showSelectedItems;
                            }


                            $scope.addItem = function (item) {
                                let _index = _.findIndex($scope.product_options, function (o) {
                                    return o.id == item.id;
                                });

                                if (_index < 0) {
                                    return
                                }
                                $scope.product_options[_index].selected = !item.selected

                                $timeout(function () {
                                    $scope.product_options_selected = $scope.product_options.filter(o => o.selected);
                                }, 500)
                            };

                            $scope.removeItem = function (item) {

                                let indexToRemove = _.findIndex($scope.product_options_selected, function (o) {
                                    return o.id == item.id;
                                });

                                if (indexToRemove >= 0) {
                                    $scope.product_options_selected.splice(indexToRemove, 1);
                                }

                                let indexToUpdate = _.findIndex($scope.product_options, function (o) {
                                    return o.id == item.id;
                                });

                                if (indexToUpdate >= 0) {
                                    $scope.product_options[indexToUpdate].selected = false;
                                }
                            };


                            $scope.clearFn = function () {
                                let items_selected = angular.copy($scope.product_options_selected);
                                $scope.product_options_selected = angular.copy([]);
                                if (items_selected.length > 0) {
                                    angular.forEach(items_selected, function (item) {
                                        $scope.removeItem(item);
                                    });
                                }
                            }


                            $scope.confirmSelect = function () {
                                $scope.closeThisDialog({product_options_selected: $scope.product_options_selected});
                            }

                            $scope.updateSelected = function () {
                                angular.forEach($scope.product_options_selected, function (item) {
                                    item.selected = true;
                                    let _index = _.findIndex($scope.product_options, function (o) {
                                        return o.id == item.id
                                    });
                                    if (_index != -1) {
                                        $scope.product_options[_index].selected = true;
                                    }

                                });
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.product_options_selected)) {
                            $scope.updateValue(returnData.value.product_options_selected);
                        } else {
                            // $scope.updateValue([]);
                        }
                    })
                };

                $scope.clearThisFilter = function () {
                    $scope.data.product_options_selected = angular.copy([]);
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
