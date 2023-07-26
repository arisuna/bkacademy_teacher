/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appSettingMenu', appSettingMenu);

    appSettingMenu.$inject = ['urlBase', '$rootScope', '$state', 'AppAclService'];

    function appSettingMenu(urlBase, $rootScope, $state, AppAclService) {
        var directive = {
            restrict: 'E',
            replace: false,

            templateUrl: urlBase.tplBase('base-modules/app-directives', 'setting-menu'),
            link: function (scope, element, attrs) {


            },
            controller: ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state){
                //console.log('$rootScope.menuSettings', $rootScope.menuSettings)
            }]
        };
        return directive;
    }
})();




