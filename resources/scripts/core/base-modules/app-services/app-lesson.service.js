(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppLessonService', AppLessonService);

    AppLessonService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppLessonService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

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

    }
})();
