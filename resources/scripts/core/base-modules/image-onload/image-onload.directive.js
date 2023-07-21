/**
 * [img carousel directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.img-onload')
        .directive('imageOnload', imageOnload)
        .directive('showOnceBackgroundLoaded', showOnceBackgroundLoaded);

    imageOnload.$inject = [ '$timeout' ];
    showOnceBackgroundLoaded.$inject = [ '$timeout' ];

    function showOnceBackgroundLoaded($timeout ) {
        var showOnceBackgroundLoadedDirective = {
            restrict: 'A',
            link: function(scope, element, attributes) {
                element.addClass("ng-hide");
                var image = new Image();
                image.src = attributes.showOnceBackgroundLoaded;
                console.log( attributes.showOnceBackgroundLoaded );
                image.onload = function () {
                    // the image must have been cached by the browser, so it should load quickly
                    scope.$apply(function () {
                        element.css({ backgroundImage: 'url("' + attributes.showOnceBackgroundLoaded + '")' });
                        element.removeClass("ng-hide");
                    });
                };
                image.src = attributes.showOnceBackgroundLoaded;
            }
        };
        return showOnceBackgroundLoadedDirective;
    }

    function imageOnload( $timeout ) {
        var imageOnloadDirective = {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    console.log('image onload');
                    scope.$apply(attrs.imageOnload);
                });
                element.bind('error', function(){
                    console.log('image could not be loaded');
                });
            }
        };
        return imageOnloadDirective;
    }

})();

