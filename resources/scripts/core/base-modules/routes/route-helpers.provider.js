/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
    ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];

    function RouteHelpersProvider(APP_REQUIRES) {

        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,

            //Edit by An Duong
            modulePath: modulePath,

            // controller access level
            $get: function () {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor,
                    modulePath: modulePath
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return '/app/assets/' + uri + '.html';
        }

        //Module Views Path (by An Duong)
        function modulePath(zone, uri, params) {
            return '/' + zone + '/views/' + uri + '.html' + (params ? '?' + params : '?_=' + Math.random());
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function () {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load(whatToLoad);
                            });
                    }

                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        } // resolveFor

    }


    angular
        .module('app.routes')
        .provider('globalResolve', function () {
            return {
                addGlobalDependenciesTo: function (routeProvider, dependencies) {
                    var when;
                    if (routeProvider.when) {
                        when = routeProvider.when;
                        routeProvider.when = decorate;
                    } else {
                        when = routeProvider.state;
                        routeProvider.state = decorate;
                    }

                    function decorate(path, route) {
                        var globalResolve = route.globalResolve || typeof route.globalResolve === 'undefined';
                        if (globalResolve) {
                            route.resolve = angular.extend(dependencies, route.resolve || {});
                        }
                        return when.call(routeProvider, path, route);
                    }
                },
                $get: {}
            };
        });


})();

