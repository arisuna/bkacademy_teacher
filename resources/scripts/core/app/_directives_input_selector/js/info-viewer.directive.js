(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('infoViewer', infoViewer)

    function infoViewer() {
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
                        <span class="icon">
                            <em class="fa fa-info text-dark-gray text-16"></em>
                        </span>
                        <span class="c pd-t-4" ng-if="model !== null && model !== '' && model !== undefined">
                            {{ isConstant == true ? (model | translate ) : model }}
                        </span>

                        <span class="c text-muted text-italic" ng-if="model === null || model === '' || model === undefined">
<!--                            {{'EMPTY_TEXT' | translate}}-->
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
