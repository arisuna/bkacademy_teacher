(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppProductService', AppProductService);

    AppProductService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppProductService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;


        this.getProductDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/product/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getProductList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/product/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteProduct = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/product/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createProduct = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/product/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateProduct = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/product/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
