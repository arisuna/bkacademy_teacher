(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('upDownButton', upDownButton);

    upDownButton.$inject = ['urlBase'];

    function upDownButton(urlBase) {
        var directive = {
            restrict: 'E',
            templateUrl: urlBase.tplBase('base-modules/utils', 'up-down-button'),
            replace: true,
            scope: {
                isDown: '<?',
                isWhite: '<?',
                isUp: '<?',
            },
            link: link,
            controller: controller
        };
        return directive;

        function link(scope, element) {
            scope.sourceImg = urlBase.imageUrl('gms', 'assets', 'svg', 'line.svg');
        }

        function controller($scope) {

            $scope.changeImage = function () {
                if ($scope.isUp) {
                    $scope.sourceImg = urlBase.imageUrl('gms', 'assets', 'svg', 'chevron-up.svg');
                } else {
                    $scope.sourceImg = urlBase.imageUrl('gms', 'assets', 'svg', 'chevron-down.svg');
                }
            }

            $scope.defaultImage = function () {
                $scope.sourceImg = urlBase.imageUrl('gms', 'assets', 'svg', 'line.svg');
            }
        }
    }

})();
