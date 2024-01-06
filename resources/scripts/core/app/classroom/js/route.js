(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('app.classroom', {
            url: '/classroom',
            title: 'CLASSROOMS_TEXT',
            resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
            abstract: true,
            templateUrl: helper.modulePath('app', 'classroom/index'),
            acl: 'crm_user/index',
        }).state('app.classroom.list', {
            url: '',
            title: 'CLASSROOMS_TEXT',
            templateUrl: helper.modulePath('app', 'classroom/items', '_=' + Math.random())
        }).state('app.classroom.edit', {
            url: '/{uuid}',
            title: 'EDIT_CLASSROOM_TEXT',
            parent: 'app.classroom.list',
            views: {
                '@app.classroom': {
                    templateUrl: helper.modulePath('app', 'classroom/view', '_=' + Math.random())
                }
            }
        });
    }]);
})();