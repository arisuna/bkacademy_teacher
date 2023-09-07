(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppGeonameService', AppGeonameService);

    AppGeonameService.$inject = ['$q', '$http', '$timeout', 'DataHttp', 'WaitingService', '$rootScope'];

    function AppGeonameService($q, $http, $timeout, DataHttp, WaitingService, $rootScope) {

        var vm = this;

        this.getCities = function (data) {
            var deferred = $q.defer();
            DataHttp.put('/app/city/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCity = function (geonameid) {
            var deferred = $q.defer();
            DataHttp.get('/app/city/item/' + geonameid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
    }
})();
