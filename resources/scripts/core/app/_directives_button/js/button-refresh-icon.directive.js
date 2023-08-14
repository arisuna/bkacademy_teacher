(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonRefreshIcon', buttonRefreshIcon);


    function buttonRefreshIcon() {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <button class="btn btn-round">
                    <em class="fa fa-refresh" ng-class="{ 'fa-spin': isLoading}"></em>
                </button>
            `,
            scope: {
                isLoading: "<?",
            },
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {

            }
        };
    }

})();
