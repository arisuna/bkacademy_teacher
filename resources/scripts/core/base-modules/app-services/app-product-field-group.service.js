(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppProductFieldGroupService', AppProductFieldGroupService);

    AppProductFieldGroupService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppProductFieldGroupService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/product-field-group/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateFieldGroupAfterImport = function () {
            let deferred = $q.defer();
            AppHttp.put('/app/product-field-group/updateAfterImport').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/product-field-group/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteProductFieldGroup = function (uuid) {
            var deferred = $q.defer();
            AppHttp.delete('/app/product-field-group/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createProductFieldGroup = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/product-field-group/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateProductFieldGroup = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/product-field-group/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailProductFieldGroup = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/product-field-group/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
