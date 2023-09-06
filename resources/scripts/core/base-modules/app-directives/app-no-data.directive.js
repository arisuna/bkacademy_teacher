(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appNoData', appNoData);

    appNoData.$inject = ['$translate'];

    function appNoData($translate) {
        var directive = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                message: '@?',
                imageSrc: '@?',
                iconClass: '@?',
                buttonTitle: '@?',
                ngButtonClick: '&?'
            },
            template: `
            <div class="flex-vertical" ng-style="{'height' : '100%', 'width': '100%', 'text-align': 'center'}">
                <div class="align-centers">
                    <div class="text-center mg-b-2x" ng-if="imageSrc != undefined && imageSrc != ''">
                        <img src="{{imageSrc}}" class="img thumb96"/>
                    </div>

                    <div class="text-center mg-b-2x" ng-if="iconClass != undefined && iconClass != ''">
                        <em class="{{ iconClass }} txt-50 text-muted"></em>
                    </div>

                    <div class="mg-0 mg-b-4s text-16 text-muted" ng-class="{'align-middle':buttonTitle == undefined ||  butttonTitle == ''}">
                        {{ message | translate }}
                    </div>
                    <div class="align-middle" ng-show="buttonTitle != undefined &&  butttonTitle != ''">
                        <a class="btn btn-primary mg-r-1x" type="button" ng-click="ngButtonClick()">
                        <i class="fas fa-plus mr-sm"></i>
                            {{ buttonTitle | translate }}
                         </a>
                    </div>
                </div>
            </div>
            `,
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
