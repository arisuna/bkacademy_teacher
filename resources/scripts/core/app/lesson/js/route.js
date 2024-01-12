(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.lesson', {
                url: '/lesson',
                title: 'LESSONS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                templateUrl: helper.modulePath('app', 'lesson/index'),
                acl: 'lesson/index',
            }).state('app.lesson.list', {
                url: '',
                title: 'LESSONS_TEXT',
                templateUrl: helper.modulePath('app', 'lesson/items', '_=' + Math.random())
            }).state('app.lesson.create', {
                url: '/create',
                title: 'CREATE_LESSON_TEXT',
                parent: 'app.lesson.list',
                views: {
                    '@app.lesson': {
                        templateUrl: helper.modulePath('app', 'lesson/form', '_=' + Math.random())
                    }
                },
            }).state('app.lesson.edit', {
                url: '/edit/{id}',
                title: 'EDIT_LESSON_TEXT',
                parent: 'app.lesson.list',
                views: {
                    '@app.lesson': {
                        templateUrl: helper.modulePath('app', 'lesson/view', '_=' + Math.random())
                    }
                },
            });
        }]);
})();