(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppProductModelService', AppProductModelService);

    AppProductModelService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppProductModelService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/product-model/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/product-model/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteProductModel = function (uuid) {
            var deferred = $q.defer();
            AppHttp.delete('/app/product-model/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createProductModel = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/product-model/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateProductModel = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/product-model/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailProductModel = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/product-model/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
