/**
 * [img carousel directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.img-carousel')
        .directive('imgCarousel', imgCarousel);

    imgCarousel.$inject = ['urlBase'];

    function imgCarousel(urlBase) {
        var imgCarouselDirective = {

            restrict: 'E',
            scope: {
                slides: '=slides',
                limit: '@?',
                isView: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/img-carousel', 'index'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.limit) || scope.limit == '') {
                    scope.limit = 5;
                }
            },

            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.carouselIndex = 0;
                activate();
                function activate() {
                    /*
                    $scope.colors = ['#fc0003', '#f70008', '#f2000d', '#ed0012', '#e80017', '#e3001c', '#de0021', '#d90026', '#d4002b', '#cf0030', '#c90036', '#c4003b', '#bf0040', '#ba0045', '#b5004a', '#b0004f', '#ab0054', '#a60059', '#a1005e', '#9c0063', '#960069', '#91006e', '#8c0073', '#870078', '#82007d', '#7d0082', '#780087', '#73008c', '#6e0091', '#690096', '#63009c', '#5e00a1', '#5900a6', '#5400ab', '#4f00b0', '#4a00b5', '#4500ba', '#4000bf', '#3b00c4', '#3600c9', '#3000cf', '#2b00d4', '#2600d9', '#2100de', '#1c00e3', '#1700e8', '#1200ed', '#0d00f2', '#0800f7', '#0300fc'];
                    function getSlide(target, style) {
                        var i = target.length;
                        return {
                            id: (i + 1),
                            label: 'slide #' + (i + 1),
                            img: 'http://lorempixel.com/1200/500/' + style + '/' + ((i + 1) % 10),
                            color: $scope.colors[(i * 10) % $scope.colors.length],
                            odd: (i % 2 === 0)
                        };
                    }
                    function addSlide(target, style) {
                        target.push(getSlide(target, style));
                    }
                    $scope.carouselIndex = 0;
                    function addSlides(target, style, qty) {

                        console.log( qty );

                        if( qty >= $scope.limit ){
                            qty = $scope.limit;
                        }
                        for (var i = 0; i < qty; i++) {
                            addSlide(target, style);
                        }
                    }
                    // 1st ngRepeat demo
                    addSlides($scope.slides, 'sports', $scope.slides.length );
                    */
                }

                $scope.previousItem = function ( ) {
                    if ($scope.carouselIndex === 0) {
                        $scope.carouselIndex = $scope.slides.length - 1;
                    } else {
                        $scope.carouselIndex = parseInt($scope.carouselIndex) - 1;
                    }
                    console.log($scope.carouselIndex);
                };

                $scope.nextItem = function () {
                    if ($scope.carouselIndex === $scope.slides.length - 1) {
                        $scope.carouselIndex = 0;
                    } else {
                        $scope.carouselIndex = parseInt($scope.carouselIndex) + 1;
                    }
                    console.log($scope.carouselIndex);
                };
            }
        };

        return imgCarouselDirective;
    }

})();

