(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('notificationFlat', notificationFlat);

    function notificationFlat() {
        var directive = {
            link: function (scope, element, attrs) {
                if (scope.type == '' || scope.type == undefined || scope.type == null) {
                    if (angular.isUndefined(scope.icon) || scope.icon == '' || scope.icon == null) {
                        scope.icon = "fa fa-info-circle";
                    }
                } else {
                    if (angular.isUndefined(scope.icon) || scope.icon == '' || scope.icon == null) {
                        if (scope.type == 'warning') {
                            scope.icon = "fa fa-exclamation-triangle";
                        }

                        if (scope.type == 'danger') {
                            scope.icon = "fa fa-bolt";
                        }

                        if (scope.type == 'info') {
                            scope.icon = "fa fa-info-circle";
                        }

                        if (scope.type == 'success') {
                            scope.icon = "fa fa-check-circle";
                        }

                        if (scope.type == 'primary') {
                            scope.icon = "fa fa-info-circle";
                        }
                    }
                }

                if(angular.isUndefined(scope.textClass)){
                    scope.textClass = '';
                }
            },
            transclude: true,
            scope: {
                icon: '@?',
                text: '@?',
                type: '@',
                textClass: '@?',
            },
            template: `
            <div class="notification-flat"
                ng-class="{'notification-flat-success':type == 'success', 'notification-flat-primary':type == 'primary','notification-flat-warning':type == 'warning', 'notification-flat-info':type == 'info', 'notification-flat-danger':type == 'danger'}">
                <div class="notification-flat-title pd-l-50 pd-r-50">
                    <i class="{{ icon }}" ng-style="{'font-size': '30px'}"></i>
                </div>
                <div class="notification-flat-text {{textClass}}">
                    <ng-transclude>{{ text }}</ng-transclude>
                </div>
            </div>`,
            restrict: 'E'
        };
        return directive;
    }
})();
