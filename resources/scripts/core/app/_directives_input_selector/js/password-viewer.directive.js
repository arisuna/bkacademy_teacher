(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('passwordViewer', passwordViewer)

    function passwordViewer() {
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
                            <em class="fa fa-asterisk"></em>
                            <em class="fa fa-asterisk"></em>
                            <em class="fa fa-asterisk"></em>
                            <em class="fa fa-asterisk"></em>
                            <em class="fa fa-asterisk"></em>
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
