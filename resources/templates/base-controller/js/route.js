/**
 * Created by anmeo on 10/11/16.
 */

(function () {
    'use strict';

    Routes.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
            // Set the following to true to enable the HTML5 Mode
            // You may have to set <base> tag in index and a routing configuration in your server
            $locationProvider.html5Mode(false);

            // defaults to dashboard
            $urlRouterProvider.otherwise('/app/welcome');

            //
            // Application Routes
            // -----------------------------------
            $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: helper.basepath('app'),
                    controller: 'AppController',
                    resolve: helper.resolveFor(
                        'fastclick',
                        'modernizr',
                        'icons',
                        'screenfull',
                        'animo',
                        'sparklines',
                        'slimscroll',
                        'classyloader',
                        'toaster',
                        'whirl',
                        'ngDialog'
                    )
                })
                .state('app.welcome', {
                    url: '/welcome',
                    title: 'Welcome',
                    templateUrl: helper.basepath('welcome')
                })
        }]);
})();