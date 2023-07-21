(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('panelCollapseButton', panelCollapseButton);

    panelCollapseButton.$inject = ['$compile', 'urlBase'];
    function panelCollapseButton ($compile, urlBase) {
        var directive = {
            link: link,
            templateUrl: urlBase.tplBase('base-modules/utils', 'panel-collapse-button'),
            replace: true,
            restrict: 'E',
            scope: {
                collapseStatus: '=?ngModel'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.collapseStatus = !!scope.collapseStatus;
        }// link
    }

})();
