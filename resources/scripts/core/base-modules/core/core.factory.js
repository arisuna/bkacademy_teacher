/**=========================================================
 * Module: core.factory.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAllowed: 'auth-not-allowed',
            notAuthorized: 'auth-not-authorized',
            notPaid: 'auth-not-paid',
        });

    angular
        .module('app.core')
        .factory('tokenInjector', function () {

            var tokenInjector = {
                request: function ($config) {
                    $config.headers['X-Requested-With'] = 'XMLHttpRequest';
                    $config.headers['Token-Key'] = window.localStorage.getItem('token_key');
                    $config.headers['Refresh-Token'] = window.localStorage.getItem('refresh_token');
                    $config.headers['Language-Key'] = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');

                    if (window.localStorage.getItem('backend_token') !== '') {
                        $config.headers['backend-token'] = window.localStorage.getItem('backend_token');
                    }
                    return $config;
                }
            };

            return tokenInjector;

        })
        .factory('urlBase', function () {

            var urlBase = {

                prefixUrl: function () {
                    return 'gms';
                },

                tplBase: function (folder, template, params) {

                    var today = new Date();
                    var timeCheck = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear() + '_' + today.getHours();
                    if (folder !== '') {
                        return "/" + this.prefixUrl() + "/assets/views/" + folder + "/" + template + '.html' + (params ? '?' + params : '?version=' + timeCheck);
                    } else {
                        return "/" + this.prefixUrl() + "/assets/views/" + template + '.html' + (params ? '?' + params : '?version=' + timeCheck);
                    }
                },

                tplApp: function (app, module, template, params) {
                    var today = new Date();
                    var timeCheck = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear() + '_' + today.getHours();
                    return "/" + app + "/views/" + module + "/" + template + '.html' + (params ? '?' + params : '?version=' + timeCheck);
                },

                imageUrl: function (app, libraryName, folder, name) {
                    return "/" + app + "/" + libraryName + "/img/" + folder + "/" + name;
                }
            };

            return urlBase;
        })
        .factory('timezoneInjector', ['moment', function (moment) {
            var timezoneInjector = {
                request: function ($config) {
                    $config.headers['Timezone-Offset'] = moment().utcOffset();
                    $config.headers['Timezone'] = guess();
                    return $config;

                    function guess() {
                        try {
                            return moment.tz.zones();
                        } catch (err) {
                            return 'UTC'; // could also be something like moment.tz.names()[0];
                        }
                    }
                }
            };
            return timezoneInjector;
        }])
        .factory('authenInjector', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
            var authenInjector = {
                /*
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout,
                        402: AUTH_EVENTS.notPaid,
                        405: AUTH_EVENTS.notAllowed
                    }[response.status], response);
                    return $q.reject(response);
                }
                */
            };
            return authenInjector;
        }])
        .factory('responseInjector', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {

            var responseInjector = {
                responseError: function (response) {

                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout,
                        402: AUTH_EVENTS.notPaid,
                        405: AUTH_EVENTS.notAllowed
                    }[response.status], response);

                    console.log({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout,
                        402: AUTH_EVENTS.notPaid,
                        405: AUTH_EVENTS.notAllowed
                    }[response.status]);
                    if (response.status == 403) {
                        if (angular.isDefined(response.data) && angular.isDefined(response.data.message) && _.isString(response.data.message)) {
                            throw new AclError(response.data.message)
                        } else {
                            throw new AclError('ACL_FAILED')
                        }
                    }

                    if (response.status == 402) {
                        if (angular.isDefined(response.data) && angular.isDefined(response.data.message) && _.isString(response.data.message)) {
                            throw new AclError(response.data.message)
                        } else {
                            throw new AclError('ACL_FAILED')
                        }
                    }

                    return $q.reject(response);

                },
                response: function ($response) {
                    if ($response.headers('Refresh-Token') != undefined &&
                        $response.headers('Refresh-Token') !== '' &&
                        $response.headers('Refresh-Token') !== null &&
                        !_.isNull($response.headers('Refresh-Token'))) {
                        window.localStorage.setItem('refresh_token', $response.headers('Refresh-Token'));
                    }

                    if ($response.headers('refresh-token') != undefined &&
                        $response.headers('refresh-token') !== '' &&
                        $response.headers('refresh-token') !== null &&
                        !_.isNull($response.headers('refresh-token'))) {
                        window.localStorage.setItem('refresh_token', $response.headers('refresh-token'));
                    }

                    if ($response.headers('token-key') != undefined &&
                        $response.headers('token-key') !== '' &&
                        $response.headers('token-key') !== null &&
                        !_.isNull($response.headers('token-key'))) {
                        window.localStorage.setItem('token_key', $response.headers('token-key'));
                    }
                    return $response;
                }
            };

            return responseInjector;
        }])
        .factory('checkCacheInspector', function () {
            return {
                'request': function requestInterceptor(config) {
                    if (config.cache) {
                        //Determine if a custom cache object is being used
                        var cache = angular.isObject(config.cache) ? config.cache : null;
                        //config.wasCached = cache.get(config.url) ? true : false;
                    }
                    return config;
                },

                'response': function (response) {
                    if (response && response.config && response.config.wasCached) {
                        //nothing
                    }
                    return response;
                }
            };
        });

})();
