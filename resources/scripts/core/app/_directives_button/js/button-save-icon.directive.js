(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonSaveIcon', buttonSaveIcon);

    buttonSaveIcon.$inject = ['$state'];

    function buttonSaveIcon($state) {
        return {
            restrict: 'EA',
            replace: true,
            template: `
                <button class="btn btn-round btn-success btn-outline" type="button" ngClick="ngClickOn()" title=" {{ title |translate }}">
                <em class="fa fa-save"></em>
                </button>
            `,
            scope: {
                ngClick: "&?",
                title: "@?",
                iconClass: "@?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') {
                    scope.ngIf = true;
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
