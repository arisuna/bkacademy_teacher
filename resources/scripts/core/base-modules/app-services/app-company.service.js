(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppCompanyService', AppCompanyService);

    AppCompanyService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppCompanyService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        const vm = this;

        this.getCompanyDetail = function (id) {
            const deferred = $q.defer();
            AppHttp.get('/app/company/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getCompanyList = function (params) {
            const deferred = $q.defer();
            AppHttp.put('/app/company/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteCompany = function (id, confirmText) {
            const deferred = $q.defer();
            AppHttp.putWithPassword('/app/company/delete/' + id, {id: id, confirmText: confirmText})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createCompany = function (data) {
            const deferred = $q.defer();
            AppHttp.post('/app/company/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateCompany = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/company/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.getBankAccounts = function (uuid) {
            const deferred = $q.defer();
            AppHttp.get('/app/company/getBankAccounts/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createBankAccount = function (data) {
            const deferred = $q.defer();
            AppHttp.post('/app/company/createBankAccount', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateBankAccount = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/company/updateBankAccount', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.removeBankAccount = function (uuid) {
            const deferred = $q.defer();
            AppHttp.delete('/app/company/removeBankAccount/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
