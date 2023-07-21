/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            title: 'DASHBOARD_TEXT',
            templateUrl: helper.modulePath('app', 'dashboard/index'),
            acl:'dashboard/index',
            resolve: helper.resolveFor('expat-jvectormap','infinite-scroll', 'expat-scroll'),
            params: {
                hasLeftBar: false,
                noPadding: true
            }
        });
    }]);
})();
