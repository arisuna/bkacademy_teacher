/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('app.admin-page', {
            url: '/admin-page',
            abstract: true,
            title: 'ADMIN_PAGE_TEXT',
            templateUrl: helper.modulePath('app', 'admin-page/index'),
            acl: 'admin/index',
            params: {
                showSideNav2: true,
                openSideNav2: false,
                iconSideNav2: 'cog',
                templateSideNav2: helper.modulePath('app', 'admin-page/left')
            }
        })
            .state('app.admin-page.dashboard', {
                url: '',
                title: 'ADMIN_PAGE_TEXT',
                templateUrl: helper.modulePath('app', 'admin-page/dashboard'),
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    openSideNav2: false,
                    iconSideNav2: 'cog',
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            });

    }]);
})();
