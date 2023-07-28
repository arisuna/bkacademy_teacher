(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('defaultViewer', defaultViewer)

    function defaultViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
                isConstant: '<?',
                isDisabled: '<?',
                isLongViewText: '<?',
            },
            template: `
            <div>
                <div class="user-profile-view" ng-class="{'relo-bg-bright-gray': isDisabled == true, 'user-profile-short-view': isLongViewText == true}">
                    <div class="item">

                        <span class="c" ng-if="model != null && model != '' && model != undefined">
                            {{ isConstant == true ? (model | translate ) : model }}
                        </span>

                        <span class="c text-muted" ng-if="model == null || model == '' || model == undefined">

                        </span>
                    </div>
                </div>
            </div>
            `,
            link: function (scope, element, attrs) {

            },
        };
    }
})();
