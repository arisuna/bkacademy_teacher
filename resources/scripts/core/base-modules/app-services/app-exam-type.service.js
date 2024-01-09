(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppExamTypeService', AppExamTypeService);

    AppExamTypeService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppExamTypeService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/exam-type/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteExamType = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/exam-type/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createExamType = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/exam-type/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateExamType = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/exam-type/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailExamType = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/exam-type/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
