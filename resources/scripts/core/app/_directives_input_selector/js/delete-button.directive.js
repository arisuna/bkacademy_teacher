(function () {
    'use strict';


    angular
        .module('app.input-selector')
        .directive('deleteButtonOutline', deleteButtonOutline);

    deleteButtonOutline.$inject = ['urlBase'];

    function deleteButtonOutline(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `<button class="btn btn-outline btn-oval btn-delete" type="button" title="{{ 'DELETE_BTN_TEXT'|translate }}"><em class="fa fa-edit mr-sm"></em>{{ 'DELETE_BTN_TEXT' | translate }}</button>`,
            scope: {
                ngIf: "<?",
                state: "@?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
            },
        };
    }


})();
