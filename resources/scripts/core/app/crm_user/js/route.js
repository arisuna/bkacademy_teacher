(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.crm_user', {
                url: '/crm_user',
                title: 'CRM_USERS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                templateUrl: helper.modulePath('app', 'crm_user/index'),
                acl: 'user/manage_crm_user',
            }).state('app.crm_user.list', {
                url: '',
                title: 'CRM_USERS_TEXT',
                templateUrl: helper.modulePath('app', 'crm_user/items', '_=' + Math.random())
            }).state('app.crm_user.create', {
                url: '/create',
                title: 'CREATE_USER_TEXT',
                parent: 'app.crm_user.list',
                views: {
                    '@app.crm_user': {
                        templateUrl: helper.modulePath('app', 'crm_user/form', '_=' + Math.random())
                    }
                },
            }).state('app.crm_user.edit', {
                url: '/edit/{id}',
                title: 'EDIT_USER_TEXT',
                parent: 'app.crm_user.list',
                views: {
                    '@app.crm_user': {
                        templateUrl: helper.modulePath('app', 'crm_user/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();