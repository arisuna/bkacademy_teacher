(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppBasicContentService', AppBasicContentService);

    AppBasicContentService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppBasicContentService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;




        this.delete = function (uuid) {
            var deferred = $q.defer();
            AppHttp.delete('/app/basic-content/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.create = function (data) {
            var deferred = $q.defer();
            data.encodeDescription = data.description ? btoa(encodeURIComponent(data.description)) : '';
            AppHttp.post('/app/basic-content/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.update = function (data) {
            var deferred = $q.defer();
            data.encodeDescription = data.description ? btoa(encodeURIComponent(data.description)) : '';

            AppHttp.put('/app/basic-content/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/basic-content/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
