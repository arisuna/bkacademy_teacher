/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('officeViewer', officeViewer)

    function officeViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: '<div>\n' +
            '    <div class="user-profile-view">\n' +
            '        <div class="not-found">\n' +
            '            <img src="/app/assets/img/svg/building-circle.svg" class="thumb32 img-circle mr-sm"/> \n' +
            '            <span class="c">\n' +
            '            {{ model | translate }}\n' +
            '            </span>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n',
            link: function (scope, element, attrs) {

            },
        };
    }
})();
