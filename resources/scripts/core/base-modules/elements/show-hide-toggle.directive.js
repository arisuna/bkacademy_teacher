(function () {
    'use strict';

    angular
        .module('app.elements')
        .directive('showHideLink', showHideLink);

    function showHideLink() {
        return {
            restrict: 'EA',
            scope: {
                isDisplay: '=',
                showLabel: '@',
                hideLabel: '@',
            },
            link: function (scope) {
                if (angular.isUndefined(scope.isDisplay) || _.isNull(scope.isDisplay)) {
                    scope.isDisplay = false;
                }
            },
            template: `
            <a ng-click="isDisplay =!isDisplay" class="txt-12">
                <em class="fa mr-sm" ng-class="{'fa-plus': isDisplay == false, 'fa-minus' : isDisplay == true }"></em>
                {{ ( isDisplay == false ?  showLabel : hideLabel ) | translate }}
            </a>
            `
        }
    }



    angular
        .module('app.elements')
        .directive('showHideButton', showHideButton);

    function showHideButton() {
        return {
            restrict: 'EA',
            scope: {
                isDisplay: '=',
                showLabel: '@',
                hideLabel: '@',
            },
            link: function (scope) {
                if (angular.isUndefined(scope.isDisplay) || _.isNull(scope.isDisplay)) {
                    scope.isDisplay = false;
                }
            },
            template: `
            <button ng-click="isDisplay =!isDisplay" class="btn btn-round">
                <em class="fa" ng-class="{'fa-chevron-down': isDisplay == false, 'fa-chevron-up' : isDisplay == true }"></em>
            </button>
            `
        }
    }

})();
