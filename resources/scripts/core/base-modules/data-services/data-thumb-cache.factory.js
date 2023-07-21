(function () {
    'use strict';

    angular
        .module('app.data-services')
        .factory('DataThumbCache', DataThumbCache);

    DataThumbCache.$inject = ['$cacheFactory'];

    function DataThumbCache($cacheFactory) {
        return $cacheFactory('data-thumb-cache');
    }
})();
