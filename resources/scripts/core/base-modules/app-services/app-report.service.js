(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppReportService', AppReportService);

    AppReportService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppReportService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.getReportByWeek = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/report/getReportByWeek', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        
        this.getReportByMonth = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/report/getReportByMonth', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        
        this.getReportProgress = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/report/getReportProgress', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
    }
})();
