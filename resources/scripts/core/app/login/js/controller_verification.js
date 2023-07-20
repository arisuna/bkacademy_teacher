(function () {
    'use strict';

    App.controller('LoginVerificationController', ['$scope', '$http', '$state', '$location', '$window', '$translate', 'WaitingService', 'GmsDataService', 'DataService', 'Utils',
        function ($scope, $http, $state, $location, $window, $translate, WaitingService, GmsDataService, DataService, Utils) {
            $scope.account = {
                email: '',
                verification_code: '',
                new_password: '',
                new_password_confirm: ''
            };

            $scope.theme = {
                main_color: '#0A142B',
                logo_login_url: '/app/assets/img/logo-login.png',
                secondary_color: '#0098FF'
            };

            $scope.sub_domain = $location.$$host.split(".relotalent")[0];
            console.log($scope.sub_domain);
            WaitingService.begin();
            GmsDataService.getCompanyBuSubDomain($scope.sub_domain).then(function (res) {
                if(res.success){
                    $scope.company = res.data;
                    if(angular.isDefined($scope.company.theme) && angular.isDefined($scope.company.theme.id)) {
                        $scope.theme = $scope.company.theme;
                    }
                    console.log($scope.theme);
                }
                WaitingService.end();
            }, function (err) {
                WaitingService.error(err.message);
            });


            $scope.changePasswordWithConfirmCodeFn = function () {
                GmsDataService.changePasswordWithConfirmCodeFn({
                    'code': $scope.account.verification_code,
                    'password': $scope.account.new_password,
                    'password_confirm': $scope.account.new_password_confirm,
                    'email': $scope.account.email
                }).then(function (result) {
                    if (result.success) {
                        WaitingService.popSuccess("PASSWORD_UPDATE_SUCCESS_TEXT");
                        $scope.account.password = $scope.account.new_password;
                        $scope.loginWithAccount($scope.account);
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

            //detected IE browser
            if (Utils.checkBrowser()) {
                $state.go('login.browser-detected');
            }
            ;
        }]);

})();
