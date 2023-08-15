(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.brand', {
                url: '/brand',
                title: 'BRANDS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'brand/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.brand.list', {
                url: '',
                title: 'BRANDS_TEXT',
                templateUrl: helper.modulePath('app', 'brand/items', '_=' + Math.random())
            }).state('app.brand.create', {
                url: '/create',
                title: 'CREATE_BRAND_TEXT',
                parent: 'app.brand.list',
                views: {
                    '@app.brand': {
                        templateUrl: helper.modulePath('app', 'brand/form', '_=' + Math.random())
                    }
                },
            }).state('app.brand.edit', {
                url: '/edit/{id}',
                title: 'EDIT_BRAND_TEXT',
                parent: 'app.brand.list',
                views: {
                    '@app.brand': {
                        templateUrl: helper.modulePath('app', 'brand/form', '_=' + Math.random())
                    }
                },
            }).state('app.brand.clone', {
                url: '/clone/{id}',
                title: 'CLONE_BRAND_TEXT',
                parent: 'app.brand.list',
                views: {
                    '@app.brand': {
                        templateUrl: helper.modulePath('app', 'brand/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();