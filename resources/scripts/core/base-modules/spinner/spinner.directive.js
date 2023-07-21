/**
 * [avatar spinner directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.spinner')
        .directive('spinner', spinner);
    spinner.$inject = ['urlBase'];

    function spinner(urlBase) {
        var spinnerDirective = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                name: '@?',
                group: '@?',
                imgSrc: '@?',
                register: '@?',
                onLoaded: '&?',
                onShow: '&?',
                onHide: '&?',
                title: '=?',
            },
            template: `<div>
                <div class="sk-fading-circle">
                    <div class="sk-circle1 sk-circle"></div>
                    <div class="sk-circle2 sk-circle"></div>
                    <div class="sk-circle3 sk-circle"></div>
                    <div class="sk-circle4 sk-circle"></div>
                    <div class="sk-circle5 sk-circle"></div>
                    <div class="sk-circle6 sk-circle"></div>
                    <div class="sk-circle7 sk-circle"></div>
                    <div class="sk-circle8 sk-circle"></div>
                    <div class="sk-circle9 sk-circle"></div>
                    <div class="sk-circle10 sk-circle"></div>
                    <div class="sk-circle11 sk-circle"></div>
                    <div class="sk-circle12 sk-circle"></div>
                </div>
                <h5 class="text-center">{{ title }}</h5>
            </div>`,
            link: function (scope, element, attrs, timeout) {
                if (angular.isUndefined(scope.title) || scope.title == undefined) {
                    scope.title = '';
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {
                var api = {
                    name: $scope.name,
                    group: $scope.group,
                    show: function () {
                        $scope.show = true;
                    },
                    hide: function () {
                        $scope.show = false;
                    },
                    toggle: function () {
                        $scope.show = !$scope.show;
                    }
                };
                if ($scope.onShow || $scope.onHide) {
                    $scope.$watch('show', function (show) {
                        if (show && $scope.onShow) {
                            $scope.onShow({
                                spinnerService: spinnerService,
                                spinnerApi: api
                            });
                        } else if (!show && $scope.onHide) {
                            $scope.onHide({
                                spinnerService: spinnerService,
                                spinnerApi: api
                            });
                        }
                    });
                }

            }
        };

        return spinnerDirective;
    }

})();
