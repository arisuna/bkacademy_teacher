/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('tooltip', tooltip);

    function tooltip() {


        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                type: '@?',
                text: '@',
            },
            template: `<i class="tool-tip fa"
                        ng-class="{'fa-exclamation-triangle':type == 'alert','fa-info-circle':type == '' || type == null || type == undefined, 'fa-info-circle': type == 'info'}"
                        style="font-size:16px;"
                        aria-hidden="true"
                        tooltip-placement="bottom"
                        uib-tooltip="{{ text | translate }}"></i>`
        };
        return directive;

        function link(scope, element) {
            if (angular.isUndefined(scope.alert)) scope.alert = false;
        }
    }
})();
