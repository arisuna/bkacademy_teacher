(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appCityFullSelector', appCityFullSelector);

    appCityFullSelector.$inject = ['$timeout', 'AppGeonameService', 'urlBase', 'ngDialog', 'AppSystem'];

    function appCityFullSelector($timeout, AppGeonameService, urlBase, ngDialog, AppSystem) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                modelText: '=ngModelText',
                countryId: '<',
                isRequired: '<',
                label: '@',
                isGeonameid: '<?',
                isOptional: '<?',
                isObject: '<?',
                step: '@',
                requiredMessage: '@',
                showLabel: '<?',
                labelFloating: '<',
                name: '@',
                init: '<',
                ngChange: '&?',
                readonly: '<?ngReadonly',
                disabled: '<?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'city-full-selector-item'),
            link: function (scope, element, attrs) {
                if (scope.name == '' || angular.isUndefined(scope.name)) {
                    scope.name = 'hr_city_full';
                }
                scope.realName = scope.name + "_" + parseInt(Math.random() * 100).toString();

                if (angular.isUndefined(scope.labelFloating) || scope.labelFloating == false) {
                    scope.labelFloating = false;
                    scope.className = '';
                    scope.placeholder = 'Select City'
                } else {
                    scope.className = 'float-label'
                    scope.placeholder = '';
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'City is required'
                }


                if (!angular.isUndefined(scope.init)) {
                    if (scope.init != '') {
                        scope.model = scope.init;
                    }
                }
            },
            controller: function ($scope, $element, $attrs) {
                //-------------- process action in directive ---------------//
                $scope.search = {
                    query: '',
                    page: 1,
                    limit: 20
                };


                $scope.cityPreSelected = {};
                $scope.citySelected = {};
                $scope.isLoading = false;
                $scope.totalCities = 0;
                $scope.totalPages = 0;
                $scope.hasCustomCity = false;
                $scope.customCityName = '';

                $scope.cities = [];
                $scope.openModal = function () {
                    $scope.customCityName = '';
                    $scope.search = {
                        query: '',
                        page: 1,
                        limit: 20
                    };

                    $scope.citySelected = {geonameid:null};
                    $scope.cityPreSelected = {geonameid:null};

                    $scope.searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'city-full-selector-modal-search'),
                        className: 'ngdialog-theme-default md-box',
                        scope: $scope,
                        controller: ['AppGeonameService', 'AppSystem', function (AppGeonameService, AppSystem) {
                            let countries = AppSystem.getCountries();
                            $timeout(function () {
                                $scope.country = _.find(countries, function (o) {
                                    return o.id == $scope.countryId;
                                });
                            });
                        }]
                    });
                    $scope.initSearch();
                };


                $scope.searchCities = function () {
                    $scope.isLoading = true;
                    $scope.search.country_id = $scope.countryId;
                    $scope.hasCustomCity = false;
                    AppGeonameService.getCities($scope.search).then(function (res) {
                        if (res.success) {
                            $scope.cities = _.concat($scope.cities, res.data);
                            $scope.totalCities = res.total_items;
                            $scope.totalPages = res.total_pages;
                            $scope.search.page = res.current;
                            $scope.isLoading = false;
                        } else {
                            $scope.isLoading = false;
                        }
                    });
                };

                $scope.initSearch = function () {
                    $scope.search.page = 1;
                    $scope.cities = [];
                    $scope.totalCities = 0;
                    $scope.totalPages = 0;
                    $scope.searchCities();
                }

                $scope.loadMoreCities = function () {
                    $scope.search.page = $scope.search.page + 1;
                    console.log($scope.search.page);
                    $scope.searchCities();
                };

                $scope.addCustomCity = function () {
                    $scope.cityReference = {};
                    $scope.citySelected = {};
                    $scope.cityPreSelected = {};
                    $scope.hasCustomCity = true;
                }

                $scope.selectCity = function (city) {
                    $scope.citySelected = city;
                };

                $scope.preSelectCity = function (city) {
                    $scope.hasCustomCity = false;
                    $scope.cityPreSelected = city;
                }

                $scope.confirmSelect = function () {

                    if ($scope.hasCustomCity == true) {
                        if (_.isString($scope.customCityName) && _.trim($scope.customCityName) != '') {
                            $scope.modelText = $scope.customCityName;
                            $scope.searchDialog.close();
                        }
                    } else {

                        if ($scope.cityPreSelected) {

                            $scope.cityReference = angular.copy($scope.cityPreSelected);
                            $scope.citySelected = angular.copy($scope.cityPreSelected);

                            if ($scope.isGeonameid == true) {
                                $scope.model = $scope.citySelected.geonameid;
                            } else if ($scope.isObject == true) {
                                $scope.model = $scope.citySelected;
                            } else {
                                $scope.model = $scope.citySelected.geonameid;
                            }

                            $scope.modelText = $scope.citySelected.name;

                            if (angular.isFunction($scope.ngChange)) {
                                $scope.$evalAsync(function () {
                                    $scope.ngChange($scope.citySelected);
                                });
                            }
                            $scope.searchDialog.close();
                        }
                    }
                };

                $scope.removeCitySelected = function () {
                    $scope.cityReference = {};
                    $scope.citySelected = {};
                    $scope.cityPreSelected = {};
                    $scope.model = null;
                    $scope.modelText = null;
                    if (angular.isFunction($scope.ngChange)) {
                        $scope.$evalAsync(function () {
                            $scope.ngChange($scope.citySelected);
                        });
                    }
                };

                $scope.$watch('model', function () {
                    if ($scope.model == null) {
                        $scope.cityReference = {};
                        $scope.citySelected = {};
                    } else {
                        if ($scope.isObject == true && angular.isDefined($scope.model.geonameid)) {
                            AppGeonameService.getCity($scope.model.geonameid).then(function (res) {
                                if (res.success) {
                                    $scope.cityReference = res.data;
                                    $scope.citySelected = res.data;
                                }
                            })
                        } else if ($scope.isGeonameid == true && $scope.model > 0) {
                            AppGeonameService.getCity($scope.model).then(function (res) {
                                if (res.success) {
                                    $scope.cityReference = res.data;
                                    $scope.citySelected = res.data;
                                }
                            })
                        } else {
                            $scope.cityReference = {};
                            $scope.citySelected = {};
                        }

                    }
                });

                $scope.$watch('countryId', function (newValue, oldValue) {
                    console.log('oldValue',oldValue);
                    console.log('newValue',newValue);
                    if (_.isNumber(oldValue) && oldValue > 0) {
                        if (_.isNull(newValue) || angular.isUndefined(newValue) ||
                            (_.isNumber(newValue) && parseInt(newValue) == 0) ||
                            (oldValue != newValue)) {
                            $scope.removeCitySelected();
                        }
                    }
                });
            }
        };
        return directive;
    }
})();
