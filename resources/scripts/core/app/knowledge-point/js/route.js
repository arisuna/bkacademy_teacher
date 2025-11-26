(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.knowledge-point', {
                url: '/knowledge-point',
                title: 'CATEGORIES_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'knowledge-point/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.knowledge-point.list', {
                url: '',
                title: 'CATEGORIES_TEXT',
                templateUrl: helper.modulePath('app', 'knowledge-point/items', '_=' + Math.random())
            }).state('app.knowledge-point.create', {
                url: '/create',
                title: 'CREATE_CATEGORY_TEXT',
                parent: 'app.knowledge-point.list',
                views: {
                    '@app.knowledge-point': {
                        templateUrl: helper.modulePath('app', 'knowledge-point/form', '_=' + Math.random())
                    }
                },
            }).state('app.knowledge-point.edit', {
                url: '/edit/{id}',
                title: 'EDIT_CATEGORY_TEXT',
                parent: 'app.knowledge-point.list',
                views: {
                    '@app.knowledge-point': {
                        templateUrl: helper.modulePath('app', 'knowledge-point/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();