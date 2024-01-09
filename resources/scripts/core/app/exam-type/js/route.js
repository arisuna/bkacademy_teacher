(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.exam-type', {
                url: '/exam-type',
                title: 'EXAM_TYPE_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'exam-type/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.exam-type.list', {
                url: '',
                title: 'EXAM_TYPE_TEXT',
                templateUrl: helper.modulePath('app', 'exam-type/items', '_=' + Math.random())
            }).state('app.exam-type.create', {
                url: '/create',
                title: 'CREATE_EXAM_TYPE_TEXT',
                parent: 'app.exam-type.list',
                views: {
                    '@app.exam-type': {
                        templateUrl: helper.modulePath('app', 'exam-type/form', '_=' + Math.random())
                    }
                },
            }).state('app.exam-type.edit', {
                url: '/edit/{id}',
                title: 'EDIT_EXAM_TYPE_TEXT',
                parent: 'app.exam-type.list',
                views: {
                    '@app.exam-type': {
                        templateUrl: helper.modulePath('app', 'exam-type/form', '_=' + Math.random())
                    }
                },
            }).state('app.exam-type.clone', {
                url: '/clone/{id}',
                title: 'CLONE_EXAM_TYPE_TEXT',
                parent: 'app.exam-type.list',
                views: {
                    '@app.exam-type': {
                        templateUrl: helper.modulePath('app', 'exam-type/form', '_=' + Math.random()),
                    }
                },
                params: {
                    clone: true
                }
            });
        }]);
})();