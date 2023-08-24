(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('app.company', {
            url: '/company',
            title: 'COMPANIES_TEXT',
            resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
            abstract: true,
            templateUrl: helper.modulePath('app', 'company/index'),
            acl: 'crm_user/index',
        }).state('app.company.list', {
            url: '',
            title: 'COMPANIES_TEXT',
            templateUrl: helper.modulePath('app', 'company/items', '_=' + Math.random())
        }).state('app.company.edit', {
            url: '/{uuid}',
            title: 'EDIT_COMPANY_TEXT',
            parent: 'app.company.list',
            views: {
                '@app.company': {
                    templateUrl: helper.modulePath('app', 'company/view', '_=' + Math.random())
                }
            }
        });
    }]);
})();