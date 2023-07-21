(function () {
    'use strict';

    angular
        .module('app.layout-directives')
        .directive('topAction', topAction);

    topAction.$inject = ['urlBase', '$rootScope'];

    function topAction(urlBase, $rootScope) {
        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: urlBase.tplBase('base-modules/layout-directives', 'top-action'),
            link: function (scope, element, attrs) {

            },
        };
        return directive;
    }

})();
