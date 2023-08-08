(function () {
    'use strict';

    App.controller('LoginFormController', ['$timeout', '$scope', '$location', '$http', '$state', '$window', '$translate', '$rootScope', '$stateParams',
        '$translatePartialLoader', 'WaitingService', 'AppDataService', 'AppAuthService', 'account', 'Utils',
        function ($timeout, $scope, $location, $http, $state, $window, $translate, $rootScope, $stateParams,
                  $translatePartialLoader, WaitingService, AppDataService, AppAuthService, account, Utils) {

            Utils.alertScam();
            //detected IE browser
            if (Utils.checkBrowser()) {
                $state.go('login.browser-detected');
            }

            $scope.showPassword = false;
            $scope.companyLogo = null;

            $scope.account = account;
            if ($scope.account != null && angular.isDefined($scope.account.isExist) && $scope.account.isExist == true) {
                $scope.step = 2
            } else {
                $scope.step = 1
            }

            $scope.theme = {
                main_color: '#0A142B',
                logo_login_url: '/app/assets/img/logo-login.png',
                secondary_color: '#0098FF'
            };

            $scope.sub_domain = $location.$$host.split(".relotalent.com")[0];

            $translatePartialLoader.addPart('base');
            $translate.refresh();


            if (angular.isDefined($stateParams.hash)) {
                console.log($stateParams.hash);
                WaitingService.begin();
                AppDataService.autoLoginFn({
                    'hash': $stateParams.hash
                }).then(function (res) {
                    console.log(res);
                    //@TODO need redirection here in LOCAL
                    if (angular.isDefined(res.success) && res.success) {
                        localStorage.setItem('token_key', res.accessToken);
                        localStorage.setItem('refresh_token', res.refreshToken);
                        $rootScope._token = res.token;
                        AppAuthService.setRedirectUrlNull();
                        $timeout(function () {
                            AppAuthService.checkTotal().then(function () {
                                WaitingService.end();
                                console.log('redirect to home by change state');
                                $state.go('app.dashboard');
                            }, function (err) {
                                console.log(err);
                                WaitingService.end();
                                WaitingService.expire();
                            })
                        }, 2000);
                    } else {
                        WaitingService.end();
                        WaitingService.error(res.message);
                    }
                }, function (err) {
                    WaitingService.end();
                    WaitingService.expire();
                });
            }
            $scope.loginFn = function ($event) {

                WaitingService.begin();

                AppAuthService.resetConnection(); //should reset connection

                $event.preventDefault();

                AppDataService.loginFn({
                    'credential': $scope.account.email,
                    'password': $scope.account.password,
                    'session': $scope.account.session
                }).then(function (res) {
                    //@TODO need redirection here in LOCAL
                    if (angular.isDefined(res.success) && res.success) {
                        localStorage.setItem('token_key', res.token);
                        localStorage.setItem('refresh_token', res.refreshToken);

                        // localStorage.removeItem('token_key');
                        // localStorage.removeItem('refresh_token');
                        $rootScope._token = res.token;

                        //redirect to SSO LINK
                        $state.go('app.dashboard');

                        $timeout(function () {
                            AppAuthService.checkTotal().then(function () {
                                WaitingService.end();
                                if (AppAuthService.getSubscription().status == -1) {
                                    $state.go('app.error-payment-required');
                                } else if (AppAuthService.getSubscription().status == 0) {
                                    $state.go('app.error-subscription-paused');
                                } else {
                                    if (!angular.isDefined(AppAuthService.getRedirectUrl()) || AppAuthService.getRedirectUrl() == '' || AppAuthService.getRedirectUrl() == null) {
                                        console.log('redirect to home by change state');
                                        $state.go('app.dashboard');
                                    } else {
                                        console.log(AppAuthService.getRedirectUrl());
                                        console.log('redirect to redirect url by change state');
                                        $window.location.href = AppAuthService.getRedirectUrl();
                                        AppAuthService.setRedirectUrlNull();
                                    }
                                }
                            }, function () {
                                WaitingService.end();
                                WaitingService.error('INVALID_LOGIN_CREDENTIALS_TEXT');
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
                        WaitingService.end();
                        WaitingService.error("INVALID_LOGIN_CREDENTIALS_TEXT'");
                        $scope.step = 1;
                    } else {
                        WaitingService.end();
                        WaitingService.error(res.message);
                        $scope.step = 1;
                    }
                }, function (err) {
                    WaitingService.end();
                    WaitingService.expire();
                    $scope.step = 1;
                });
            };

            $scope.verifyEmailFn = function () {
                $scope.isVerify = true;

                localStorage.removeItem('token_key');
                localStorage.removeItem('refresh_token');

                AppDataService.verfifyAccountEmail($scope.account.email).then(function (result) {
                    $timeout(function () {
                        $scope.isVerify = false;
                    }, 1000);

                    if (angular.isDefined(result.success) && result.success == true) {
                        $scope.account = angular.extend($scope.account, result.data);
                        $scope.account.session = result.session;
                        console.log($scope.account);
                        $scope.step = 2;
                        // if (angular.isDefined(result.data.redirect) && result.data.redirect == true && angular.isDefined(result.data.appUrl)) {
                        //     $window.location.href = result.data.appUrl + '#/login?email=' + $scope.account.email;
                        // }
                    } else {
                        WaitingService.end();
                        WaitingService.error(result.message);
                        $scope.step = 1;
                    }
                })
            }

            $scope.verifyCodeFn = function () {
                console.log("verify");
                WaitingService.begin();
                AppDataService.verifyCodeFn($scope.account).then(function (res) {
                    WaitingService.end();

                    if (res.success) {
                        WaitingService.popSuccess("{{'EMAIL_VERIFIED_TEXT' | translate}}");
                        $scope.logoutFn();
                    } else {
                        WaitingService.error(res.message);
                    }
                }, function (err) {
                    WaitingService.error(err.message);
                });
            };


            $scope.resendCodeFn = function () {
                WaitingService.begin();
                AppDataService.resendCodeFn($scope.account).then(function (result) {
                    WaitingService.end();

                    if (result.success == true) {
                        WaitingService.popSuccess("{{'USER_ACTIVATION_SEND_MAIL_CONFIRM_SUCCESS_TEXT' | translate}}");
                    } else {
                        WaitingService.info(result.message);
                    }
                })
            }

            $scope.changeSecurityFn = function () {
                WaitingService.begin();
                AppDataService.changeSecurityFn($scope.account).then(function (res) {
                    WaitingService.end();
                    if (res.success) {
                        if (angular.isDefined(res.verificationCodeRequired) && res.verificationCodeRequired == true) {
                            WaitingService.popSuccess("USER_ACTIVATION_SEND_MAIL_CONFIRM_SUCCESS_TEXT");
                            $scope.step = 4;
                        } else if (angular.isDefined(res.forceChangePassword) && res.forceChangePassword == true) {
                            WaitingService.popSuccess("CHANGE_PASSWORD_SUCCESS_TEXT");
                            $scope.account = {
                                email: $scope.account.email,
                                password: $scope.account.new_password
                            };
                            $scope.loginWithAccount($scope.account);
                        } else {
                            $scope.step = 2;
                        }
                    } else {
                        WaitingService.error(res.message);
                    }
                }, function (err) {
                    WaitingService.error(err.message);
                });
            };

            $scope.changeAccountFn = function () {
                $scope.account = {email: ''};
                $scope.step = 1
            }

            $scope.logoutFn = function () {
                $window.localStorage.clear();
                window.location.reload();
            }

            $scope.gotoStep = function (step) {
                if (step === 1) {
                    let email = $scope.account.email;
                    $scope.account = {email: email};

                }
                $scope.step = step;

            };

        }]);

})();
