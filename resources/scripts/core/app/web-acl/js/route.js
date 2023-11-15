(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.web-acl', {
                url: '/web-acl',
                title: 'WEB_ACLS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'web-acl/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.web-acl.list', {
                url: '',
                title: 'WEB_ACLS_TEXT',
                templateUrl: helper.modulePath('app', 'web-acl/items', '_=' + Math.random())
            }).state('app.web-acl.edit', {
                url: '/edit/{id}',
                title: 'EDIT_WEB_ACL_TEXT',
                parent: 'app.web-acl.list',
                views: {
                    '@app.web-acl': {
                        controller: 'WebAclEditController',   
                        templateUrl: helper.modulePath('app', 'web-acl/edit', '_=' + Math.random())
                    }
                },
                resolve: {
                    web_acl: ['AppWebAclService', '$stateParams', function (AppWebAclService, $stateParams) {
                        return AppWebAclService.showAcl($stateParams.id).then(function (response) {
                            if (response.success == true) {
                                return response.data;
                            } else {
                                throw new Error('DATA_NOT_FOUND');
                            }
                        }, function (err) {
                            throw new Error('DATA_NOT_FOUND');
                        });
                    }]
                },
            });
        }]);
})();