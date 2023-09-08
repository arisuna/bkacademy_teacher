(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppAddressService', AppAddressService);

    AppAddressService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppAddressService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        const vm = this;

        this.getAddressDetail = function (id) {
            const deferred = $q.defer();
            AppHttp.get('/app/address/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAddressList = function (params) {
            const deferred = $q.defer();
            AppHttp.put('/app/address/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteAddress = function (id) {
            const deferred = $q.defer();
            AppHttp.delete('/app/address/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createAddress = function (data) {
            const deferred = $q.defer();
            AppHttp.post('/app/address/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateAddress = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/address/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.searchWards = function (params) {
            const deferred = $q.defer();
            AppHttp.put('/app/address/searchWards', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.searchDistricts = function (params) {
            const deferred = $q.defer();
            AppHttp.put('/app/address/searchDistricts', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.searchProvinces = function (params) {
            const deferred = $q.defer();
            AppHttp.put('/app/address/searchProvinces', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
