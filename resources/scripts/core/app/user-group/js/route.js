(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.user-group', {
                url: '/user-group',
                title: 'USER_GROUPS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'user-group/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.user-group.list', {
                url: '',
                title: 'USER_GROUPS_TEXT',
                templateUrl: helper.modulePath('app', 'user-group/items', '_=' + Math.random())
            }).state('app.user-group.edit', {
                url: '/edit/{id}',
                title: 'EDIT_USER_GROUP_TEXT',
                parent: 'app.user-group.list',
                views: {
                    '@app.user-group': {
                        controller: 'UserGroupEditController',   
                        templateUrl: helper.modulePath('app', 'user-group/edit', '_=' + Math.random())
                    }
                },
                resolve: {
    
                    user_group: ['AppDataService', '$stateParams', function (AppDataService, $stateParams) {
                        return AppDataService.getUserGroupDetail($stateParams.id).then(function (response) {
                            if (response.success == true) {
                                return response.data;
                            } else {
                                throw new Error('DATA_NOT_FOUND');
                            }
                        }, function (err) {
                            throw new Error('DATA_NOT_FOUND');
                        });
                    }],
                    group_acls: ['AppDataService', '$stateParams', function (AppDataService, $stateParams) {
                        return AppDataService.showGroupAcl($stateParams.id).then(function (response) {
                            if (response.success == true) {
                                return response.roles;
                            } else {
                                throw new Error('DATA_NOT_FOUND');
                            }
                        }, function (err) {
                            throw new Error('DATA_NOT_FOUND');
                        });
                    }],
                    controller_action_items: ['AppDataService', function (AppDataService) {
                        return AppDataService.getControllerActionItemList().then(function (response) {
                            if (response.success == true) {
                                return response.data;
                            } else {
                                throw new Error('DATA_NOT_FOUND');
                            }
                        }, function (err) {
                            throw new Error('DATA_NOT_FOUND');
                        })
                    }],
                    acls: ['AppDataService', function (AppDataService) {
                        return AppDataService.getAclList().then(function (response) {
                            if (response.success == true) {
                                return response.data;
                            } else {
                                throw new Error('DATA_NOT_FOUND');
                            }
                        }, function (err) {
                            throw new Error('DATA_NOT_FOUND');
                        })
                    }],
                    user_groups: ['AppDataService', function (AppDataService) {
                        return AppDataService.getCrmUserList().then(function (response) {
                            if (response.success == true) {
                                return response.data;
                            } else {
                                throw new Error('DATA_NOT_FOUND');
                            }
                        }, function (err) {
                            throw new Error('DATA_NOT_FOUND');
                        })
                    }]
                },
            });
        }]);
})();