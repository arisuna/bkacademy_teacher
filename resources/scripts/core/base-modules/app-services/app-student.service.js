(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppStudentService', AppStudentService);

    AppStudentService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppStudentService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;


        this.getStudentDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/student/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getStudentList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/student/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAllStudentList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/student/getList', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteStudent = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/student/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createStudent = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/student/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateStudent = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/student/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
