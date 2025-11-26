(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppTopicService', AppTopicService);

    AppTopicService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppTopicService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/topic/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteTopic = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/topic/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createTopic = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/topic/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateTopic = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/topic/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailTopic = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/topic/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
