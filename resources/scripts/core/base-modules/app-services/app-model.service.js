(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppModelService', AppModelService);

    AppModelService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppModelService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/model/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/model/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteModel = function (uuid) {
            var deferred = $q.defer();
            AppHttp.delete('/app/model/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createModel = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/model/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateModel = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/model/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailModel = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/model/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
