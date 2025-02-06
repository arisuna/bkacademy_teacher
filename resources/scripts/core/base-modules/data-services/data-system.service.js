(function () {
    'use strict';

    angular
        .module('app.data-services')
        .service('DataSystem', DataSystem);

    DataSystem.$inject = ['DataHttp', '$timeout', '$q', '$translate', 'DataService', '$localStorage', '_'];

    function DataSystem(DataHttp, $timeout, $q, $translate, DataService, $localStorage, _) {

        var vm = this;

        this.data = {
            countries: [],
            countries_iso: [],
            currencies: [],
            zone_langs: [],
            nationalities: []
        }

        this.getSystemData = function () {
            var deferred = $q.defer();
            var self = this;
            var promiseList = [];

            promiseList.push(
                DataService.getClientTimeZone().then(function (response) {
                    if (response.success == true) {

                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                })
            );


            promiseList.push(
                DataService.getZoneLangList().then(function (response) {
                    if (response.success == true) {
                        self.data.zone_langs = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                })
            );

            promiseList.push(
                DataService.getListCurrencies().then(function (response) {
                    if (response.success == true) {
                        self.data.currencies = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                })
            );


            promiseList.push(DataService.getServerTimeZone().then(
                function (response) {
                    if (response.success == true) {
                        self.data.server_time_zone = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                }));


            promiseList.push(DataService.getNationalities().then(
                function (response) {
                    if (response.success == true) {
                        self.data.nationalities.splice(self.data.nationalities.length);
                        angular.extend(self.data.nationalities, response.data);
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                }));

            $q.all(promiseList)
                .then(function (values) {
                    console.log('data-system:inited');
                    self.inited = true;
                    deferred.resolve(values);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        this.getCountries = function () {
            return vm.data.countries;
        }

        this.getCountriesIso = function () {
            return vm.data.countries_iso;
        }

        this.getCurrencies = function () {
            return vm.data.currencies;
        }

        this.getNationalities = function () {
            return vm.data.nationalities;
        }

        this.getZoneLangList = function () {
            return vm.data.zone_langs;
        }
    }
})();
