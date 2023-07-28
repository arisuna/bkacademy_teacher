(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('yesNoViewer', yesNoViewer)

    function yesNoViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: '<div>\n' +
            '    <div class="user-profile-view" ng-style="{\'width\' : \'120px\'}">\n' +
            '        <div class="not-found">\n' +
            '            <icon class="fa fa-question-circle text-32 text-gray mr-sm"></icon>\n' +
            '            <span class="c">\n' +
            '            {{ model == 1 && model == true ? ( \'YES_TEXT\' | translate ) : (  \'NO_TEXT\' | translate )  }}\n' +
            '            </span>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n',
            link: function (scope, element, attrs) {

            },
        };
    }
})();
