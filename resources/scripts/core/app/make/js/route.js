(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.make', {
                url: '/make',
                title: 'MAKES_AND_MODELS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'make/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.make.list', {
                url: '',
                title: 'MAKES_AND_MODELS_TEXT',
                templateUrl: helper.modulePath('app', 'make/items', '_=' + Math.random())
            }).state('app.make.create', {
                url: '/create',
                title: 'CREATE_BRAND_TEXT',
                parent: 'app.make.list',
                views: {
                    '@app.make': {
                        templateUrl: helper.modulePath('app', 'make/form', '_=' + Math.random())
                    }
                },
            }).state('app.make.edit', {
                url: '/edit/{id}',
                title: 'EDIT_BRAND_TEXT',
                parent: 'app.make.list',
                views: {
                    '@app.make': {
                        templateUrl: helper.modulePath('app', 'make/form', '_=' + Math.random())
                    }
                },
            }).state('app.make.clone', {
                url: '/clone/{id}',
                title: 'CLONE_BRAND_TEXT',
                parent: 'app.make.list',
                views: {
                    '@app.make': {
                        templateUrl: helper.modulePath('app', 'make/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();