(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appCompanySelector', appCompanySelector);

    appCompanySelector.$inject = ['Utils', 'GmsHrAccountService', 'urlBase', 'AppDataService', 'ngDialog'];

    function appCompanySelector(Utils, GmsHrAccountService, urlBase, AppDataService, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                companyId: '=ngModel',
                relocationId: '<?',
                company: '=?',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                isEditable: '<?',
                showLabel: '<?',
                addBooker: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-company-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'COMPANY_TEXT';
                }

                if (angular.isUndefined(scope.addBooker) || scope.addBooker == null) {
                    scope.addBooker = false;
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == null) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'COMPANY_REQUIRED_TEXT';
                }
                if (angular.isUndefined(scope.company)) {
                    scope.company = null;
                }

                // if (scope.isEditable == '' || scope.isEditable == null) {
                //     scope.isEditable = true;
                // }

                scope.realName = "company_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };


                $scope.initFn = function () {
                    if ($scope.companyId > 0) {
                        AppDataService.getCompanyDetailById($scope.companyId).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = res.data;
                            }
                        });
                    } else {
                        $scope.data.selected = {
                            id: null,
                            uuid: null
                        };
                    }
                };


                $scope.resetCompany = function () {
                    $scope.data.selected = angular.copy({id: null, uuid: null});
                    $scope.company = null;
                    $scope.companyId = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectCompany = function (selectedCompany) {
                    $scope.data.selected = angular.copy(selectedCompany);
                    $scope.companyId = angular.copy(selectedCompany.id);
                    $scope.company = angular.copy(selectedCompany);
                    if (angular.isDefined($scope.companyId) && $scope.companyId > 0) {
                        if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                };

                $scope.$watch('companyId', function () {
                    $scope.initFn();
                });


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-company-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        resolve: {
                            addBooker: function () {
                                return $scope.addBooker;
                            },
                            relocationId: function () {
                                return $scope.relocationId;
                            }
                        },
                        controller: ['$scope', '$element', '$timeout', 'AppDataService', 'Utils', 'addBooker', 'relocationId', function ($scope, $element, $timeout, AppDataService, Utils, addBooker, relocationId) {

                            $scope.companies = [];
                            $scope.relocationId = relocationId;
                            $scope.addBooker = addBooker;

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

                            $scope.selectItem = function (member) {
                                $scope.closeThisDialog(member);
                            }

                            $scope.initSearch = function () {
                                $scope.companies = [];
                                $scope.currentPage = 0;
                                $scope.totalPages = 0;
                                $scope.isLoading = true;
                                AppDataService.searchCompaniesAndBookers({
                                    query: $scope.searchConfig.query,
                                    relocationId: $scope.relocationId,
                                    hasBooker: $scope.addBooker,
                                    page: 1
                                }).then(function (res) {
                                    $scope.companies = res.data;
                                    $scope.isLoading = false;
                                    $scope.totalItems = res.total_items;
                                    $scope.totalPages = res.total_pages;
                                    $scope.currentPage = res.current;
                                }, function () {
                                    $scope.isLoading = false;
                                    $scope.companies = [];
                                });
                            }

                            $scope.loadMore = function () {
                                if ($scope.totalPages > $scope.currentPage) {
                                    $scope.isLoadingMore = true;
                                    AppDataService.searchCompaniesAndBookers({
                                        query: $scope.searchConfig.query,
                                        hasBooker: $scope.addBooker,
                                        page: $scope.currentPage + 1
                                    }).then(function (res) {
                                        $scope.companies = _.concat($scope.companies, res.data);
                                        $scope.isLoadingMore = false;
                                        $scope.totalItems = res.total_items;
                                        $scope.totalPages = res.total_pages;
                                        $scope.currentPage = res.current;
                                    }, function () {
                                        $scope.isLoadingMore = false;
                                        $scope.companies = [];
                                    });
                                }
                            };

                            $scope.initSearch();

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.selectCompany(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
