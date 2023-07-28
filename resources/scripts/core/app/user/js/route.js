(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.user', {
                url: '/user',
                title: 'USERS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'user/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.user.list', {
                url: '',
                title: 'USERS_TEXT',
                templateUrl: helper.modulePath('app', 'user/items', '_=' + Math.random())
            }).state('app.user.create', {
                url: '/create',
                title: 'CREATE_USER_TEXT',
                parent: 'app.user.list',
                views: {
                    '@app.user': {
                        templateUrl: helper.modulePath('app', 'user/form', '_=' + Math.random())
                    }
                },
            }).state('app.user.edit', {
                url: '/edit/{id}',
                title: 'EDIT_USER_TEXT',
                parent: 'app.user.list',
                views: {
                    '@app.user': {
                        templateUrl: helper.modulePath('app', 'user/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();