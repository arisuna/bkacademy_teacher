/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';
    Routes.config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('app.report', {
            url: '/report',
            abstract: true,
            title: 'REPORT_TEXT',
            templateUrl: helper.modulePath('app', 'report/index'),
            resolve: helper.resolveFor(
                'file-saver',
                'alasql',
                'xlsx',
                'angularGrid',
                'flot-chart',
                'flot-chart-plugins',
                'angular-chartist'
            ),
            acl: 'report/index',
            params: {
                noPadding: true
            }
        }).state('app.report.index', {
            url: '',
            title: 'REPORT_TEXT',
            views: {
                '@app.report': {
                    templateUrl: helper.modulePath('app', 'report/home'),
                },
            },
            acl: 'report/index',
        }).state('app.report.week', {
            url: '/week',
            title: 'REPORT_BY_SCORE_TEXT',
            parent: 'app.report.index',
            views: {
                '@app.report': {
                    templateUrl: helper.modulePath('app', 'report/week'),
                },
            },
            acl: 'report/index',
            params: {
                hasLeftBar: false
            },
        }).state('app.report.month', {
            url: '/month',
            title: 'REPORT_BY_MONTH_TEXT',
            parent: 'app.report.index',
            views: {
                '@app.report': {
                    templateUrl: helper.modulePath('app', 'report/month'),
                },
            },
            acl: 'report/index',
            params: {
                hasLeftBar: false
            }
        });
    }]);

})();
