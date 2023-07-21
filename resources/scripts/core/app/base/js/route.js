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

            $locationProvider.hashPrefix('');


            $urlRouterProvider.otherwise('/app/dashboard');


            var when;
            if ($stateProvider.when) {
                when = $stateProvider.when;
                $stateProvider.when = decorate;
            } else {
                when = $stateProvider.state;
                $stateProvider.state = decorate;
            }

            function decorate(path, route) {
                var rootResolve = route.rootResolve;
                if (!rootResolve) {
                    route.resolve = angular.extend({
                        aclCheck: ['AppAclService', 'checkAuthentication', function (AppAclService, checkAuthentication) {
                            return AppAclService.checkRoutePermission(this.self.acl);
                        }]
                    }, route.resolve || {});
                    return when.call($stateProvider, path, route);
                } else {
                    return when.call($stateProvider, path, route);
                }
            }

            //
            // Application Routes
            // -----------------------------------
            $stateProvider
                .state('app', {
                    url: '/app',
                    title: 'GMS',
                    acl: "",
                    abstract: true,
                    templateUrl: helper.basepath('layouts/layout-2-col'),
                    controller: 'AppController',
                    rootResolve: true,
                    resolve: angular.extend(
                        helper.resolveFor(
                            'fastclick',
                            'modernizr',
                            'icons',
                            'screenfull',
                            'animo',
                            'sparklines',
                            'slimscroll',
                            'classyloader',
                            'whirl',
                            'parsley',
                            'datatables',
                            'ui.select',
                            'xeditable',
                            'localytics.directives',
                            'angularFileUpload',
                            'filestyle',
                            'ngTable',
                            'ngSweetAlert2',
                            'pusherNotification',
                            'dateRangePicker',
                            'tinyMce',
                            'crossStorageClient',
                            'angularPdfViewer',
                            'pdf-viewer',
                            'inputmask'
                        ), {
                            initCheck: function () {
                                console.log('initCheck');
                            },

                            checkAuthentication: ['$q', 'GmsAuthResolver', function ($q, GmsAuthResolver) {
                                console.log('checkAuthentication');
                                return GmsAuthResolver.resolve();
                            }],


                        }
                    )
                })
                .state('app.index', {
                    url: '',
                    title: 'GMS_TEXT',
                    templateUrl: helper.modulePath('gms', 'base/welcome'),
                    redirectTo: 'app.dashboard'
                })
                .state('app.404', {
                    url: '/404',
                    title: '404',
                    templateUrl: helper.modulePath('gms', 'base/404'),
                    params: {
                        noPadding: true,
                        hasLeftBar: false,
                        showGlobalMenu: false,
                    }
                })
                .state('app.data-not-found', {
                    url: '/data-not-found',
                    title: '404',
                    templateUrl: helper.modulePath('gms', 'base/data-not-found'),
                    params: {
                        noPadding: true,
                        hasLeftBar: false,
                        showGlobalMenu: false,
                    }
                })
                .state('app.error-permission-not-found', {
                    url: '/error-permission-not-found',
                    title: '404',
                    templateUrl: helper.modulePath('gms', 'base/error-permission'),
                    params: {
                        noPadding: true,
                        hasLeftBar: false,
                        showGlobalMenu: false,
                    }
                })
                .state('app.developer', {
                    url: '/developer',
                    title: 'Developer',
                    templateUrl: helper.modulePath('gms', 'base/developer'),
                    data: {
                        controller: 'dashboard',
                        action: 'index'
                    },
                    params: {
                        overflowDisable: true,
                        showSideNav2: true,
                        templateSideNav2: helper.modulePath('gms', 'admin-page/left')
                    }
                })
                .state('app.error-payment-required', {
                    url: '/error-payment-required',
                    title: 'YOUR_TRIAL_DSP_ENDED_TEXT',
                    templateUrl: helper.modulePath('gms', 'base/payment-required'),
                    controller: 'AppErrorController',
                    params: {
                        noPadding: true,
                        hasLeftBar: false,
                        showGlobalMenu: false,
                    }
                })
                .state('app.error-subscription-paused', {
                    url: '/error-subscription-paused',
                    title: 'YOUR_SUBSCRIPTION_PAUSED_TEXT',
                    templateUrl: helper.modulePath('gms', 'base/subscription-paused'),
                    controller: 'AppErrorController',
                    params: {
                        noPadding: true,
                        hasLeftBar: false,
                        showGlobalMenu: false,
                    }
                });

            $urlRouterProvider.otherwise('/app/dashboard');

        }]);
})();
