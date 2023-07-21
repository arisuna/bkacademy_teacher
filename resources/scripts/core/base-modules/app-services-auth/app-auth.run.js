(function () {
    'use strict';

    angular
        .module('app.app-services-auth')
        .run(AppAuthRun);

    AppAuthRun.$inject = ['$rootScope', 'AppAuthService','AUTH_EVENTS'];

    function AppAuthRun($rootScope, AppAuthService, AUTH_EVENTS) {

        AppAuthService.checkTotal();

    }
})();
