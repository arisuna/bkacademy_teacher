(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppUserService', AppUserService);

    AppUserService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppUserService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;


        this.getUserDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/user/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getUserList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/user/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteUser = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/user/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createUser = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/user/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateUser = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/user/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.upgradeToLvl2 = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/user/upgradeToLvl2/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.rejectToLvl2 = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/user/rejectToLvl2/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.changeToPending = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/user/changeToPending/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.getBankAccounts = function (uuid) {
            const deferred = $q.defer();
            AppHttp.get('/app/user/getBankAccounts/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createBankAccount = function (data) {
            const deferred = $q.defer();
            AppHttp.post('/app/user/createBankAccount', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateBankAccount = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/user/updateBankAccount', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.removeBankAccount = function (uuid) {
            const deferred = $q.defer();
            AppHttp.delete('/app/user/removeBankAccount/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
