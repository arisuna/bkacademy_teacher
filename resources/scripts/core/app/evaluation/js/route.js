(function () {

    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider.state('app.evaluation', {
                url: '/evaluation',
                title: 'EVALUATIONS_TEXT',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                abstract: true,
                templateUrl: helper.modulePath('app', 'evaluation/index'),
                acl: 'evaluation/index',
            }).state('app.evaluation.list', {
                url: '',
                title: 'EVALUATIONS_TEXT',
                templateUrl: helper.modulePath('app', 'evaluation/items', '_=' + Math.random())
            }).state('app.evaluation.create', {
                url: '/create',
                title: 'CREATE_EVALUATION_TEXT',
                parent: 'app.evaluation.list',
                views: {
                    '@app.evaluation': {
                        templateUrl: helper.modulePath('app', 'evaluation/form', '_=' + Math.random())
                    }
                },
            }).state('app.evaluation.edit', {
                url: '/edit/{id}',
                title: 'EDIT_EVALUATION_TEXT',
                parent: 'app.evaluation.list',
                views: {
                    '@app.evaluation': {
                        templateUrl: helper.modulePath('app', 'evaluation/form', '_=' + Math.random())
                    }
                },
            });
        }]);
})();