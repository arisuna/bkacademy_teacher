(function () {
    'use strict';

    App.controller('LoginForgotPasswordController', ['$scope', '$http', '$state', '$location', '$window', '$translate', 'WaitingService', 'AppDataService', 'DataService','Utils',
        function ($scope, $http, $state, $location, $window, $translate, WaitingService, AppDataService, DataService, Utils) {
            $scope.account = {};
            $scope.step = 1;

            $scope.theme = {
                main_color: '#0A142B',
                logo_login_url: '/app/assets/img/logo-login.png',
                secondary_color: '#0098FF'
            };


            $scope.resetFn = function () {
                WaitingService.begin();
                DataService.resetPassword({
                    'email': $scope.account.email,
                }).then(function (result) {
                    WaitingService.end();
                    if (result.success) {
                        if (result.checkEmail == true) {
                            WaitingService.popSuccess("PLEASE_CHECK_YOUR_EMAIL_TEXT");
                            if(result.isTemporaryPasswordSent){
                                $scope.gotoLoginFn();
                            } else {
                                $scope.step = 2;
                            }
                        } else {
                            WaitingService.popSuccess("SEND_MAIL_CONFIRM_SUCCESS_TEXT");
                            if (angular.isDefined(result.isVerificationCodeSent) && result.isVerificationCodeSent == true) {
                                $scope.step = 2;
                            } else {
                                $scope.gotoLoginFn();
                            }
                        }
                    } else {
                        if (result.errorType == "NotAuthorizedException") {
                            WaitingService.info(result.message);
                        } else if (result.errorType == "NotAuthorizedException") {
                            WaitingService.error("PLEASE_CHECK_YOUR_EMAIL_TEXT");
                            $state.go('app.dashboard');
                        } else {
                            WaitingService.info(result.message);
                        }
                    }
                }, function (err) {
                    WaitingService.error(err.message);
                });
            }

            $scope.goToStep2Fn = function () {
                $scope.step = 2;
            };

            $scope.changePasswordWithConfirmCodeFn = function () {
                AppDataService.changePasswordWithConfirmCodeFn({
                    'code': $scope.account.verification_code,
                    'password': $scope.account.new_password,
                    'email': $scope.account.email
                }).then(function (result) {
                    if (result.success) {
                        WaitingService.popSuccess("PASSWORD_UPDATE_SUCCESS_TEXT");
                        $scope.gotoLoginFn();

                    } else {
                        if (result.message == "CodeMismatchException") {
                            WaitingService.error("VERIFICATION_CODE_MISMATCH_TEXT");
                        } else {
                            WaitingService.error(result.message);
                        }
                    }
                }, function (err) {
                    WaitingService.error(err.message);
                });
            }

            $scope.logoutFn = function () {
                $window.localStorage.clear();
                window.location.reload();
            }

            $scope.nextStep = function(index){
                $scope.step = index;
            };

            //detected IE browser
            if( Utils.checkBrowser() ){
                $state.go('login.browser-detected');
            };
        }]);

})();
