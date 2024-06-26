(function () {
    'use strict';
    /**
     * Routes
     */
    Routes.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    rootResolve: true,
                    isPublic: true,
                    templateUrl: helper.modulePath('app', 'login/index'),
                    resolve: angular.extend(
                        helper.resolveFor('modernizr', 'icons', 'parsley', 'ngSweetAlert2', 'crossStorageClient'), {
                            checkAuthentication: ['AppAuthResolver', '$state', function (AppAuthResolver, $state) {
                                return false;
                            }],
                        }
                    ),
                    controller: 'LoginIndexController',
                    abstract: true,
                })
                .state('login.auth', {
                    url: '',
                    templateUrl: helper.modulePath('app', 'login/login'),
                    controller: 'LoginFormController',
                    resolve: {
                        account: ['$location', 'AppDataService', function ($location, AppDataService) {
                            var email = $location.search().email;
                            if (email !== undefined) {
                                return AppDataService.verfifyAccountEmail(email).then(function (res) {
                                    if (res.success) {
                                        return res.data;
                                    }
                                })
                            } else {
                                return {email: email}
                            }
                        }],
                    }
                })

                .state('login.forget-password', {
                    url: '/forget-password',
                    resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'ngSweetAlert2'),
                    templateUrl: helper.modulePath('app', 'login/forget', '_=' + Math.random()),
                })

                .state('login.verification', {
                    url: '/verification',
                    resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'ngSweetAlert2'),
                    templateUrl: helper.modulePath('app', 'login/verification', '_=' + Math.random()),
                })
                .state('login.checksaml', {
                    url: '/checksaml/{uuid}',
                    title: 'CheckToken',
                    templateUrl: helper.modulePath('app', 'login/checksaml',  '_=' + Math.random()),
                    resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'ngSweetAlert2'),
                    controller: 'CheckTokenController',
                })
                .state('login.saml-invalid', {
                    url: '/saml-invalid',
                    controller: 'SamlInvalidController',
                    templateUrl: helper.modulePath('app', 'login/saml_invalid', '_=' + Math.random()),
                })
                .state('login.checklogintoken', {
                    url: '/checktoken/:hash/',
                    title: 'CheckToken',
                    resolve: helper.resolveFor('modernizr', 'icons', 'parsley', 'ngSweetAlert2'),
                    controller: 'CheckTokenController',
                })
                .state('logout', {
                    url: '/logout',
                    title: 'logout',
                    controller: 'LogoutController',
                    rootResolve: true,
                    isPublic: true,
                    resolve: {
                        checkAuthentication: function () {
                            return false
                        }
                    }
                })
                .state('login.browser-detected', {
                    url: '/browser-detected',
                    templateUrl: helper.modulePath('app', 'browser/index'),
                })

                .state('login.auto', {
                    url: '/:hash',
                    templateUrl: helper.modulePath('app', 'login/login'),
                    controller: 'LoginFormController',
                    resolve: {
                        account: ['$location', 'AppDataService', function ($location, AppDataService) {
                            var email = $location.search().email;
                            if (email !== undefined) {
                                return AppDataService.verfifyAccountEmail(email).then(function (res) {
                                    if (res.success) {
                                        return res.data;
                                    }
                                })
                            } else {
                                return {email: email}
                            }
                        }],
                    }
                });

        }]);
})();
