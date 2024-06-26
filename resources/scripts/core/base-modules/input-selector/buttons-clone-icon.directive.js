(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonCloneIcon', buttonCloneIcon);

        buttonCloneIcon.$inject = ['$state'];

    function buttonCloneIcon($state) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngIf: "<?",
                ngClick: "&?",
            },
            template:
                '<button class="btn btn-round btn-edit btn-outline" ng-show="ngIf"  type="button"  title="{{ \'EDIT_BTN_TEXT\'|translate }}">' +
                '<em class="fa-solid fa fa-copy"></em>' +
                '</button>',
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
