/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appPanelAdmin', appPanelAdmin);

    appPanelAdmin.$inject = ['urlBase'];

    function appPanelAdmin(urlBase) {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: {
                id:'@?',
                icon: '@?',
                title: '@adminTitle',
                text: '@?',
                links: '=?'
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives', 'admin-panel'),
            link: function (scope, element, attrs) {
                scope.panelCollapsed = true;
                //console.log(scope.links);
                if( angular.isUndefined( scope.text ) ) scope.text = '';
            },
            controller: function ($scope) {

            }
        };
        return directive;
    }
})();
