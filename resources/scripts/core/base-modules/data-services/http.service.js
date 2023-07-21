(function () {
    'use strict';

    angular
        .module('app.data-services')
        .service('DataHttp', DataHttp);

    DataHttp.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', '__env', '$cacheFactory'];

    function DataHttp($http, $q, $httpParamSerializer, $localStorage, $filter, moment, __env, $cacheFactory) {

        var vm = this;

        this.get = function (url, data) {
            return $http.get(__env.apiHostname + url, data);
        }

        this.getFromCacheHttp = function (url, data) {
            /*
            var $httpDefaultCache = $cacheFactory.get('$http');
            return $httpDefaultCache.get(__env.apiHostname + url, data);
            */

            var objectCache = '';
            return $http({
                url: __env.apiHostname + url,
                method: 'GET',
                cache: true
            });

        }

        this.getFromCacheName = function (url, data) {
            var objectCache = $cacheFactory.get(data.cacheName) || $cacheFactory(data.cacheName, {capacity: 10});
            return $http({
                url: __env.apiHostname + url,
                method: 'GET',
                cache: objectCache
            });
        }

        this.getImage = function (url) {
            return $http.get(url, {responseType: 'arraybuffer'});
        }

        this.post = function (url, data, headers) {
            return $http.post(__env.apiHostname + url, data, headers);
        }

        this.put = function (url, data) {
            return $http.put(__env.apiHostname + url, data);
        }

        this.delete = function (url, data) {
            return $http.delete(__env.apiHostname + url, data);
        }

        this.options = function (url, data) {
            return $http.options(__env.apiHostname + url, data);
        }
    }
})();
