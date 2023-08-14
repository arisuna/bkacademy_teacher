(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.business-zone', {
                url: '/business-zone',
                title: 'BUSINESS_ZONES_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'business-zone/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.business-zone.list', {
                url: '',
                title: 'BUSINESS_ZONES_TEXT',
                templateUrl: helper.modulePath('app', 'business-zone/items', '_=' + Math.random())
            }).state('app.business-zone.create', {
                url: '/create',
                title: 'CREATE_BUSINESS_ZONE_TEXT',
                parent: 'app.business-zone.list',
                views: {
                    '@app.business-zone': {
                        templateUrl: helper.modulePath('app', 'business-zone/form', '_=' + Math.random())
                    }
                },
            }).state('app.business-zone.edit', {
                url: '/edit/{id}',
                title: 'EDIT_BUSINESS_ZONE_TEXT',
                parent: 'app.business-zone.list',
                views: {
                    '@app.business-zone': {
                        templateUrl: helper.modulePath('app', 'business-zone/form', '_=' + Math.random())
                    }
                },
            }).state('app.business-zone.clone', {
                url: '/clone/{id}',
                title: 'CLONE_BUSINESS_ZONE_TEXT',
                parent: 'app.business-zone.list',
                views: {
                    '@app.business-zone': {
                        templateUrl: helper.modulePath('app', 'business-zone/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();