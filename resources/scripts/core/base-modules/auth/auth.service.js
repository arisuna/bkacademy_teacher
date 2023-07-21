/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$q', '$localStorage','jwtHelper'];

    function AuthService($http, $q, $localStorage, jwtHelper) {

        var _authentication = {};

        var _login = function (loginData, isClient) {

            var deferred = $q.defer();

            var url = isClient ? '/api/client_auth/login' : '/api/staff_auth/login';

            $http.post(url, loginData)
                .success(function (response) {
                    // localStorageService.set(_authentication.isClient ? 'clientToken' : 'staffToken', response.token);
                    localStorage.setItem(_authentication.isClient ? 'clientToken' : 'staffToken', response.token);

                    _parseToken(response.token);
                    localStorage.setItem('fullname', _authentication.fullname);

                    deferred.resolve(_authentication);

                }).error(function (err, status) {
                _logout();
                deferred.reject(err);
            });

            return deferred.promise;
        };


        var _logout = function () {

            localStorage.removeItem(_authentication.isClient ? 'clientToken' : 'staffToken');

            localStorage.removeItem('fullname');

            _authentication.isAuth = false;

            return _authentication;
        };

        var _fillAuthData = function () {

            var token = localStorage.getItem(_authentication.isClient ? 'clientToken' : 'staffToken');

            if (token) {
                if(jwtHelper.isTokenExpired(token)){
                    return false;
                }
                _parseToken(token);
                return true;
            }else{
                return false;
            }
        }

        var _parseToken = function(token){
            var tokenData = jwtHelper.decodeToken(token);
            _authentication.isAuth = true;
            _authentication.isGms = tokenData.isGms;
            _authentication.isEmployee = tokenData.isEmployee;
            _authentication.isHr = tokenData.isHr;
            _authentication.username = tokenData.username;
            _authentication.fullname = tokenData.fullname;
            _authentication.roles = tokenData.roles;
        }
        this.login = _login;
        this.logout = _logout;
        this.fillAuthData = _fillAuthData;
        this.authentication = _authentication;
    }

})();
