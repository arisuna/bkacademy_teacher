(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppBusinessOrderService', AppBusinessOrderService);

    AppBusinessOrderService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppBusinessOrderService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.config = {
            _status_list: [
                {name: 'PENDING_STATUS_TEXT', value: 1, color: 'dark-gray', text: 'PENDING_STATUS_TEXT'},
                {name: 'CONFIRMED_STATUS_TEXT', value: 2, color: 'green', text: 'CONFIRMED_STATUS_TEXT'},
                {name: 'COMPLETED_STATUS_TEXT', value: 3, color: 'bright-blue', text: 'COMPLETED_STATUS_TEXT'},
                {name: 'CANCELLED_STATUS_TEXT', value: -1, color: 'red', text: 'CANCELLED_STATUS_TEXT'},
            ],
        }

        this.getStatusList = function(){
            return this.config._status_list;
        }
        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/business-order/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/business-order/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteBusinessOrder = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/business-order/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
        

        this.detailBusinessOrder = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/business-order/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.setCompleted = function(data){
            var deferred = $q.defer();
            AppHttp.put('/app/business-order/setCompleted/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setCancelled = function(data){
            var deferred = $q.defer();
            AppHttp.put('/app/business-order/setCancelled/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setConfirmed = function(data){
            var deferred = $q.defer();
            AppHttp.put('/app/business-order/setConfirmed/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

    }
})();
