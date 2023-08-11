(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.admin-user', {
                url: '/admin-user',
                title: 'ADMIN_USERS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'admin-user/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.admin-user.list', {
                url: '',
                title: 'ADMIN_USERS_TEXT',
                templateUrl: helper.modulePath('app', 'admin-user/items', '_=' + Math.random())
            }).state('app.admin-user.create', {
                url: '/create',
                title: 'CREATE_ADMIN_USER_TEXT',
                parent: 'app.admin-user.list',
                views: {
                    '@app.admin-user': {
                        templateUrl: helper.modulePath('app', 'admin-user/form', '_=' + Math.random())
                    }
                },
            }).state('app.admin-user.edit', {
                url: '/edit/{id}',
                title: 'EDIT_ADMIN_USER_TEXT',
                parent: 'app.admin-user.list',
                views: {
                    '@app.admin-user': {
                        templateUrl: helper.modulePath('app', 'admin-user/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();