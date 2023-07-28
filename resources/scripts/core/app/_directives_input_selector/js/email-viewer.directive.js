/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('emailViewer', emailViewer)

    function emailViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: `
                <div>
                <div class="user-profile-view" ng-class="{'relo-bg-bright-gray': isDisabled == true, 'user-profile-short-view': isLongViewText == true}">
                    <div class="item">
                        <span class="icon">
                            <em class="fa-solid fa-envelope text-dark-gray text-16"></em>
                        </span>
                        <span class="c" ng-if="model !== null && model !== '' && model !== undefined">
                           {{model | translate}}
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
