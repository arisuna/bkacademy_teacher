/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appCompanyFilter', appCompanyFilter);

        appCompanyFilter.$inject = ['$window', '$timeout', 'ngDialog', 'urlBase', '$translate', '$rootScope', 'AppCompanyService', 'WaitingService'];

    function appCompanyFilter($window, $timeout, ngDialog, urlBase, $translate, $rootScope, AppCompanyService, WaitingService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                name: '@?',
                model: '=',
                toLeft: '<?',
                float: '<?'
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-filter', 'companies-filter'),
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
                $scope.data = {
                    companies_selected: []
                };

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                if ($scope.toLeft == true) {
                    $scope.position = 'right';
                }

                $scope.updateValue = function (companies_selected) {
                    $scope.model = [];
                    angular.forEach(companies_selected, function (o) {
                        if (o.selected) {
                            $scope.model.push(o);
                        }
                    });
                    $scope.data.companies_selected = angular.copy(companies_selected);
                    $scope.publish('applyFilter');
                };

                if (angular.isDefined($scope.model) && _.isArray($scope.model) && $scope.model.length > 0) {
                    $scope.data.companies_selected = angular.copy($scope.model);
                }


                $scope.openSearchDialog = function ($event) {
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
                        template: urlBase.tplBase('base-modules/app-directives-filter', 'app-companies-filter-dialog'),
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
                            companies_selected: function () {
                                return $scope.data.companies_selected;
                            }
                        },
                        controller: ['$scope', '$element', '$rootScope', 'AppCompanyService','companies_selected', function ($scope, $element, $rootScope, AppCompanyService, companies_selected) {
                            document.documentElement.style.setProperty('--ng-dialog-custom-position-top', dialogTop);
                            if ($scope.ngDialogData.position === 'right') {
                                console.log('right dialog');
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', dialogRight);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', 'inherit');
                            } else {
                                console.log('default dialog', dialogLeft);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-left', dialogLeft);
                                document.documentElement.style.setProperty('--ng-dialog-custom-position-right', 'inherit');
                            }

                            $scope.companies = [];

                            $scope.showSelectedItems = false;
                            $scope.isLoading = false;
                            $scope.totalRestItems = 0;
                            $scope.searchConfig = {
                                query: null,
                                page: 0,
                            };
                            $scope.companies_selected = angular.copy(companies_selected);
                            $scope.clearFn = function () {
                                let items_selected = angular.copy($scope.companies_selected);
                                $scope.companies_selected = angular.copy([]);
                                if (items_selected.length > 0) {
                                    angular.forEach(items_selected, function (item) {
                                        $scope.removeItem(item);
                                    });
                                }
                            }

                            $scope.searchItems = function () {
                                $scope.companies = [];
                                $scope.totalRestItems = 0;
                                $scope.isLoading = true;
                                AppCompanyService.getCompanyList($scope.searchConfig).then(function (res) {
                                    if (res.success == true) {
                                        $scope.companies = res.data;
                                        angular.forEach($scope.companies_selected, function (item) {
                                            item.selected = true;
                                            let _index = _.findIndex($scope.companies, function (o) {
                                                return o.id == item.id
                                            });
                                            if (_index != -1) {
                                                $scope.companies[_index].selected = true;
                                            }

                                        });
                                        $scope.totalRestItems = res.total_rest_items;
                                        $scope.currentPage = res.page;
                                        $scope.nextPage = res.next;
                                    }
                                    $scope.isLoading = false;
                                });
                            };

                            $scope.loadMore = function () {
                                AppCompanyService.getCompanyList({
                                    query: $scope.searchConfig.query,
                                    page: $scope.nextPage
                                }).then(function (res) {
                                    if (res.success) {
                                        $scope.companies = _.concat($scope.companies, res.data);
                                        angular.forEach($scope.companies_selected, function (item) {
                                            item.selected = true;
                                            let _index = _.findIndex($scope.companies, function (o) {
                                                return o.id == item.id
                                            });
                                            if (_index != -1) {
                                                $scope.companies[_index].selected = true;
                                            }

                                        });
                                        $scope.totalRestItems = res.total_rest_items;
                                        $scope.currentPage = res.page;
                                        $scope.nextPage = res.next;
                                        $scope.updateSelected();
                                    }
                                })
                            };


                            $scope.searchItems();



                            $scope.showShowHideSelectedItems = function () {
                                $scope.showSelectedItems = !$scope.showSelectedItems;
                            }


                            $scope.addItem = function (item) {
                                let _index = _.findIndex($scope.companies, function (o) {
                                    return o.id == item.id;
                                });

                                if (_index < 0) {
                                    return
                                }
                                $scope.companies[_index].selected = !item.selected

                                $timeout(function () {
                                    $scope.companies_selected = $scope.companies.filter(o => o.selected);
                                }, 500)
                            };

                            $scope.removeItem = function (item) {

                                let indexToRemove = _.findIndex($scope.companies_selected, function (o) {
                                    return o.id == item.id;
                                });

                                if (indexToRemove >= 0) {
                                    $scope.companies_selected.splice(indexToRemove, 1);
                                }

                                let indexToUpdate = _.findIndex($scope.companies, function (o) {
                                    return o.id == item.id;
                                });

                                if (indexToUpdate >= 0) {
                                    $scope.companies[indexToUpdate].selected = false;
                                }
                            };


                            $scope.clearFn = function () {
                                let items_selected = angular.copy($scope.companies_selected);
                                $scope.companies_selected = angular.copy([]);
                                if (items_selected.length > 0) {
                                    angular.forEach(items_selected, function (item) {
                                        $scope.removeItem(item);
                                    });
                                }
                            }


                            $scope.confirmSelect = function () {
                                $scope.closeThisDialog({companies_selected: $scope.companies_selected});
                            }

                            $scope.updateSelected = function () {
                                angular.forEach($scope.companies_selected, function (item) {
                                    item.selected = true;
                                    let _index = _.findIndex($scope.companies, function (o) {
                                        return o.id == item.id
                                    });
                                    if (_index != -1) {
                                        $scope.companies[_index].selected = true;
                                    }

                                });
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.companies_selected)) {
                            $scope.updateValue(returnData.value.companies_selected);
                        } else {
                            // $scope.updateValue([]);
                        }
                    })
                };

                $scope.clearThisFilter = function () {
                    $scope.data.companies_selected = angular.copy([]);
                    $scope.model = [];
                };

                $scope.subscribe('clearFilter', function () {

                    $scope.clearThisFilter();
                });
            }
        };

        return directive;
    }

})();
