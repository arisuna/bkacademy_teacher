(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('topButton', topButton);

    topButton.$inject = ['$state', '$stateParams', '$rootScope', 'urlBase'];

    function topButton($state, $stateParams, $rootScope, urlBase) {
        var directive = {
            restrict: 'E',
            templateUrl: urlBase.tplBase('base-modules/utils', 'top-button'),
            replace: true,
            link: link,
            controller: controller
        };
        return directive;

        function link(scope, element) {
        }

        function controller($scope) {
            $scope.buttonClick = function ($event, buttonItem) {
                $event.stopPropagation();
                $event.preventDefault();
                if (angular.isDefined(buttonItem.stateName) && buttonItem.stateName != '') {
                    $state.go(buttonItem.stateName);
                } else {
                    $scope.$root.$emit('top-button-clicked', {eventName: buttonItem.eventName});
                }

            };
        }
    }

})();
