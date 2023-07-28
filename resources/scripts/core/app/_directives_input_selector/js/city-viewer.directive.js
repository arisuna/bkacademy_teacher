/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('cityViewer', cityViewer)

    function cityViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template:`
            <div>
                <div class="user-profile-view">
                    <div class="not-found">
                        <img src="/app/assets/img/svg/city-circle1.svg" class="thumb32 img-circle mr-sm"/>
                            <span class="c">
                            {{ model | translate }}
                            </span>
                    </div>
                </div>
            </div>`,
            link: function (scope, element, attrs) {

            },
        };
    }
})();
