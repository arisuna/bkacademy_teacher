(function () {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider', '$httpProvider','$qProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider, $httpProvider , $qProvider) {

        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;

        // Disables animation on items with class .ng-no-animation
        $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

        // Improve performance disabling debugging features
        // $compileProvider.debugInfoEnabled(false);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With']; //@TODO to check

        $httpProvider.interceptors.push('tokenInjector');
        $httpProvider.interceptors.push('timezoneInjector');
        $httpProvider.interceptors.push('authenInjector');
        $httpProvider.interceptors.push('responseInjector');
        $httpProvider.interceptors.push('checkCacheInspector');


        $provide.decorator('$$rAF', ["$delegate", function rAFDecorator($delegate) {
            $delegate.throttle = function(cb) {
                var queueArgs, alreadyQueued, queueCb, context;
                return function debounced() {
                    queueArgs = arguments;
                    context = this;
                    queueCb = cb;
                    if (!alreadyQueued) {
                        alreadyQueued = true;
                        $delegate(function() {
                            queueCb.apply(context, queueArgs);
                            alreadyQueued = false;
                        });
                    }
                };
            };
            return $delegate;
        }]);


        $qProvider.errorOnUnhandledRejections(false);
    }

})();
