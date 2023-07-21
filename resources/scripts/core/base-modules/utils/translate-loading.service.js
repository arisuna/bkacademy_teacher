(function () {
    'use strict';

    angular
        .module('app.utils')
        .service('TranslateLoadingService', TranslateLoadingService);

    TranslateLoadingService.$inject = ['$translatePartialLoader', '$rootScope', '$q'];

    function TranslateLoadingService($translatePartialLoader, $rootScope, $q) {

        let vm = this;

        this.getPromise = function () {
            var deferred = $q.defer();
            $translatePartialLoader.addPart('customers');
            $rootScope.$on('$translateChangeSuccess', function () {
                deferred.resolve();
            });
            return deferred.promise;
        }

    }
})();
