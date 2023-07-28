(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('locationViewer', locationViewer)

    function locationViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: '<div>\n' +
            '    <div class="user-profile-view">\n' +
            '        <div class="not-found">\n' +
            '            <icon class="fa fa-map-marker text-32 text-gray mr-sm"></icon>\n' +
            '            <span class="c">\n' +
            '            {{ model != null && model != \'\' && model != undefined ? model : (\'EMPTY_TEXT\' | translate) }}\n' +
            '            </span>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n',
            link: function (scope, element, attrs) {

            },
        };
    }
})();
