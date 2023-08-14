(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
            $stateProvider.state('app.country', {
                url: '/country',
                title: 'COUNTRIES_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'file-saver', 'tinyMce'),
                parent: 'app.admin-page.dashboard',
                abstract: true,
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'country/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.country.list', {
                url: '',
                title: 'COUNTRIES_TEXT',
                templateUrl: helper.modulePath('app', 'country/list', '_=' + Math.random()),
            })
        }]);

})();