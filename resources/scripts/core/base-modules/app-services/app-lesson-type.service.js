(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppLessonTypeService', AppLessonTypeService);

    AppLessonTypeService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppLessonTypeService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/lesson-type/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteLessonType = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/lesson-type/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createLessonType = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/lesson-type/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateLessonType = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/lesson-type/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailLessonType = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/lesson-type/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
