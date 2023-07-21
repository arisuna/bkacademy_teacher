(function () {
    'use strict';

    App.factory('GmsAuthResolver', GmsAuthResolver);

    GmsAuthResolver.$inject = ['$q', '$rootScope', '$state'];

    function GmsAuthResolver($q, $rootScope, $state) {
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
