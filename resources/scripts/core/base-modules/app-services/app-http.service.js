(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppHttp', AppHttp);

    AppHttp.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', '__env'];

    function AppHttp($http, $q, $httpParamSerializer, $localStorage, $filter, moment, __env) {

        var vm = this;


        this.get = function (url, data) {
            return $http.get(__env.apiHostname + url, data);
        }

        this.post = function (url, data, options = {}) {
            return $http.post(__env.apiHostname + url, data, options);
        }

        this.postWithPassword = function (url, data, config) {
            if (angular.isUndefined(config)) {
                return $http.post(__env.apiHostname + url, data);
            } else {
                if (angular.isDefined(config.password)) {
                    if (angular.isUndefined(config.headers)) {
                        config.headers = [];
                    }
                    config.headers['Password'] = config.password;
                }
                return $http.post(__env.apiHostname + url, data, config);
            }
        }

        this.put = function (url, data) {
            return $http.put(__env.apiHostname + url, data);
        }


        this.putWithPassword = function (url, data, config) {
            if (angular.isUndefined(config)) {
                return $http.put(__env.apiHostname + url, data);
            } else {
                if (angular.isDefined(config.password)) {
                    if (angular.isUndefined(config.headers)) {
                        config.headers = [];
                    }
                    config.headers['Password'] = config.password;
                }
                return $http.put(__env.apiHostname + url, data, config);
            }
        }

        this.delete = function (url, config) {
            if (angular.isUndefined(config)) {
                return $http.delete(__env.apiHostname + url);
            } else {
                if (angular.isDefined(config.password)) {
                    if (angular.isUndefined(config.headers)) {
                        config.headers = [];
                    }
                    config.headers['Password'] = config.password;
                }
                return $http.delete(__env.apiHostname + url, config);
            }
        }

        this.options = function (url, data) {
            return $http.options(__env.apiHostname + url, data);
        }
    }
})();
