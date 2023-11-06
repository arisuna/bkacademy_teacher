(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('app.order', {
            url: '/order',
            title: 'ORDERS_TEXT',
            resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
            abstract: true,
            templateUrl: helper.modulePath('app', 'order/index'),
            acl: '',
        }).state('app.order.list', {
            url: '',
            title: 'ORDERS_TEXT',
            templateUrl: helper.modulePath('app', 'order/items', '_=' + Math.random())
        }).state('app.order.edit', {
            url: '/edit/{uuid}',
            title: 'EDIT_ORDER_TEXT',
            parent: 'app.order.list',
            views: {
                '@app.order': {
                    templateUrl: helper.modulePath('app', 'order/edit', '_=' + Math.random())
                }
            },
        });
        }]);
})();