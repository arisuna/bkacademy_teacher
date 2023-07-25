(function () {
    'use strict';

    App.factory('AppAuthResolver', AppAuthResolver);

    AppAuthResolver.$inject = ['$q', '$rootScope', '$state'];

    function AppAuthResolver($q, $rootScope, $state) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch('currentUser', function (currentUser) {

                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject({message: 'AUTHENTICATION_FAILED'});
                            $state.go('login.auth');
                        }
                        unwatch();
                    }
                });
                return deferred.promise;
            }
        };
    }
})();
