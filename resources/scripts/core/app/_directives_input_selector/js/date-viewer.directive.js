(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('dateViewer', dateViewer)

    function dateViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
                format: '@?',
            },
            template: `
            <div>
                <div class="user-profile-view">
                    <div class="item">
                        <span class="icon">
                            <em class="fa fa-calendar text-dark-gray text-16"></em>
                        </span>
                        <span class="c" ng-if="model != null && model != '' && model != undefined">
                            {{ model }}
                        </span>

                        <span class="c text-muted" ng-if="model == null || model == '' || model == undefined">
                            {{'EMPTY_TEXT' | translate}}
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
