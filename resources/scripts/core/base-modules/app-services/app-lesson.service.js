(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppLessonService', AppLessonService);

    AppLessonService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppLessonService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;
        this.config = {
            __rating_list: [
                {
                    name: 'ARCHIVED_TEXT',
                    value: 2,
                    id: 2,
                    color: 'green',
                    label: 'ARCHIVED_TEXT'
                },
                // {
                //     name: 'ALMOST_ARCHIVED_TEXT',
                //     value: 1,
                //     id: 1,
                //     color: 'yellow',
                //     label: 'ALMOST_ARCHIVED_TEXT'
                // },
                {
                    name: 'NOT_ARCHIVED_TEXT',
                    value: 0,
                    id: 0,
                    color: 'red',
                    label: 'NOT_ARCHIVED_TEXT'
                },
            ]
        };

        this.getRatingList = function () {
            return vm.config.__rating_list;
        };

        this.getLessonList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/lesson/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteLesson = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/lesson/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createLesson = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/lesson/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.generateLessonBulk = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/lesson/generateBulk', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateLesson = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/lesson/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailLesson = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/lesson/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateScore = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/lesson/updateScore', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getStudentScore = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/lesson/getStudentScore', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getStudentScores = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/lesson/getStudentScores/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
