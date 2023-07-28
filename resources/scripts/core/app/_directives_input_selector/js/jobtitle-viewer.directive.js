(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('jobTitleViewer', jobTitleViewer)

    function jobTitleViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: '<div>\n' +
            '    <div class="user-profile-view">\n' +
            '        <div class="not-found">\n' +
            '            <icon class="fa fa-briefcase text-16 mg-l-1x text-dark-gray mr-sm"></icon>\n' +
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
