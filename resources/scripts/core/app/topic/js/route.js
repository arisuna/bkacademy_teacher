(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.topic', {
                url: '/topic',
                title: 'TOPICS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                parent: 'app.admin-page.dashboard',
                views: {
                    '@app.admin-page': {
                        templateUrl: helper.modulePath('app', 'topic/index'),
                    }
                },
                acl: 'admin/index',
                params: {
                    showSideNav2: true,
                    templateSideNav2: helper.modulePath('app', 'admin-page/left')
                }
            }).state('app.topic.list', {
                url: '',
                title: 'TOPICS_TEXT',
                templateUrl: helper.modulePath('app', 'topic/items', '_=' + Math.random())
            }).state('app.topic.create', {
                url: '/create',
                title: 'CREATE_TOPIC_TEXT',
                parent: 'app.topic.list',
                views: {
                    '@app.topic': {
                        templateUrl: helper.modulePath('app', 'topic/form', '_=' + Math.random())
                    }
                },
            }).state('app.topic.edit', {
                url: '/edit/{id}',
                title: 'EDIT_TOPIC_TEXT',
                parent: 'app.topic.list',
                views: {
                    '@app.topic': {
                        templateUrl: helper.modulePath('app', 'topic/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();