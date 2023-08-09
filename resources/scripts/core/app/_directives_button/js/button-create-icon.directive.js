(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonCreateIcon', buttonCreateIcon);

    buttonCreateIcon.$inject = ['$state'];

    function buttonCreateIcon($state) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngClick: "&?",
                toolTipText: "@?",
            },
            template: `
                <button class="btn btn-round btn-primary btn-outline" type="button" title="{{ 'CREATE_BTN_TEXT'|translate }}" uib-tooltip="{{ title | translate }}">
                    <em class="fa fa-plus"></em>
                </button>
            `,
            link: function (scope, element, attrs) {

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
