(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.product-field-group', {
                url: '/product-field-group',
                title: 'PRODUCT_FIELD_GROUPS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'product-field-group/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.product-field-group.list', {
                url: '',
                title: 'PRODUCT_FIELD_GROUPS_TEXT',
                templateUrl: helper.modulePath('app', 'product-field-group/items', '_=' + Math.random())
            }).state('app.product-field-group.create', {
                url: '/create',
                title: 'CREATE_PRODUCT_FIELD_GROUP_TEXT',
                parent: 'app.product-field-group.list',
                views: {
                    '@app.product-field-group': {
                        templateUrl: helper.modulePath('app', 'product-field-group/form', '_=' + Math.random())
                    }
                },
            }).state('app.product-field-group.edit', {
                url: '/edit/{id}',
                title: 'EDIT_PRODUCT_FIELD_GROUP_TEXT',
                parent: 'app.product-field-group.list',
                views: {
                    '@app.product-field-group': {
                        templateUrl: helper.modulePath('app', 'product-field-group/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();