(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
            $stateProvider.state('app.currency', {
                url: '/currency',
                title: 'LIST_OF_EMAIL_TEMPLATE_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'file-saver', 'tinyMce'),
                parent: 'app.admin-page.dashboard',
                abstract: true,
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'currency/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.currency.list', {
                url: '',
                title: 'CURRENCIES_TEXT',
                templateUrl: helper.modulePath('app', 'currency/list', '_=' + Math.random()),
            })
        }]);

})();