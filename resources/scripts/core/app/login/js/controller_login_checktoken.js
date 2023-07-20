(function () {
    'use strict';

    App.controller('CheckTokenController', ['$scope', '$rootScope', '$state', '$location', '$window', '$translate', 'WaitingService', 'GmsDataService', 'GmsAuthService', 'GmsSystem', 'Utils', '$stateParams', '$timeout',
        function ($scope, $rootScope, $state, $location, $window, $translate, WaitingService, GmsDataService, GmsAuthService, GmsSystem, Utils, $stateParams, $timeout) {

            $scope.checkSamlAuthentication = function () {

                GmsDataService.checkSamlAuthentication({uuid: $stateParams.uuid}).then(function (res) {
                    if (res.success) {

                        localStorage.setItem('token_key', res.token);
                        localStorage.setItem('refresh_token', res.refreshToken);

                        $rootScope._token = res.token;

                        GmsAuthService.checkLoginProcess().then(function () {

                            if (GmsAuthService.isConnected() == true) {
                                GmsSystem.getSystemData().then(function (res) {
                                    console.log('system:system data inited');
                                });

                                GmsAuthService.getAuthData().then(function () {
                                    console.log('system:auth data inited');

                                    var currentUser = GmsAuthService.getUser();

                                    if (currentUser.id > 0) {
                                        $rootScope.currentUser = currentUser;
                                    } else {
                                        $rootScope.currentUser = null;
                                    }

                                    $timeout(function () {
                                        if (GmsAuthService.getRedirectUrl() === 'undefined' || GmsAuthService.getRedirectUrl() === undefined || GmsAuthService.getRedirectUrl() === '' || GmsAuthService.getRedirectUrl() === null) {
                                            WaitingService.end();
                                            $state.go('app.dashboard');
                                        } else {
                                            console.log('CHECK_SAML_REDIRECT_TO_', GmsAuthService.getRedirectUrl());
                                            WaitingService.end();
                                            $window.location.href = GmsAuthService.getRedirectUrl();
                                            GmsAuthService.setRedirectUrlNull();
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
