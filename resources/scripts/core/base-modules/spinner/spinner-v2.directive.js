/**
 * [avatar spinner directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.spinner')
        .directive('spinnerV2', spinnerV2);

    spinnerV2.$inject = ['urlBase'];

    function spinnerV2(urlBase) {
        var spinnerDirective = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                type: '@?',
                size: '@?',
                isCenter: '<?'
            },
            template: `<div class="flex-vertical" ng-style="{'height' : '100%', 'width': '100%', 'text-align': 'center'}">
                <img ng-src="{{ imageSource }}" ng-class="{'customize-center': isCenter}" class="{{ spinSize }}">
            </div>
            `,
            link: function (scope, element, attrs, timeout) {

                scope.spinSize = 'spin-medium';

                if (scope.size == 'small') {
                    scope.spinSize = 'spin-small';
                }else if(scope.size == 'md-small'){
                    scope.spinSize = 'spin-md-small';
                }

                if (angular.isUndefined(scope.isCenter)){
                    scope.isCenter = false;
                }

                if (angular.isUndefined(scope.type)){
                    scope.type = 'spin';
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {


                $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'spin.svg');

                if ($scope.type == 'glowring') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'glowring.svg');
                }

                if ($scope.type == 'tail') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'tail.svg');
                }

                if ($scope.type == 'message') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'message.svg');
                }

                if ($scope.type == 'progress') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'progress.svg');
                }

                if ($scope.type == 'hourglass') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'hourglass.svg');
                }

                if ($scope.type == 'ring') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'ring.svg');
                }

                if ($scope.type == 'icon') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'icon.svg');
                }

                if ($scope.type == 'earth') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'earth2.svg');
                }


                if ($scope.type == 'spin') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'spin.svg');
                }

                if ($scope.type == 'dna') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'dna.svg');
                }

                if ($scope.type == 'coffee') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'coffee.svg');
                }

                if ($scope.type == 'spin2color') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'spin2color.svg');
                }

                if ($scope.type == 'spinwhite') {
                    $scope.imageSource = urlBase.imageUrl('gms', 'assets', 'loading', 'spin-white.svg');
                }
            }
        };

        return spinnerDirective;
    }

})();
