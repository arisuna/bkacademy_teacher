(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('tableNoData', tableNoData);

    tableNoData.$inject = ['$translate'];

    function tableNoData($translate) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                message: '@?',
                buttonTitle: '@?',
                ngButtonClick: '&?'
            },
            template:
            '<div class="">' +
            '               <div class="flex-middle assignment-block align-center">\n' +
            '                    <div class="mg-0 mg-b-4s text-16 text-muted" ng-class="{\'align-middle\':buttonTitle == undefined ||  butttonTitle == \'\'}">\n' +
            '                        {{ message | translate }}\n' +
            '                    </div>\n' +
            '                    <div class="align-middle" ng-show="buttonTitle != undefined &&  butttonTitle != \'\'">\n' +
            '                        <a class="btn btn-oval btn-primary mg-r-1x" type="button" ng-click="ngButtonClick()">\n' +
            '                            {{ buttonTitle | translate }}\n' +
            '                        </a>\n' +
            '                    </div>' +
            '                </div>' +
            '</div>',
            link: function (scope, element, attrs) {

            },

            controller: function ($scope, $element, $attrs) {
                $scope.ngButtonClickOn = function () {
                    if (typeof $scope.ngButtonClick == 'function') {
                        $scope.ngButtonClick();
                    }
                }
            }
        };
        return directive;
    }
})();
