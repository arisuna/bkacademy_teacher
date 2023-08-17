(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppBrandService', AppBrandService);

    AppBrandService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppBrandService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/brand/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteBrand = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/brand/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createBrand = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/brand/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateBrand = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/brand/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailBrand = function (id) {
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
