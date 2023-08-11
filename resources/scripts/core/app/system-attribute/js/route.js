(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.system-attribute', {
                url: '/system-attribute',
                title: 'SYSTEM_ATTRIBUTES_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'system-attribute/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.system-attribute.list', {
                url: '',
                title: 'SYSTEM_ATTRIBUTES_TEXT',
                templateUrl: helper.modulePath('app', 'system-attribute/items', '_=' + Math.random())
            }).state('app.system-attribute.create', {
                url: '/create',
                title: 'CREATE_SYSTEM_ATTRIBUTE_TEXT',
                parent: 'app.system-attribute.list',
                views: {
                    '@app.system-attribute': {
                        templateUrl: helper.modulePath('app', 'system-attribute/form', '_=' + Math.random())
                    }
                },
            }).state('app.system-attribute.edit', {
                url: '/edit/{id}',
                title: 'EDIT_SYSTEM_ATTRIBUTE_TEXT',
                parent: 'app.system-attribute.list',
                views: {
                    '@app.system-attribute': {
                        templateUrl: helper.modulePath('app', 'system-attribute/form', '_=' + Math.random())
                    }
                },
            }).state('app.system-attribute.clone', {
                url: '/clone/{id}',
                title: 'CLONE_SYSTEM_ATTRIBUTE_TEXT',
                parent: 'app.system-attribute.list',
                views: {
                    '@app.system-attribute': {
                        templateUrl: helper.modulePath('app', 'system-attribute/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();