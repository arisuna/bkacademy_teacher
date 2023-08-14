(function () {
    'use strict';

    Routes.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
            $stateProvider.state('app.email-template', {
                url: '/email-template',
                title: 'LIST_OF_EMAIL_TEMPLATE_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'file-saver', 'tinyMce'),
                parent: 'app.admin-page.dashboard',
                abstract: true,
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'email-template/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.email-template.list', {
                url: '',
                title: 'LIST_OF_EMAIL_TEMPLATE_TEXT',
                templateUrl: helper.modulePath('app', 'email-template/list', '_=' + Math.random()),
            })
        }]);
})();