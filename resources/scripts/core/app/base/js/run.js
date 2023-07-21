(function () {
    'use strict';

    App.run(appGmsRun);

    appGmsRun.$inject = ['$rootScope', 'AppAuthService', 'AppAclService', 'ngDialog', '$state', '$translate', '$stateParams', '$location', '$window', 'AUTH_EVENTS'];

    function appGmsRun($rootScope, AppAuthService, AppAclService, ngDialog, $state, $translate, $stateParams, $location, $window, AUTH_EVENTS) {
        $rootScope.$on("$locationChangeStart", function (event, next, current) {

        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.validateRoute = AppAclService.validateRoute;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //console.info('$stateChangeStart >> toState', toState);
            $rootScope.breadcrumbs = [];
            $state.previous = fromState;
            ngDialog.closeAll();
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error.message === 'ACL_FAILED') {
                $state.transitionTo('app.error-permission-not-found', {}, {location: true});
                return;
            }
            if (error.message === 'DATA_NOT_FOUND') {
                alert($translate.instant('DATA_NOT_FOUND_TEXT'));
                $state.go('app.data-not-found', {}, {location: true});
                return;
            }

            if (error.message === 'TASK_NOT_FOUND') {
                alert($translate.instant('TASK_NOT_FOUND_TEXT'));
                $state.go('app.data-not-found', {}, {location: true});
                return;
            }

            if (error.message === 'RELOCATION_NOT_FOUND') {
                alert($translate.instant('RELOCATION_NOT_FOUND_TEXT'));
                $state.go('app.data-not-found', {}, {location: true});
                return;
            }

            if (error.message === 'PERMISSION_NOT_FOUND') {
                $state.transitionTo('app.error-permission-not-found', {}, {location: true});
                return;
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            ngDialog.closeAll();
        });


        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $state.go('login.auth');
        });

        $rootScope.$watchCollection('breadcrumbs', function (value) {
            //console.info('breadcrumbs', value);
        })

        $rootScope.$on(AUTH_EVENTS.notPaid, function () {
            $state.go('app.error-payment-required');
        });


    };
})();
