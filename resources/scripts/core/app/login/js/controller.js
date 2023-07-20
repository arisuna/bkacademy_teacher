(function () {
    'use strict';

    App.controller('LoginIndexController', ['$timeout', '$scope', '$location', '$http', '$state', '$window', '$translate', '$rootScope',
        '$translatePartialLoader', 'WaitingService', 'GmsDataService', 'GmsAuthService', 'Utils',
        function ($timeout, $scope, $location, $http, $state, $window, $translate, $rootScope,
                  $translatePartialLoader, WaitingService, GmsDataService, GmsAuthService, Utils) {

            $translatePartialLoader.addPart('base');
            $translate.refresh();

            $scope.gotoVerificationFn = function () {
                $state.go('login.verification');
            };

            $scope.gotoLoginFn = function () {
                $state.go('login.auth');
            };

            $scope.gotoForgetPasswordFn = function () {
                $state.go('login.forget-password');
            };

            //detected IE browser
            if (Utils.checkBrowser()) {
                $state.go('login.browser-detected');
            }


            $scope.loginWithAccount = function (account) {

                WaitingService.begin();
                GmsAuthService.resetConnection(); //should reset connection

                GmsDataService.loginFn({
                    'credential': account.email,
                    'password': account.password
                }).then(function (res) {
                    //@TODO need redirection here in LOCAL
                    if (angular.isDefined(res.success) && res.success) {
                        localStorage.setItem('token_key', res.token);
                        localStorage.setItem('refresh_token', res.refreshToken);
                        $rootScope._token = res.token;
                        $timeout(function () {
                            GmsAuthService.checkTotal().then(function () {
                                WaitingService.end();
                                if (GmsAuthService.getSubscription().status == -1) {
                                    $state.go('app.error-payment-required');
                                } else if (GmsAuthService.getSubscription().status == 0) {
                                    $state.go('app.error-subscription-paused');
                                } else {
                                    if (!angular.isDefined(GmsAuthService.getRedirectUrl()) || GmsAuthService.getRedirectUrl() == '' || GmsAuthService.getRedirectUrl() == null) {
                                        $state.go('app.dashboard');
                                    } else {
                                        $window.location.href = GmsAuthService.getRedirectUrl();
                                        GmsAuthService.setRedirectUrlNull();
                                    }
                                }
                            }, function () {
                                WaitingService.end();
                                WaitingService.expire();
                            })
                        }, 2000);
                    } else if (res.message == "UserNotFoundException") {
                        WaitingService.end();
                        $scope.account._token = res.token;
                        $scope.step = 3;
                    } else if (res.message == "UserNotConfirmedException") {
                        WaitingService.end();
                        $scope.account._token = res.token;
                        $scope.step = 4;
                    } else if (res.message == "NewPasswordRequiredException") {
                        localStorage.setItem('token_key', res.token);
                        localStorage.setItem('refresh_token', res.refreshToken);
                        WaitingService.end();
                        $scope.account._token = res.token;
                        $scope.account.session = res.session;
                        $scope.account.challengeName = res.challengeName;
                        $scope.step = 3;
                    } else if (res.message == "NotAuthorizedException") {
                        WaitingService.error("{{'WRONG_PASSWORD_TEXT' | translate}}");
                    } else {
                        WaitingService.end();
                        WaitingService.error(res.message);
                    }
                }, function (err) {
                    WaitingService.end();
                    WaitingService.expire();
                });
            };

        }]);

})();
