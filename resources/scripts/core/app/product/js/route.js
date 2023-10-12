(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.product', {
                url: '/product',
                title: 'PRODUCTS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                templateUrl: helper.modulePath('app', 'product/index'),
                acl: 'product/index',
            }).state('app.product.list', {
                url: '',
                title: 'PRODUCTS_TEXT',
                templateUrl: helper.modulePath('app', 'product/items', '_=' + Math.random())
            }).state('app.product.create', {
                url: '/create',
                title: 'CREATE_PRODUCT_TEXT',
                parent: 'app.product.list',
                views: {
                    '@app.product': {
                        templateUrl: helper.modulePath('app', 'product/form', '_=' + Math.random())
                    }
                },
            }).state('app.product.edit', {
                url: '/edit/{id}',
                title: 'EDIT_PRODUCT_TEXT',
                parent: 'app.product.list',
                views: {
                    '@app.product': {
                        templateUrl: helper.modulePath('app', 'product/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();