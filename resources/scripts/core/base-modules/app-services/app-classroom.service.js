(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppClassroomService', AppClassroomService);

    AppClassroomService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppClassroomService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        const vm = this;

        this.getClassroomDetail = function (id) {
            const deferred = $q.defer();
            AppHttp.get('/app/classroom/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getClassroomList = function (params) {
            const deferred = $q.defer();
            AppHttp.put('/app/classroom/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteClassroom = function (id, confirmText) {
            const deferred = $q.defer();
            AppHttp.putWithPassword('/app/classroom/delete/' + id, {id: id, confirmText: confirmText})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createClassroom = function (data) {
            const deferred = $q.defer();
            AppHttp.post('/app/classroom/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateClassroom = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/classroom/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
