(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppMakeService', AppMakeService);

    AppMakeService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppMakeService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.preCreate = function () {
            let deferred = $q.defer();
            AppHttp.post('/app/brand/preCreate').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        
        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/brand/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteMake = function (uuid) {
            var deferred = $q.defer();
            AppHttp.delete('/app/brand/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createMake = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/brand/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.cloneMake = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/brand/clone', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateMake = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/brand/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailMake = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/brand/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
