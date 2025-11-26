(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppKnowledgePointService', AppKnowledgePointService);

    AppKnowledgePointService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppKnowledgePointService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/knowledge-point/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteKnowledgePoint = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/knowledge-point/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createKnowledgePoint = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/knowledge-point/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateKnowledgePoint = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/knowledge-point/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailKnowledgePoint = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/knowledge-point/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
