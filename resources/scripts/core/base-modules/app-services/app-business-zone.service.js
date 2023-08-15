(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppBusinessZoneService', AppBusinessZoneService);

    AppBusinessZoneService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppBusinessZoneService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/business-zone/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/business-zone/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteBusinessZone = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/business-zone/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createBusinessZone = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/business-zone/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateBusinessZone = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/business-zone/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailBusinessZone = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/business-zone/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
