(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppEmailTemplateService', AppEmailTemplateService);

    AppEmailTemplateService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', 'AppHttp'];

    function AppEmailTemplateService($http, $q, $httpParamSerializer, $localStorage, AppHttp) {
        this.getList = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/email-template/index', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.delete = function (data) {
            var deferred = $q.defer();
            AppHttp.delete('/app/email-template/delete/' + data.id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.get = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/email-template/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.update = function (emailTemplate) {
            var deferred = $q.defer();
            AppHttp.put('/app/email-template/update/' + emailTemplate.id, emailTemplate)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.create = function (emailTemplate) {
            var deferred = $q.defer();
            AppHttp.post('/app/email-template/create', emailTemplate)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
    }
})();