(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.constant', {
                url: '/constant',
                title: 'CONSTANTS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'constant/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.constant.list', {
                url: '',
                title: 'CONSTANTS_TEXT',
                templateUrl: helper.modulePath('app', 'constant/items', '_=' + Math.random())
            }).state('app.constant.create', {
                url: '/create',
                title: 'CREATE_CONSTANT_TEXT',
                parent: 'app.constant.list',
                views: {
                    '@app.constant': {
                        templateUrl: helper.modulePath('app', 'constant/form', '_=' + Math.random())
                    }
                },
            }).state('app.constant.edit', {
                url: '/edit/{id}',
                title: 'EDIT_CONSTANT_TEXT',
                parent: 'app.constant.list',
                views: {
                    '@app.constant': {
                        templateUrl: helper.modulePath('app', 'constant/form', '_=' + Math.random())
                    }
                },
            }).state('app.constant.clone', {
                url: '/clone/{id}',
                title: 'CLONE_CONSTANT_TEXT',
                parent: 'app.constant.list',
                views: {
                    '@app.constant': {
                        templateUrl: helper.modulePath('app', 'constant/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();