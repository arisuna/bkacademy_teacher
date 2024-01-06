(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.student', {
                url: '/student',
                title: 'STUDENTS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                templateUrl: helper.modulePath('app', 'student/index'),
                acl: 'student/index',
            }).state('app.student.list', {
                url: '',
                title: 'STUDENTS_TEXT',
                templateUrl: helper.modulePath('app', 'student/items', '_=' + Math.random())
            }).state('app.student.create', {
                url: '/create',
                title: 'CREATE_STUDENT_TEXT',
                parent: 'app.student.list',
                views: {
                    '@app.student': {
                        templateUrl: helper.modulePath('app', 'student/form', '_=' + Math.random())
                    }
                },
            }).state('app.student.edit', {
                url: '/edit/{id}',
                title: 'EDIT_STUDENT_TEXT',
                parent: 'app.student.list',
                views: {
                    '@app.student': {
                        templateUrl: helper.modulePath('app', 'student/view', '_=' + Math.random())
                    }
                },
            });
        }]);
})();