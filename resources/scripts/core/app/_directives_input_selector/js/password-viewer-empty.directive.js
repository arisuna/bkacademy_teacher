(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('passwordViewerEmpty', passwordViewerEmpty)

    function passwordViewerEmpty() {
        return {
            restrict: 'E',
            template: `
            <div>
                <div class="user-profile-view">
                    <div class="item">
                        <span class="icon">
                            <em class="fa fa-lock text-dark-gray text-16"></em>
                        </span>
                        <div class="text-dark-gray">
                        </div>
                    </div>
                </div>
            </div>
            `,
            link: function (scope, element, attrs) {

            },
        };
    }
})();
