/**
 * [img carousel directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.img-carousel-custom')
        .directive('imgCarouselCustom', imgCarouselCustom);

    imgCarouselCustom.$inject = ['urlBase'];

    function imgCarouselCustom( urlBase) {
        var imgCarouselDirective = {

            restrict: 'E',
            scope: {
                slides: '=slides',
                limit:'@?',
                custom:'<?',
            },
            templateUrl: urlBase.tplBase('base-modules/img-carousel-custom', 'index'),
            link: function( scope, element , attrs ){

            },

            controller: function ($scope, $element, $attrs, $timeout) {
                activate();
                function activate() {
                    $scope.myInterval = 5000;
                    $scope.noWrapSlides = false;
                    $scope.active = 0;
                    $scope.loading_slide = true;

                    let slides = [];
                    let currIndex = 0;

                    let addSlide = function(value) {
                        slides.push({
                            image_data: value.image_data,
                            file_name: value.file_name,
                            file_type: value.file_type,
                            id: currIndex++
                        });
                    };

                    $scope.getSlide = function(){
                        angular.forEach($scope.slides, function(value,index) {
                            addSlide(value);
                        });
                        $scope.slides = [];
                        $scope.slides = slides;

                        //time delay before show image
                        $timeout(function(){
                            $scope.loading_slide = false;
                        },1000);
                    };

                    $scope.getSlide();
                }
            }
        };

        return imgCarouselDirective;
    }

})();

