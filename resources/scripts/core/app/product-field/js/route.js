(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.product-field', {
                url: '/product-field',
                title: 'PRODUCT_FIELDS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'product-field/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.product-field.list', {
                url: '',
                title: 'PRODUCT_FIELDS_TEXT',
                templateUrl: helper.modulePath('app', 'product-field/items', '_=' + Math.random())
            }).state('app.product-field.import', {
                url: '/import',
                title: 'IMPORT_PRODUCT_FIELD_TEXT',
                parent: 'app.product-field.list',
                views: {
                    '@app.product-field': {
                        templateUrl: helper.modulePath('app', 'product-field/import', '_=' + Math.random())
                    }
                },
            }).state('app.product-field.create', {
                url: '/create',
                title: 'CREATE_PRODUCT_FIELD_TEXT',
                parent: 'app.product-field.list',
                views: {
                    '@app.product-field': {
                        templateUrl: helper.modulePath('app', 'product-field/form', '_=' + Math.random())
                    }
                },
            }).state('app.product-field.edit', {
                url: '/edit/{id}',
                title: 'EDIT_PRODUCT_FIELD_TEXT',
                parent: 'app.product-field.list',
                views: {
                    '@app.product-field': {
                        templateUrl: helper.modulePath('app', 'product-field/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();