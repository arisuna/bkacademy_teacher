(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.setting-acl', {
                url: '/setting-acl',
                title: 'ACL_SETTINGS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'ng-sortable'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'setting-acl/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.setting-acl.list', {
                url: '',
                title: 'ACL_SETTINGS_TEXT',
                templateUrl: helper.modulePath('app', 'setting-acl/list', '_=' + Math.random())
            });
        }]);
})();