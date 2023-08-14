(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonDownloadIcon', buttonDownloadIcon);

    buttonDownloadIcon.$inject = ['$state'];

    function buttonDownloadIcon($state) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngIf: "<?",
                ngClick: "&?",
            },
            template:
                '<button class="btn btn-round-32 btn-outline btn-light-gray" ng-show="ngIf"  type="button"  title="{{ \'DOWNLOAD_BTN_TEXT\'|translate }}">' +
                '<em class="fa fa-download"></em>' +
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
