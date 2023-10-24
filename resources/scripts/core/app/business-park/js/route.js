(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.business-park', {
                url: '/business-park',
                title: 'BUSINESS_PARKS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'business-park/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.business-park.list', {
                url: '',
                title: 'BUSINESS_PARKS_TEXT',
                templateUrl: helper.modulePath('app', 'business-park/items', '_=' + Math.random())
            }).state('app.business-park.create', {
                url: '/create',
                title: 'CREATE_BUSINESS_PARK_TEXT',
                parent: 'app.business-park.list',
                views: {
                    '@app.business-park': {
                        templateUrl: helper.modulePath('app', 'business-park/form', '_=' + Math.random())
                    }
                },
            }).state('app.business-park.edit', {
                url: '/edit/{id}',
                title: 'EDIT_BUSINESS_PARK_TEXT',
                parent: 'app.business-park.list',
                views: {
                    '@app.business-park': {
                        templateUrl: helper.modulePath('app', 'business-park/form', '_=' + Math.random())
                    }
                },
            }).state('app.business-park.clone', {
                url: '/clone/{id}',
                title: 'CLONE_BUSINESS_PARK_TEXT',
                parent: 'app.business-park.list',
                views: {
                    '@app.business-park': {
                        templateUrl: helper.modulePath('app', 'business-park/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();