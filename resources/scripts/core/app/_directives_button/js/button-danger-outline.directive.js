(function () {
    'use strict';


    angular
        .module('app.input-selector')
        .directive('buttonDangerOutline', buttonDangerOutline);

    buttonDangerOutline.$inject = ['urlBase'];

    function buttonDangerOutline(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `<button class="btn btn-outline btn-oval btn-delete" type="button" title="{{ buttonTitle |translate }}"><em ng-if="iconClass" class="{{iconClass}} mr-sm"></em>{{ buttonTitle | translate }}</button>`,
            scope: {
                ngIf: "<?",
                buttonTitle: "@?",
                iconClass: "@",
                state: "@?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
                if (angular.isUndefined(scope.iconClass) || scope.iconClass == '') scope.iconClass = null;
            },
        };
    }


})();
