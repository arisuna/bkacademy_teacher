(function () {
    'use strict';


    angular
        .module('app.input-selector')
        .directive('editButtonClick', editButtonClick);

    editButtonClick.$inject = ['urlBase'];

    function editButtonClick(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `<button class="btn btn-oval relo-bg-grey" ng-show="ngIf" type="button" ngClick="&ngClick()" title=" {{ 'EDIT_BTN_TEXT'|translate }}"><em class="fa fa-edit mr-sm"></em> {{ label | translate }}</button>`,
            scope: {
                ngIf: "<?",
                ngClick: "&ngClick",
                label: '@?',
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
            },
        };
    }

    angular
        .module('app.input-selector')
        .directive('editButtonState', editButtonState);

    editButtonState.$inject = ['urlBase'];

    function editButtonState(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `<button class="btn btn-oval relo-bg-grey" ng-show="ngIf" type="button" ui-sref="{{ state }}" ngClick="&ngClick()" title=" {{ 'EDIT_BTN_TEXT'|translate }}"><em class="fa fa-edit"></em></button>`,
            scope: {
                ngIf: "<?",
                state: "@?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
            },
        };
    }

    angular
        .module('app.input-selector')
        .directive('editButtonOutline', editButtonOutline);

    editButtonOutline.$inject = ['urlBase'];

    function editButtonOutline(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `<button class="btn btn-outline btn-oval btn-edit" type="button" title="{{ 'EDIT_BTN_TEXT'|translate }}"><em class="fa fa-edit mr-sm"></em>{{ 'EDIT_BTN_TEXT' | translate }}</button>`,
            scope: {
                ngIf: "<?",
                state: "@?",
            },
            link: function (scope, element, attrs) {
            },
        };
    }


})();
