(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.chapter', {
                url: '/chapter',
                title: 'CHAPTERS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'chapter/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.chapter.list', {
                url: '',
                title: 'CHAPTERS_TEXT',
                templateUrl: helper.modulePath('app', 'chapter/items', '_=' + Math.random())
            }).state('app.chapter.create', {
                url: '/create',
                title: 'CREATE_CHAPTER_TEXT',
                parent: 'app.chapter.list',
                views: {
                    '@app.chapter': {
                        templateUrl: helper.modulePath('app', 'chapter/form', '_=' + Math.random())
                    }
                },
            }).state('app.chapter.edit', {
                url: '/edit/{id}',
                title: 'EDIT_CHAPTER_TEXT',
                parent: 'app.chapter.list',
                views: {
                    '@app.chapter': {
                        templateUrl: helper.modulePath('app', 'chapter/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();