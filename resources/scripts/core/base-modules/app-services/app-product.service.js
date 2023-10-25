(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppProductService', AppProductService);

    AppProductService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', '$translate', 'moment', 'AppHttp'];

    function AppProductService($http, $q, $httpParamSerializer, $localStorage, $filter, $translate, moment, AppHttp) {


        this.config = {
            __period_list: [
                {name: $translate.instant("DAILY_TEXT"), value: 2},
                {name: $translate.instant("WEEKLY_TEXT"), value: 3},
                {name: $translate.instant("MONTHLY_TEXT"), value: 4},
                {name: $translate.instant("QUARTERLY_TEXT"), value: 5},
                {name: $translate.instant("YEARLY_TEXT"), value: 6},
            ],
        };

        var vm = this;



        this.getPeriodList = function () {
            return vm.config.__period_list;
        }


        this.getProductDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/product/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getProductList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/product/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteProduct = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/product/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createProduct = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/product/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateProduct = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/product/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();
