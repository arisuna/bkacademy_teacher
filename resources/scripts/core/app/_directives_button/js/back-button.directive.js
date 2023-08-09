/**
 * number-input.js
 * author: Cohen Adair
 * license: GNU GPL v2
 */

(function () {
    'use strict';


    angular
        .module('app.button-directives')
        .directive('backButtonState', backButtonState);


    function backButtonState() {
        return {
            restrict: 'EA',
            replace: true,
            template: `
                <button class="btn btn-oval btn-default {{ class }}" type="button" ui-sref="{{ state }}">
                    <em class="fa fa-long-arrow-left"></em>
                    {{ 'BACK_BTN_TEXT' | translate }}
                </button>
            `,
            scope: {
                ngIf: "<?",
                class: '@?',
                state: "@?"
            },
            link: function (scope, element, attrs) {

            },
        };
    }

    angular
        .module('app.button-directives')
        .directive('backButtonHistory', backButtonHistory);

    backButtonHistory.$inject = ['$window'];

    function backButtonHistory($window) {
        return {
            restrict: 'E',
            replace: true,
            template: '<button class="btn btn-oval btn-default {{ class }}"  type="button">' +
                '    <em class="fa fa-long-arrow-left"></em>' +
                '    {{ \'BACK_BTN_TEXT\' | translate }}' +
                '</button>',
            scope: {
                class: '@?',
            },
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    $window.history.back();
                });
            },
        };
    }

    angular
        .module('app.button-directives')
        .directive('backButtonClick', backButtonClick);

    backButtonClick.$inject = ['$window'];

    function backButtonClick($window) {
        return {
            restrict: 'E',
            replace: true,
            template: '<button class="btn btn-oval btn-default {{ class }}"  type="button"> <em class="fa fa fa-long-arrow-left mr-sm"></em>{{ \'BACK_BTN_TEXT\' | translate }} </button>',
            scope: {
                class: '@?',
                ngClick: "&?ngClick",
            },
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.ngClick();
                });
            },
        };
    }


    angular
        .module('app.button-directives')
        .directive('backButtonLink', backButtonLink);


    function backButtonLink() {
        return {
            restrict: 'E',
            replace: true,
            template: '<button class="btn btn-flat btn-transparent btn-link {{ class }}"  type="button"> <em class="fa fa fa-long-arrow-left mr-sm"></em>{{ \'BACK_BTN_TEXT\' | translate }} </button>',
            scope: {
                class: '@?',
            },
            link: function (scope, element, attrs) {

            },
        };
    }

})();
