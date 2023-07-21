/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('scrollTo', scrollTo);


    function scrollTo () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
        function link(scope, element, attrs) {
            element.on('click', function () {
                var target = $(attrs.scrollTo);
                if (target.length > 0) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    });
                }
            });
        }
    }

})();
