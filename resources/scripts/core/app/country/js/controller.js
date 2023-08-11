/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';

    App.controller('CountryListController', ['$scope', '$http', '$timeout', 'urlBase', 'WaitingService', 'AppDataService', 'ngDialog',
        function ($scope, $http, $timeout, urlBase, WaitingService, AppDataService, ngDialog) {
            $scope.isLoading = false;
            $scope.isInitialLoading = true;
            $scope.items = [];
            $scope.query = null
            $scope.module_name = 'countries';
            $scope.column_array = []

            $scope.getListFn = function (isReload = false) {
                $scope.items = [];
                if (isReload) {
                    $scope.query = null
                }

                $scope.isInitialLoading = true;

                AppDataService.getCountries({
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

            $scope.deleteFn = function (id, index) {
                WaitingService.questionSimple('QUESTION_DELETE_COUNTRY_TEXT',
                    function () {
                        WaitingService.begin();
                        AppDataService.deleteCountry(id).then(function (res) {
                            if (res.success) {
                                $scope.items.splice(index, 1);
                                WaitingService.popSuccess(res.message);
                            } else {
                                WaitingService.error(res.message);
                            }
                        });
                    });
            };

            $scope.openCreateCountryDialog = function () {
                $scope.createCountryDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'country', 'create.dialog'),
                    className: 'ngdialog-theme-default md-box',
                    scope: $scope,
                    controller: ['$scope', 'AppDataService', 'WaitingService', function ($scope, AppDataService, WaitingService) {
                        $scope.createCountryFn = function () {
                            WaitingService.begin();
                            AppDataService.createCountry($scope.country).then(
                                function (res) {
                                    if (res.success) {
                                        WaitingService.popSuccess(res.message);
                                        $scope.closeThisDialog({newCountry: res.data});
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

                $scope.createCountryDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.newCountry)) {
                        $scope.isLoading = true;
                        $scope.getListFn();
                    }
                });
            };

            $scope.editCountryDialog = function (country) {
                $scope.currentCountry = country;
                $scope.detailCountryDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'country', 'edit.dialog'),
                    className: 'ngdialog-theme-default md-box',
                    scope: $scope,
                    controller: ['$scope', 'AppDataService', 'WaitingService', function ($scope, AppDataService, WaitingService) {
                        $scope.country = $scope.currentCountry;
                        $scope.country.active = parseInt($scope.currentCountry.active);
                        $scope.isLoading = true;

                        $scope.getDetailFn = function () {
                            let id = angular.isDefined($scope.currentCountry.id) ? $scope.currentCountry.id : 0;
                            if (id === 0) {
                                $scope.isLoading = false;
                                return;
                            }

                            AppDataService.getCountryDetail(id).then(
                                function (res) {
                                    if (res.success) {
                                        $scope.country = res.data;
                                        $scope.supportedLanguages = res.supportedLanguages;
                                        if ($.isPlainObject(res.countryTranslations)) {
                                            $scope.countryTranslations = res.countryTranslations;
                                        }
                                    } else {
                                        WaitingService.error(res.msg);
                                    }
                                    $scope.isLoading = false;
                                }, function (error) {
                                    $scope.isLoading = false;
                                    WaitingService.expire();
                                });
                        };
                        $scope.getDetailFn();
                        
                        $scope.updateCountryFn = function () {
                            WaitingService.begin();
                            AppDataService.updateCountry($scope.country).then(
                                function (res) {
                                    if (res.success) {
                                        WaitingService.popSuccess(res.message);
                                        $scope.closeThisDialog({country: res.data});
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
                $scope.detailCountryDialog.closePromise.then(function (data) {
                    if (angular.isDefined(data.value.country)) {
                        $scope.isLoading = true;
                        $scope.getListFn();
                    }
                    if (angular.isDefined(data.value) && angular.isDefined(data.value.deletedCountry)) {
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