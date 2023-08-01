(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.user-group', {
                url: '/user-group',
                title: 'USER_GROUPS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'user-group/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.user-group.list', {
                url: '',
                title: 'USER_GROUPS_TEXT',
                templateUrl: helper.modulePath('app', 'user-group/items', '_=' + Math.random())
            }).state('app.user-group.create', {
                url: '/create',
                title: 'CREATE_USER_GROUP_TEXT',
                parent: 'app.user-group.list',
                views: {
                    '@app.user-group': {
                        templateUrl: helper.modulePath('app', 'user-group/form', '_=' + Math.random())
                    }
                },
            }).state('app.user-group.edit', {
                url: '/edit/{id}',
                title: 'EDIT_USER_GROUP_TEXT',
                parent: 'app.user-group.list',
                views: {
                    '@app.user-group': {
                        templateUrl: helper.modulePath('app', 'user-group/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();