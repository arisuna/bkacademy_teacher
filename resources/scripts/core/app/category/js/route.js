(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.category', {
                url: '/category',
                title: 'CATEGORIES_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'ng-sortable'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'category/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.category.list', {
                url: '',
                title: 'CATEGORIES_TEXT',
                controller: 'CategorySettingController',
                templateUrl: helper.modulePath('app', 'category/list', '_=' + Math.random())
            });
        }]);
})();