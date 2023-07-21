(function () {
    'use strict';

    angular
        .module('app.app-services-auth')
        .factory('AppAuthResolver2', AppAuthResolver2);

    AppAuthResolver2.$inject = ['$q', '$rootScope', '$state'];

    function AppAuthResolver2($q, $rootScope, $state) {

        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject();
                        }
                        unwatch();
                    }
                });
                return deferred.promise;
            }
        };
    }
})
();