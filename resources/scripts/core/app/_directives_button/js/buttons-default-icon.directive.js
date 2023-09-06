(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonDefaultIcon', buttonDefaultIcon);

    buttonDefaultIcon.$inject = ['$state'];

    function buttonDefaultIcon($state) {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<button class="btn btn-round btn-primary btn-outline" type="button" ngClick="ngClickOn()" title=" {{ title |translate }}"><em class="{{iconClass}}"></em></button>',
            scope: {
                ngClick: "&?",
                title: "@?",
                iconClass: "@?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') {
                    scope.ngIf = true;
                }
                if (angular.isUndefined(scope.iconClass) || scope.iconClass == '') {
                    scope.iconClass = "fa fa-eye";
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.ngClickOn = function () {
                    if (typeof $scope.ngClick == 'function') {
                        $scope.ngClick()
                    }
                }
            }
        };
    }

})();
