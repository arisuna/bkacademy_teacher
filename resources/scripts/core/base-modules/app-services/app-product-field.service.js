(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppProductFieldService', AppProductFieldService);

    AppProductFieldService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppProductFieldService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/product-field/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteProductField = function (uuid) {
            var deferred = $q.defer();
            AppHttp.delete('/app/product-field/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.importProductField = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/product-field/import', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createProductField = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/product-field/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateProductField = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/product-field/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailProductField = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/product-field/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
