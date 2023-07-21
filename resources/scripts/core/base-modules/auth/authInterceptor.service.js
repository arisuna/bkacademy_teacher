/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auth')
        .service('AuthInterceptorService', AuthInterceptorService);

    AuthInterceptorService.$inject = ['$http', '$q', '$localStorage','$injector'];

    function AuthInterceptorService($http, $q, $localStorage, $injector) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authService = $injector.get('AuthService');
            var token = localStorage.getItem(authService.authentication.isClient ? 'clientToken' : 'staffToken');
            if (token) {
                if (config.headers['Content-Type'] != "application/x-www-form-urlencoded")
                    config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            var deferred = $q.defer();

            var authService = $injector.get('authService');
            if (rejection.status === 401) {
                authService.logout();
                deferred.reject(rejection);
                $location.path('/');
            }else{
                deferred.reject(rejection);
            }
            return deferred.promise;
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

    }

})();
