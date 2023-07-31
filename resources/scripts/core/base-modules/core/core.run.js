(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors', '$http', '$translate'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, $http, $translate) {

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        $rootScope.setting = [];
        $rootScope.isAccess = true;
        $rootScope.debugMode = true;

        /**
         * Load ACL list Transfert to app/APPCONTROLLER
         * @type {{}}
         */



        // Hook into ocLazyLoad to setup AngularGrid before inject into the app
        // See "Creating the AngularJS Module" at
        // https://www.ag-grid.com/best-angularjs-data-grid/index.php
        var offevent = $rootScope.$on('ocLazyLoad.fileLoaded', function (e, file) {
            if (file.indexOf('ag-grid.js') > -1) {
                agGrid.initialiseAgGridWithAngular1(angular);
                offevent();
            }
        });

        // Uncomment this to disable template cache
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined') {
                $templateCache.remove(toState.templateUrl);
            }
        });

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // -----------------------------------

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function (event, unfoundState /*, fromState, fromParams*/) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                console.info('event',event);
                console.info('toParams' , toParams);
                console.log('fromParams', fromParams);
                console.log(error);
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if (!angular.isUndefined(toState.data)) {
                    var data = toState.data,
                        url_redirect = 'app.dashboard';
                    if (data.controller == 'auth' && data.action == 'login') {
                        // Do nothing
                    } else {
                        $rootScope.isAccess = true;
                        //TODO actually use GMSALCSERVICE
                        //TODO can not check AUTH and ACL after stateChangeSuccess
                        //$rootScope.validateAction(data['controller'], data['action']);
                        if (!$rootScope.isAccess) {
                            if (fromState.name != '')
                                url_redirect = fromState.name;
                            $state.go(url_redirect);
                            return;
                        }
                    }
                }
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                // $rootScope.currTitle = $state.current.title;
            });

        // Load a title dynamically
        // $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };




        $rootScope.validateAction = function (controller, action) {
            return false;
        }
    }

})();
