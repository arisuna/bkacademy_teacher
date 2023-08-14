/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';

    App.controller('CurrencyListController', ['$scope', '$http', '$timeout', 'urlBase', 'WaitingService', 'AppDataService', 'ngDialog',
        function ($scope, $http, $timeout, urlBase, WaitingService, AppDataService, ngDialog) {
            $scope.isLoading = false;
            $scope.isInitialLoading = true;
            $scope.items = [];
            $scope.query = null
            $scope.module_name = 'currencies';
            $scope.column_array = []

            $scope.getListFn = function (isReload = false) {
                $scope.items = [];
                if (isReload) {
                    $scope.query = null
                }

                $scope.isInitialLoading = true;

                AppDataService.listCurrency({
                    query: $scope.query
                }).then(
                    function (res) {
                        if (res.success) {
                            $scope.items = res.data;
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $timeout(function () {
                            $scope.isLoading = false;
                            $scope.isInitialLoading = false;
                        }, 250);
                    }, (e) => {
                        $scope.isLoading = false;
                        $scope.isInitialLoading = false;
                    }
                );
            };

            $scope.getListFn();

            $scope.deleteFn = function (currency, index) {
                WaitingService.questionSimple('QUESTION_DELETE_CURRENCY_TEXT',
                    function () {
                        WaitingService.begin();
                        AppDataService.deleteCurrency(currency.code).then(function (res) {
                            if (res.success) {
                                $scope.items.splice(index, 1);
                                WaitingService.popSuccess(res.message);
                            } else {
                                WaitingService.error(res.message);
                            }
                        });
                    });
            };


            $scope.openCreateCurrencyDialog = function () {
                $scope.createCurrencyDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'currency', 'create.dialog'),
                    className: 'ngdialog-theme-default md-box',
                    scope: $scope,
                    controller: ['$scope', 'AppDataService', 'WaitingService', function ($scope, AppDataService, WaitingService) {
                        $scope.createCurrencyFn = function () {
                            WaitingService.begin();
                            AppDataService.createCurrency($scope.currency).then(
                                function (res) {
                                    if (res.success) {
                                        WaitingService.popSuccess(res.message);
                                        $scope.closeThisDialog({newCurrency: res.data});
                                    } else {
                                        WaitingService.error(res.message, function () {
                                            $scope.closeThisDialog();
                                        });
                                    }
                                    $scope.isLoading = false;
                                }
                            )
                        };
                    }]
                });

                $scope.createCurrencyDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.newCurrency)) {
                        $scope.isLoading = true;
                        $scope.getListFn();
                    }
                });
            };

            $scope.editCurrencyDialog = function (currency) {
                $scope.currentCurreny = currency;
                $scope.detailCurrencyDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'currency', 'edit.dialog'),
                    className: 'ngdialog-theme-default md-box',
                    scope: $scope,
                    controller: ['$scope', 'AppDataService', 'WaitingService', function ($scope, AppDataService, WaitingService) {
                        $scope.currency = $scope.currentCurreny;
                        $scope.currency.active = parseInt($scope.currentCurreny.active);
                        $scope.currency.principal = parseInt($scope.currentCurreny.principal);
                        $scope.updateCurrencyFn = function () {
                            WaitingService.begin();
                            AppDataService.updateCurrency($scope.currency).then(
                                function (res) {
                                    if (res.success) {
                                        WaitingService.popSuccess(res.message);
                                        $scope.closeThisDialog({currency: res.data});
                                    } else {
                                        WaitingService.error(res.message, function () {
                                            $scope.closeThisDialog();
                                        });
                                    }
                                    $scope.isLoading = false;
                                }
                            )
                        };
                    }]
                });
                $scope.detailCurrencyDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.currency)) {
                        $scope.isLoading = true;
                        $scope.getListFn();
                    }
                    if (angular.isDefined(data.value) && angular.isDefined(data.value.deletedCurrency)) {
                        $scope.isLoading = true;
                        $scope.getListFn();
                    }
                })
            };

            $scope.subscribe('text_search_' + $scope.module_name, function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.query = data;
                $scope.isLoading = true;
                $scope.getListFn();
            });
        }]);
})();