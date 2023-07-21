(function () {
    'use strict';

    App.controller('CheckTokenController', ['$scope', '$rootScope', '$state', '$location', '$window', '$translate', 'WaitingService', 'AppDataService', 'AppAuthService', 'AppSystem', 'Utils', '$stateParams', '$timeout',
        function ($scope, $rootScope, $state, $location, $window, $translate, WaitingService, AppDataService, AppAuthService, AppSystem, Utils, $stateParams, $timeout) {

            $scope.checkSamlAuthentication = function () {

                AppDataService.checkSamlAuthentication({uuid: $stateParams.uuid}).then(function (res) {
                    if (res.success) {

                        localStorage.setItem('token_key', res.token);
                        localStorage.setItem('refresh_token', res.refreshToken);

                        $rootScope._token = res.token;

                        AppAuthService.checkLoginProcess().then(function () {

                            if (AppAuthService.isConnected() == true) {
                                AppSystem.getSystemData().then(function (res) {
                                    console.log('system:system data inited');
                                });

                                AppAuthService.getAuthData().then(function () {
                                    console.log('system:auth data inited');

                                    var currentUser = AppAuthService.getUser();

                                    if (currentUser.id > 0) {
                                        $rootScope.currentUser = currentUser;
                                    } else {
                                        $rootScope.currentUser = null;
                                    }

                                    $timeout(function () {
                                        if (AppAuthService.getRedirectUrl() === 'undefined' || AppAuthService.getRedirectUrl() === undefined || AppAuthService.getRedirectUrl() === '' || AppAuthService.getRedirectUrl() === null) {
                                            WaitingService.end();
                                            $state.go('app.dashboard');
                                        } else {
                                            console.log('CHECK_SAML_REDIRECT_TO_', AppAuthService.getRedirectUrl());
                                            WaitingService.end();
                                            $window.location.href = AppAuthService.getRedirectUrl();
                                            AppAuthService.setRedirectUrlNull();
                                        }
                                    }, 200);


                                }, function () {
                                    console.log('system:auth data failed');
                                });
                            }
                        });


                    }else{
                        $timeout(function () {
                            $state.go('login.saml-invalid');
                            // $state.go('login.auth');
                        }, 1000);
                    }
                });
            };


            $scope.checkSamlAuthentication();

        }]);

})();
